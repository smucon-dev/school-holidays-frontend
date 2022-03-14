import { Box, SxProps, Theme, Typography, useTheme } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


interface YearSelectorProps {
  activeYear: number,
  setActiveYear: (year: number) => void,
  years: number[]
  sx?: SxProps<Theme>,
}


export default function YearSelector(props: YearSelectorProps) {

  const theme = useTheme()

  const sx = props.sx || []
  const prevDisabled = props.activeYear === Math.min(...props.years)
  const nextDisabled = props.activeYear === Math.max(...props.years)
  

  const nextYear = () => {
    if(!nextDisabled) {
      props.setActiveYear(props.activeYear + 1)
    }
  }

  const previousYear = () => {
    if(!prevDisabled) {
      props.setActiveYear(props.activeYear - 1)
    }
  }

  return (
    <Box
      sx={[
      ...Array.isArray(sx) ? sx :[sx],
      {
        alignItems: 'center',
        display: 'grid',  
        gridTemplateColumns: '1fr 2fr 1fr',
        justifyItems: 'center'
      }
      ]
      }>
      <NavigateBeforeIcon fontSize='inherit' onClick={() => previousYear()} 
                          sx={{color: prevDisabled ? theme.palette.text.disabled : theme.palette.text.primary}} />
      <Typography sx={{fontSize: 'inherit'}}>{props.activeYear}</Typography>
      <NavigateNextIcon fontSize='inherit' onClick={() => nextYear()}
                          sx={{color: nextDisabled ? theme.palette.text.disabled : theme.palette.text.primary}}/>
    </Box>
  )

}