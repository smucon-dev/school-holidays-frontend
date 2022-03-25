import { Box, CircularProgress, Theme, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check'
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import TableColumnHeader from "../../common/TableColumnHeader";
import { ReactElement, useContext, useState } from "react";
import { AppContext } from "../../App";
import { HolidayType, IAppContext } from "../../app/model";


interface HolidayTableHeaderProps {
  editMode: boolean
  authenticated: boolean
  tokenExpired: () => boolean | undefined
  refreshToken: () => void
  updateDb: () => Promise<void>
  refreshFromCloud: (year: string, type: HolidayType) => Promise<void>
  refreshFromDb: () => Promise<void>
}


export default function HolidayTableHeader({ editMode, authenticated, tokenExpired, refreshToken, updateDb, refreshFromCloud, refreshFromDb }: HolidayTableHeaderProps) {

  const theme = useTheme()
  const appContext = useContext(AppContext)
  const [refreshFromCloudInProgress, setRefreshFromCloudInProgress] = useState(false)
  const [dbWriteInProgress, setDbWriteProgress] = useState(false)

  const handleConfirm = async () => {
    setDbWriteProgress(true)
    await updateDb()
    appContext.setEditMode(false)
    setDbWriteProgress(false)
  }

  const handleRefreshConfirm = async () => {
    setRefreshFromCloudInProgress(true)
    await refreshFromCloud(appContext.year.toString(), appContext.appMode)
    setTimeout(async () => {
      await refreshFromDb()
      setRefreshFromCloudInProgress(false)
    }, 5000)
  }

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
      <div key="placeholde2"/>

      <Box sx={{justifySelf: 'start'}}>
        {renderEditModeMenu(theme, 
                            appContext, 
                            authenticated, 
                            dbWriteInProgress, 
                            refreshFromCloudInProgress,
                            handleConfirm,
                            handleRefreshConfirm)}
      </Box>

      <TableColumnHeader key="Winterferien">Winterferien</TableColumnHeader>
      <TableColumnHeader key="Osterferien">Osterferien</TableColumnHeader>
      <TableColumnHeader key="Pfingstferien">Pfingstferien</TableColumnHeader>
      <TableColumnHeader key="Sommerferien">Sommerferien</TableColumnHeader>
      <TableColumnHeader key="Herbstferien">Herbstferien</TableColumnHeader>
      <TableColumnHeader key="Weihnachtsferien">Weihnachtsferien</TableColumnHeader>
    </Box>
  )
}

const renderEditModeMenu = (theme: Theme,
                            appContext: IAppContext,
                            authenticated: boolean, 
                            dbWriteInProgress: boolean,
                            refreshFromCloud: (boolean),
                            handleConfirm: () => void,
                            handleRefreshConfirm: () => void,
                            ) => {

  const menuItems: ReactElement[] = []
  if (!authenticated) {
    menuItems.push(<div key="placeholde2"/>)
  } else {
    if(!appContext.editMode) {
      menuItems.push(<EditIcon  
                    key='EditIcon'
                    onClick={() => appContext.setEditMode(true)}
                    sx={{color: theme.palette.text.primary, justifySelf: 'start', mr: '0.5em'}} />)

      if (refreshFromCloud) {
        menuItems.push(<CircularProgress key="RefreshProgress" size={20} />)
      } else {
        menuItems.push(<CloudSyncIcon 
                      key='CloudSyncIcon' 
                      onClick={() => handleRefreshConfirm()}
                      sx={{color: theme.palette.text.primary, justifySelf: 'start'}} />)
      }
    } else {
      if (dbWriteInProgress) {
        menuItems.push(<CircularProgress key='UploadProgress' size={20} />)
      } else {
        menuItems.push(<CheckIcon key='CheckIcon' onClick={() => handleConfirm()} sx={{color: theme.palette.success.light}} />)
      }
    }
  }

  return menuItems

}

