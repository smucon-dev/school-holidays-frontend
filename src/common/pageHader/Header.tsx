import { alpha, Box, Button, Typography, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import YearSelector from "./YearSelector";
import { useContext } from "react";
import { AppContext } from '../../App'


interface HeaderProps {
  activeYear: number,
  setActiveYear: (year: number) => void,
  years: number[]
}


export default function Header(props: HeaderProps) {

  const theme = useTheme()
  const appContext = useContext(AppContext)
  const appMode = appContext.appMode
  const setAppMode = appContext.setAppMode
  let headline = ''

  switch (appContext.appMode) {
    case 'Feiertag':
      headline='Feiertage'
      break
    case 'Ferien':
      headline='Ferien'
      break
    case 'Login':
      headline='Login'
      break
    
  }

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        height: '7rem'
      }}>

      
      {/* left side */}
      <Box sx={{
          display: 'flex',
          columnGap: '1em', 
          width: '50%'
        }}>

          {/* Ferien/Feiertage Buttons */}
          {['Ferien', 'Feiertag'].includes(appMode) &&  <Button variant='contained' color='secondary'
                  disableElevation
                  sx={{
                    backgroundColor: appMode === 'Ferien' ? theme.palette.secondary.main : alpha(theme.palette.secondary.main, 0.25),
                    borderRadius: '10px',
                    height: '2.25em',
                    width: '45%'
                  }}
                  >
            Ferien
          </Button>}
          {['Ferien', 'Feiertag'].includes(appMode) && <Button variant='contained' color='secondary'
                  disableElevation
                  sx={{
                    backgroundColor: appMode === 'Feiertag' ? theme.palette.secondary.main : alpha(theme.palette.secondary.main, 0.25),
                    borderRadius: '10px',
                    height: '2.25em',
                    width: '45%'
                  }}
                  >
            Feiertage
          </Button>}
          
          {/* back button */}
          {appMode === 'Login' && <ArrowBackIosNewIcon onClick={() => setAppMode('Ferien')}/>}

      </Box>

      {/* Headline */}
      <Typography
        onClick={() => setAppMode('Login')}
        sx={{
          fontSize: '2.5rem',
          justifySelf: 'center'
        }}>
        {headline}
      </Typography>

      {/* Year Selector */}
{['Ferien', 'Feiertag'].includes(appMode) && <YearSelector activeYear={props.activeYear} 
                    setActiveYear={props.setActiveYear}
                    years={props.years}
        sx={{
          fontSize: '2rem',
          justifySelf: 'right',
          width: '40%'
        }}/>}

    </Box>
  )

}