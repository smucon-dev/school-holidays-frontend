import { Box, useTheme } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../App";
import { Holiday } from "../../app/model";
import TableRowHeader from "../../common/TableRowHeader";
import HolidayComponent from "./HolidayComponent";
import { states } from "../../services/config"


interface HolidayTableRowProps {
  holidays: Holiday[],
}


export default function HolidayTableRow({ holidays }: HolidayTableRowProps) {

  const appContext = useContext(AppContext)
  const theme = useTheme()

  return (
    <Box 
      sx={{
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: appContext.editMode ? `1px dotted ${theme.palette.text.primary}` : `1px dotted transparent`,
        display: 'grid',
        gridTemplateColumns: '0.1fr 1.5fr repeat(6, 1fr)',
        height: '2.5em',
        justifyItems: 'center',
        mt: '1em',
        width: '100%'
      }}
    >
      <div></div>
      <TableRowHeader>{states.get(holidays[0].state)}</TableRowHeader>
      <HolidayComponent holiday={holidays[0]} />
      <HolidayComponent holiday={holidays[1]} />
      <HolidayComponent holiday={holidays[2]} />
      <HolidayComponent holiday={holidays[3]} />
      <HolidayComponent holiday={holidays[4]} />
      <HolidayComponent holiday={holidays[5]} />
    </Box>
  )
}