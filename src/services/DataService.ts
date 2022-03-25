import { Holiday, HolidayItem, HolidayType, User } from "../app/model";
import { buildSK } from '../common/utils/Utils';
import { appConfig, states, vacationNames } from './config'


export class DataService {

  private user: User | undefined
  private schoolHolidays = new Map<String, Map<string, Holiday[]>>() // key: year, value: map<state, holiday>
  private publicHolidays = new Map<String, Map<string, Holiday[]>>()

  constructor() {
    this.refreshFromCloud = this.refreshFromCloud.bind(this)
  }

  /**
   * setUser
   */
  public setUser(user: User) {
    this.user = user
  }

  public authenticated = () => {
    return this.user !== undefined
  }

  public tokenExpired = () => {
    if (this.user && this.user.cognitoUser) {
     const session = this.user.cognitoUser.getSignInUserSession()
     if (session) {
       return session.getIdToken().getExpiration() - new Date().getTime() / 1000 < 0
     }
    }
    return undefined
  }
  
  // get id token from cognito user
  private getUserIdToken(){
    if (this.user) {
        return this.user.cognitoUser.getSignInUserSession()!.getIdToken().getJwtToken()
    } else {
        return '';
    }
}

  // add a single holiday
  public async addHoliday(holiday: HolidayItem) {

    const url = appConfig.api.holidayURL
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Authorization': this.getUserIdToken()
      },
      body: JSON.stringify(holiday)
    }
    
    await fetch(url, requestOptions).catch(error => console.log(error))
  }

  // add holiday in bulk
  public async addHolidays(holidays: Holiday[]) {
    const url = appConfig.api.holidayURL
    
    const putRequests = this.createPutRequests(holidays)
    const requestItems = { 
      RequestItems: {
        Holiday: putRequests
    }}
     
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        'Authorization': this.getUserIdToken()
      },
      body: JSON.stringify(requestItems)
    }
    await fetch(url, requestOptions).catch(error => console.log(error))
  }

  // delete a single holiday
  public async deleteHoliday(state: string, start: string, end: string) {
      const url = `${appConfig.api.holidayURL}?PK=${state}&SK=${buildSK(start, end)}`
      const requestOptions: RequestInit = {
        method: 'DELETE',
        headers: {
          'Authorization': this.getUserIdToken()
        }
      }
      await fetch(url, requestOptions).catch(error => console.log(error))
  }

  // delete holidays in bulk
  public async deleteHolidays(holidays: Holiday[]) {
    const url = appConfig.api.holidayURL
    
    const deleteRequests = this.createDeleteRequests(holidays)
    const requestItems = { 
      RequestItems: {
        Holiday: deleteRequests
    }}
     
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        'Authorization': this.getUserIdToken()
      },
      body: JSON.stringify(requestItems)
    }
    await fetch(url, requestOptions).catch(error => console.log(error))
  }

  /**
   * getHolidays as a map where key: state and value: holiday
   */
  public async getHolidays(year: string, type: HolidayType): Promise<Map<string, Holiday[]>> {

    const url = new URL(appConfig.api.holidayURL)
    const params: any = { "SK": year, "Type": type }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
    const result = await fetch(url.toString())
    const responseJSON = await result.json()
    const holidays: Holiday[] = []
    if (responseJSON['Items']) {
      responseJSON['Items'].forEach((item: HolidayItem) => {
        const holiday: Holiday = {
          state: item.PK,
          start: item.StartDate,
          end: item.EndDate,
          name: item.Name,
          type: item.Type
        }
        holidays.push(holiday)
      })
    }
    
    // initialize with placeholder holidays
    const holidayMap = new Map<string, Holiday[]>()
    Array.from(states.keys()).forEach(state => {
      const holidayArray = vacationNames.map((name: string) => {
        return {
          state: state,
          start: '',
          end: '',
          name: name,
          type: 'Ferien'
        }
      })
      holidayMap.set(state, holidayArray)
    })

    // merge placeholder data with fetched data
    holidays.forEach(holiday => {
      const stateHolidays = holidayMap.get(holiday.state)
      const arrayIndex = vacationNames.indexOf(holiday.name)
      if (stateHolidays && arrayIndex > -1 && arrayIndex < stateHolidays.length) {
        stateHolidays[arrayIndex] = holiday
      }
    })

    return holidayMap
  }

  // upload holiday data from S3 into DynamonBB
  public async refreshFromCloud(year: string, type: HolidayType) {

    const url = new URL(appConfig.api.holidayURL + '/upload')
    const params: any = { "Year": year, "Type": type }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Authorization': this.getUserIdToken()
      },
    }

    try {
      const response = await fetch(url.toString(), requestOptions)
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  private createDeleteRequests(holidays: Holiday[]) {
    const deleteRequests = holidays.map(holiday =>  {
      return { DeleteRequest: {
                Key: {PK: holiday.state, 
                      SK: holiday.start! + '_' + holiday.end!
                    }
                }
              }
    })
    return deleteRequests
  }

  private createPutRequests(holidays: Holiday[]) {
    const putRequests = holidays.map(holiday =>  {
      return { PutRequest: {
                Item: {PK: holiday.state, 
                      SK: holiday.start! + '_' + holiday.end!,
                      Name: holiday.name,
                      StartDate: holiday.start,
                      EndDate: holiday.end,
                      Type: holiday.type
                    }
                }
              }
    })
    return putRequests
  }


  /**
   * fetch holiday data from cache if available
   * otherwise from file
   */
  public async getSchoolHolidays(year: string): Promise<Map<string, Holiday[]>> {

    // return from cache if available
    const cachedHolidays = this.schoolHolidays.get(year)
    if (cachedHolidays) {
      return cachedHolidays
    }

    /* build holiday map from file and cache it
    * these are holidays for a year as one file holds data for a specific year
    */

    // initialize map
    const newHolidayMap = new Map<string, Holiday[]>()
    Array.from(states.keys()).forEach(state => {
      const holidayArray = vacationNames.map((name: string) => {
        return {
          state: state,
          start: '',
          end: '',
          name: name,
          type: 'Ferien'
        }
      })
      newHolidayMap.set(state, holidayArray)
    })
    
    // fill map and put it into the cache
    try {
      const response = await fetch(`./H_${year}.json`)
      const jsonData = await response.json()
      const dataArray: string[] = jsonData.data

      dataArray.forEach(item => {
        const itemArray = item.split(',')
        const holiday: Holiday = {
          state: itemArray[0],
          name: itemArray[1],
          start: itemArray[2],
          end: itemArray[3],
          type: itemArray[4],
        }
        const h = newHolidayMap.get(holiday.state)
        if (h) {
          h[vacationNames.indexOf(holiday.name)] = holiday
        }
      })
      this.schoolHolidays.set(year, newHolidayMap)
    } catch (error) {
      console.log(error);
    }

    // return holidays for the requested year
    return newHolidayMap
  }


  /**
   * 
   * @param holidays Map (key: state, value: holidays)
   */
  private filterByType(holidays: Map<string, Holiday[]>, type: HolidayType): Map<string, Holiday[]> {

    const filteredMap = new Map<string, Holiday[]>()

    Array.from(holidays.entries()).forEach(holidays => {
      const filteredHolidays = Array.from(holidays[1]).filter(holiday => holiday.type === type)
      filteredMap.set(holidays[0], filteredHolidays)
    })

    return filteredMap
  }
}