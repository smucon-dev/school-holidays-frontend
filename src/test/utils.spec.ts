import { Holiday } from '../app/model'
import { createBatches } from '../common/utils/Utils'

describe('create batches utility', () => {

  it('split Holiday array into batches', () => {

    // create payload
    const createHoliday = (id: number): Holiday => {
      return {
        state: 'HE',
        start: '20220101',
        end: '20220101',
        name: 'Tag ' + id,
        type: 'Feiertag' 
      }
    }
    const holidays: Holiday[] = []
    for (let i = 0; i < 53; i++) {
      holidays.push(createHoliday(i))
    }

    const batches = createBatches(holidays, 25)

    expect(batches.length).toBe(3)
    expect(batches[0].length).toBe(25)
    expect(batches[1].length).toBe(25)
    expect(batches[2].length).toBe(3)

  })

})