import { Holiday, HolidayItem, HolidayType, User } from "../app/model";
import { buildSK } from '../common/utils/Utils';
import { appConfig, states, vacationNames } from './config'



export class DataService {

  private user: User | undefined

  /**
   * setUser
   */
  public setUser(user: User) {
    this.user = user
  }
  
  // get id token from cognito user
  private getUserIdToken(){
    if (this.user) {
        return this.user.cognitoUser.getSignInUserSession()!.getIdToken().getJwtToken()
    } else {
        return '';
    }
}

  // add holiday
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

  // delete holiday
  public async deleteHoliday(state: string, start: string, end: string) {
      const url = `${appConfig.api.holidayURL}?State=${state}&SK=${buildSK(start, end)}`
      console.log(url);
      const requestOptions: RequestInit = {
        method: 'DELETE',
        headers: {
          'Authorization': this.getUserIdToken()
        }
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
          state: item.State,
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
  


}