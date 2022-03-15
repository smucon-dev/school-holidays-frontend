import { Box } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Holiday } from "../../app/model";
import InputModal from "../../common/InputModal";
import { DataService } from "../../services/DataService";
import HolidayTableHeader from "./HolidayTableHeader";
import HolidayTableRow from "./HolidayTableRow";


interface HolidayTableProps {
  year: number
  dataService: DataService
}


export default function HolidayTable({ year, dataService }: HolidayTableProps) {

  const appContext = useContext(AppContext)
  const [holidays, setHolidays] = useState<Map<string, Holiday[]>>()

  const refeshFromDb = async() => {
    const data = await dataService.getHolidays(year.toString(), 'Ferien')
    setHolidays(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getHolidays(year.toString(), 'Ferien')
      setHolidays(data)
    }
    fetchData()
  }, [year, dataService])

  console.log('render table')

  return (
    <>
      <Box
        sx={{
          width: '100%'
        }}
        >
        <HolidayTableHeader editMode={appContext.editMode}/>
        {holidays && createTableRows(holidays)}
      </Box>
      {appContext.editMode && appContext.activeHoliday && <InputModal dataService={dataService}/>}
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