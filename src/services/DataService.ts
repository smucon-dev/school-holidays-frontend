import { Holiday, HolidayType } from "../app/model";



export class DataService {


  private states = ["Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen", 
  "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen"," Rheinland-Pfalz", "Saarland", 
  "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"]

  private vacationNames = ['Winterferien', 'Osterferien', 'Pfingstferien', 'Sommerferien', 'Herbstferien', 'Weihnachtsferien']


  /**
   * getStates
   */
  public getStates() {
    return this.states
  }


  /**
   * getHolidays as a map where key: state and value: holiday
   */
  public async getHolidays(year: string, type: HolidayType): Promise<Map<string, Holiday[]>> {

    // generate test data
    const holidayMap = new Map<string, Holiday[]>()
    this.states.forEach(state => {
      // initialize with placeholder holidays
      const holidayArray =this.vacationNames.map(name => {
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

    // simulate fetched data if one exists
    const holidayArr: Holiday[] = []
    this.states.forEach(state => {
      this.vacationNames.forEach(vacationName => {
        holidayArr.push({
          state: state,
          start: vacationName === 'Pfingstferien' ? '' : '20220401',
          end: vacationName === 'Pfingstferien' ? '' : '20220413',
          name: vacationName,
          type: 'Ferien'
        })
      })
    });

    // merge placeholder data with fetched data
    holidayArr.forEach(holiday => {
      const stateHolidays = holidayMap.get(holiday.state)
      const arrayIndex = this.vacationNames.indexOf(holiday.name)
      if (stateHolidays && arrayIndex > -1 && arrayIndex < stateHolidays.length) {
        stateHolidays[arrayIndex] = holiday
      }
    })

    return holidayMap
  }
  


}