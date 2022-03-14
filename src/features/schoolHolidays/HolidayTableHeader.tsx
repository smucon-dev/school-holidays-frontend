import { Box, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ExitToApp from '@mui/icons-material/ExitToApp'
import TableColumnHeader from "../../common/TableColumnHeader";
import { useContext } from "react";
import { AppContext } from "../../App";


interface HolidayTableHeaderProps {
  editMode: boolean
}


export default function HolidayTableHeader({ editMode }: HolidayTableHeaderProps) {

  const theme = useTheme()
  const appContext = useContext(AppContext)

  return (

    <Box
      sx={{
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.text.primary}`,
        display: 'grid',
        gridTemplateColumns: '0.1fr 1.5fr repeat(6, 1fr)',
        justifyItems: 'center',
        height: '3em',
        mb: '2em',
        width: '100%'
      }}
    >
      <div></div>
      {editMode ? <ExitToApp  
                    onClick={() => appContext.setEditMode(false)}
                    sx={{color: theme.palette.text.primary, justifySelf: 'start'}} /> : 
                    <div/>
                  }
      <TableColumnHeader>Winterferien</TableColumnHeader>
      <TableColumnHeader>Osterferien</TableColumnHeader>
      <TableColumnHeader>Pfingstferien</TableColumnHeader>
      <TableColumnHeader>Sommerferien</TableColumnHeader>
      <TableColumnHeader>Herbstferien</TableColumnHeader>
      <TableColumnHeader>Weihnachtsferien</TableColumnHeader>
    </Box>
  )
}