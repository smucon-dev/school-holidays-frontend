import { Box } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Holiday, HolidayType } from "../../app/model";
import InputModal from "../admin/InputModal";
import { DataService } from "../../services/DataService";
import HolidayTableHeader from "./HolidayTableHeader";
import HolidayTableRow from "./HolidayTableRow";
import { vacationNames } from "../../services/config"
import { createBatches } from "../../common/utils/Utils";
import { AuthService } from "../../services/AuthService";


interface HolidayTableProps {
  year: number
  dataService: DataService
  authService: AuthService
}


export default function HolidayTable({ year, dataService, authService }: HolidayTableProps) {

  const appContext = useContext(AppContext)

  const [holidays, setHolidays] = useState<Map<string, Holiday[]>>()

  const updateHolidays = (holiday: Holiday) => {
    if (holidays) {
      const stateHolidays = holidays.get(holiday.state)
      const index = vacationNames.indexOf(holiday.name)
      if (stateHolidays) {
        stateHolidays[index] = holiday
      }
    }
  }

  const updateDb = async () => {
    
    const dbData = await dataService.getHolidays(year.toString(), appContext.appMode)

    // prepare deletes
    const deletes: Holiday[] = []
    const puts: Holiday[] = []
    Array.from(dbData.values()).forEach(stateHolidays => {
      for (let i = 0; i < stateHolidays.length; i++) {
        const newHoliday = holidays!.get(stateHolidays[i]!.state)![i]
        const oldHoliday = stateHolidays[i]
        // add holiday to delete list if it exists in db but does not in app state
        if (oldHoliday.start !== '' && newHoliday.start === '') {
          deletes.push(oldHoliday)
        } 
        // add holiday to update list if dates differ
        else if (oldHoliday.start !== newHoliday.start || oldHoliday.end !== newHoliday.end) {
          puts.push(newHoliday)
        }
      }
    })
    // split into batches of 25 if there are more then thatas this is Dynamo's limit 
    if (deletes.length > 0) {
      if (deletes.length > 25) {
        const batches = createBatches(deletes, 25)
        batches.forEach(batch =>  {
          (async () => {
          await dataService.deleteHolidays(batch)
          })()
        })
      } else {
        await dataService.deleteHolidays(deletes)
      }
    }
    if (puts.length > 0) {
      if (puts.length > 25) {
        const batches = createBatches(puts, 25)
        batches.forEach(batch => {
          (async () => {
          await dataService.addHolidays(batch)
          })()
        })
      } else {
        await dataService.addHolidays(puts)
      }
    }

    refreshFromDb()
  }

  const refreshFromDb = async() => { 
    const data = await dataService.getHolidays(year.toString(), appContext.appMode)
    setHolidays(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      // const data = await dataService.getHolidays(year.toString(), 'Ferien')
      const data = await dataService.getSchoolHolidays(year.toString())
      setHolidays(data)
    }
    fetchData()
  }, [year, dataService])


  return (
    <>
      <Box
        sx={{
          width: '100%'
        }}
        >
        <HolidayTableHeader editMode={appContext.editMode} 
                            authenticated={dataService.authenticated()}
                            tokenExpired={dataService.tokenExpired}
                            refreshToken={authService.refreshToken}
                            updateDb={updateDb}
                            refreshFromCloud={dataService.refreshFromCloud}
                            refreshFromDb={refreshFromDb}/>
        {holidays && createTableRows(holidays)}
      </Box>
      {appContext.editMode && appContext.activeHoliday && <InputModal dataService={dataService} 
                                                                      updateHolidays={updateHolidays}
                                                                      year={year.toString()}/>}
    </>
  )

}

function createTableRows(holidays: Map<string, Holiday[]>) {

  const rows: ReactElement[] = []

  Array.from(holidays.keys()).forEach(state => {
    const stateHolidays = holidays.get(state)
    if (stateHolidays) {
      rows.push(<HolidayTableRow key={state} holidays={stateHolidays}/>)
    }
  })

  return rows

}