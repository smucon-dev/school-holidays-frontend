import { Holiday } from "../../app/model";
import TableItem from "../../common/TableItem";


interface HolidayComponentProps {
  holiday: Holiday
}


export default function HolidayComponent({ holiday }: HolidayComponentProps) {

  const formattedDate = (startDate: string | undefined, endDate: string | undefined) => {
    if (startDate && endDate) {
      return startDate.slice(6, 8) + '.' + startDate.slice(4, 6) + '.-' + endDate.slice(6, 8) + '.' + endDate.slice(4, 6) + '.'
    } else {
      return '-'
    }
  }

  return (
    <TableItem>{formattedDate(holiday.start, holiday.end)}</TableItem>
  )

}