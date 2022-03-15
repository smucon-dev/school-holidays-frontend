import { Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../App";
import { Holiday } from "../../app/model";


interface HolidayComponentProps {
  holiday: Holiday
}


export default function HolidayComponent({ holiday }: HolidayComponentProps) {

  const appContext = useContext(AppContext)

  const formattedDate = (startDate: string | undefined, endDate: string | undefined) => {
    if (startDate && endDate) {
      return `${startDate.slice(6, 8)}.${startDate.slice(4, 6)}.-${endDate.slice(6, 8)}.${endDate.slice(4, 6)}.`
    } else {
      return '-'
    }
  }

  return (
    <Typography 
      onClick={() => appContext.setActiveHoliday(holiday)}
      sx={{fontFamily: 'Raleway'
      }}>
      {formattedDate(holiday.start, holiday.end)}
    </Typography>
  )

}