import { Box } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Holiday } from "../../app/model";
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getHolidays(year.toString(), 'Ferien')
      setHolidays(data)
    }
    fetchData()
  }, [year, dataService])


  return (
    <Box
      sx={{
        width: '100%'
      }}
      >
      <HolidayTableHeader editMode={appContext.editMode}/>
      {holidays && createTableRows(holidays)}
    </Box>
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