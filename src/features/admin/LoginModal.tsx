import { Button, Modal, Paper, TextField, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { SyntheticEvent, useState } from "react"
import { User } from "../../app/model"
import { AuthService } from "../../services/AuthService"


interface LoginProps {
  setUser: (user: User) => void
  authService: AuthService
  showLoginModal: boolean
  setShowLoginModal: (show: boolean) => void
}


export default function LoginModal(props: LoginProps) {

  const theme = useTheme()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loginAttempted, setLoginAttempted] = useState(false)
  const [loginSuccessful, setLoginSuccessful] = useState(false)

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserName(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const result = await props.authService.login('HolidayAdmin', '<6xm=BkGZpcD_>>a6PXDd\\!\\sw')
    // const result = await authService.login(userName, password)
    if (result) {
      setLoginSuccessful(true)
      props.setUser(result)
      setLoginAttempted(true)
      props.setShowLoginModal(false)
    } else {
      setLoginSuccessful(false)
      setLoginAttempted(true)
    }
  }

  let loginMessage: any
  if (loginAttempted && !loginSuccessful) 
  {
      loginMessage = <Box sx={{alignSelf: 'start', width: '60%', mt: '-0.5em'}}>
          <Typography sx={{
            color: theme.palette.error.main,
            ml: '0.5em'
            }}
            >Login failed!
          </Typography>            
        </Box>
  }


  return (
    <Modal
      open={props.showLoginModal}
      onClose={() => props.setShowLoginModal(false)}
      disableAutoFocus={true}
    >
      <Box component='form' autoComplete="off" >
        <Paper
          sx={{
            alignItems: 'center',
            backgroundColor: 'rgba(64, 64, 64, 1)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr 1fr 1fr 1fr 0.5fr',
            justifyItems: 'center',
            justifySelf: 'center',
            height: '25em',
            left: '50%',
            position: 'absolute',
            rowGap: '1em',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20em',
          }}
        >
          <Typography sx={{fontSize: '2em', mt: '0.25em'}}>Login</Typography>
          <TextField key='userId' 
                    id='userId' 
                    label='User Id'
                    onChange={(e) => handleUserNameChange(e)} 
                    value={userName}
                    sx={{width: '60%'}}/>
          <TextField key='password'
                    id='password' 
                    label='Password' 
                    type='password' 
                    onChange={(e) => handlePasswordChange(e)}
                    value={password}
                    sx={{width: '60%'}}/>
          
          <Button 
            color='primary'
            onClick={(e) => handleSubmit(e)}
            variant='contained' 
            sx={{
              fontSize: '1.5em',
              height: '2em',
              width: '60%'
            }}>
              Login
          </Button>
          {!loginSuccessful ? loginMessage : <div/>}
        </Paper>
      </Box>
    </Modal>

  )
}