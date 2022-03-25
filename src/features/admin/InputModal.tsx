import { Box, Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { DataService } from "../../services/DataService";
import { states } from '../../services/config'
import { buildSK, convertDbDate, convertToDbDate } from '../../common/utils/Utils'
import { Holiday, HolidayItem } from "../../app/model";


interface InputModalProps {
  dataService: DataService
  updateHolidays: (holiday: Holiday) => void
  year: string
}


export default function InputModal({ dataService, updateHolidays, year }: InputModalProps) {

  const appContext = useContext(AppContext)
  const holiday = appContext.activeHoliday

  const convertedStartDate = holiday && holiday.start ? convertDbDate(holiday.start) : ''
  const convertedEndDate = holiday && holiday.end ? convertDbDate(holiday.end) : ''

  const [start, setStart] = useState(convertedStartDate.slice(0, 6))
  const [end, setEnd] = useState(convertedEndDate.slice(0, 6))
  const [startError, setStartError] = useState(false)
  const [endError, setEndError] = useState(false)


  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    if(value.match('^[0-9.]*$')) {
      setStart(e.target.value)
    }
  }

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    if(value.match('^[0-9.]*$')) {
      setEnd(e.target.value)
    }
  }

  const validateStartDate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    if(!value.match(/^\d\d\.\d\d\.$/)) {
      setStartError(true)
    } else {
      setStartError(false)
    }
  }

  const validateEndDate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    if(!value.match(/^\d\d\.\d\d\.$/)) {
      setEndError(true)
    } else {
      setEndError(false)
    }
  }

  const handleSubmit = async () => {

    const newHoliday: Holiday = {
      state: holiday!.state,
      start: convertToDbDate(start + year),
      end: convertToDbDate(end + year),
      name: holiday!.name,
      type: holiday!.type
    }
    
    updateHolidays(newHoliday)
    appContext.setActiveHoliday(undefined)
  }

  const handleDelete = async () => {

    const newHoliday: Holiday = {
      state: holiday!.state,
      start: '',
      end: '',
      name: holiday!.name,
      type: holiday!.type
    }

    updateHolidays(newHoliday)
    appContext.setActiveHoliday(undefined)
  }

  const width = '25em'
  const height = '38em'
  const tfInputProps = {style: {padding: '0.6em 1em'}, autoComplete: 'off'}

  return (
    <Modal
      open={holiday !== undefined}
      onClose={() => appContext.setActiveHoliday(undefined)}
      disableAutoFocus={true}
    >
      <Box 
        component='form'
        autoComplete="off"
      >
        <Paper
          sx={{
            backgroundColor: 'rgba(104, 104, 104, 1)',
            display: 'grid',
            gridTemplateRows: '1.25fr repeat(7, 1fr) 0.4fr',
            height: height,
            justifyItems: 'center',
            alignItems: 'start',
            left: '50%',
            position: 'absolute',
            rowGap: '0.3em',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: width
          }}
        > 
          <Typography sx={{fontSize: '1.5em', mt: '1em'}}>Termin</Typography>
          {/* state */}
          <TextField key='Bundesland' label='Bundesland' disabled
                    defaultValue={states.get(holiday!.state)}
                    inputProps={tfInputProps} 
                    sx={{width: '60%'}}/>
          {/* Type */}
          <TextField key='Type' label='Typ' disabled
                    defaultValue={holiday!.type}
                    inputProps={tfInputProps} 
                    sx={{width: '60%'}}/>
          {/* Name */}
          <TextField key='Name' label='Name' disabled
                    defaultValue={holiday!.name}
                    inputProps={tfInputProps} 
                    sx={{width: '60%'}}/>
          {/* Start */}
          <TextField key='Start' label='Beginn TT.MM.' 
                    autoFocus
                    error={startError}
                    helperText={startError ? 'TT.MM.' : ''}
                    value={start}
                    onChange={(e) => handleStartChange(e)}
                    onBlur={(e) => validateStartDate(e)}
                    inputProps={tfInputProps} 
                    sx={{width: '60%'}}/>
          {/* End */}
          <TextField key='Ende' label='Ende TT.MM.' 
                    error={endError}
                    helperText={endError ? 'TT.MM.' : ''}
                    value={end}
                    onChange={(e) => handleEndChange(e)}
                    onBlur={(e) => validateEndDate(e)}
                    inputProps={tfInputProps} 
                    sx={{width: '60%'}}/>

          <Button onClick={() => handleDelete()}
                  variant='contained' 
                  disabled={startError || endError}
                  color='secondary' 
                  sx={{height: '80%', width: '60%'}}>Delete</Button>
          <Button onClick={() => handleSubmit()}
                  variant='contained' 
                  disabled={startError || endError}
                  sx={{height: '80%', width: '60%'}}>Save</Button>
        </Paper>
      </Box>
    </Modal>
  )

}