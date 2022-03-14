import { alpha, Button, Paper, TextField, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { SyntheticEvent, useContext, useState } from "react"
import { AppContext } from "../../App"
import { User } from "../../app/model"
import { AuthService } from "../../services/AuthService"


interface LoginProps {
  authService: AuthService
  setUser: (user: User) => void
}


export default function Login({ authService, setUser }: LoginProps) {

  const theme = useTheme()
  const appContext = useContext(AppContext)

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
    setLoginAttempted(true)
    const result = await authService.login(userName, password)
    if (result) {
      setLoginSuccessful(true)
      setUser(result)
      appContext.setEditMode(true)
      appContext.setAppMode('Ferien')
    } else {
      setLoginSuccessful(false)
    }
  }

  let loginMessage: any
  if (loginAttempted && !loginSuccessful) {
      loginMessage = <Paper elevation={0} 
                        sx={{
                          alignItems: 'center',
                          backgroundColor: alpha(theme.palette.error.main, 0.75), 
                          display: 'flex',
                          height: '2em',
                          pl: '0.5em'
                          }}>
                        <Typography >Login failed!</Typography>
                    </Paper>
  }

  return (
    <Box component='form'
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        justifySelf: 'center',
        rowGap: '2em',
        width: '20em',
      }}
      >
      <TextField key='userId' 
                id='userId' 
                label='User Id'
                onChange={(e) => handleUserNameChange(e)} 
                value={userName}
                sx={{width: '100%'}}/>
      <TextField key='password'
                id='password' 
                label='Password' 
                type='password' 
                onChange={(e) => handlePasswordChange(e)}
                value={password}
                sx={{width: '100%'}}/>
      
      <Button 
        color='primary'
        onClick={(e) => handleSubmit(e)}
        variant='contained' 
        sx={{
          fontSize: '1.5em',
          width: '100%'
        }}>
          Login
      </Button>
      {!loginSuccessful && loginMessage}
    </Box>
  )
}