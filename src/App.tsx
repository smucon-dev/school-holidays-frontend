import { ThemeProvider } from '@mui/material';
import React, { createContext, useState } from 'react';
import './App.css';
import Background from './common/Background';
import appTheme from './app/appTheme';
import Header from './common/pageHader/Header';
import { AppMode, Holiday, User } from './app/model';
import HolidayTable from './features/schoolHolidays/HolidayTable';
import { AuthService } from './services/AuthService'
import LoginModal from './features/maintenance/LoginModal';
import { IAppContext } from './app/model'
import { DataService } from './services/DataService';
import InputModal from './common/InputModal';

export const AppContext = createContext<IAppContext>({
  appMode: 'Ferien',
  setAppMode: () => {},
  editMode: false,
  setEditMode: () => {},
  activeHoliday: undefined,
  setActiveHoliday: () => {}
})

const authService: AuthService = new AuthService()
const dataService: DataService = new DataService()


function App() {


  const years = [2021, 2022, 2023]

  const [activeHoliday, setActiveHoliday] = useState<Holiday | undefined>()
  const [appMode, setAppMode] = useState<AppMode>('Ferien')
  const [editMode, setEditMode] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear())

  const setUser = (user: User) => {
    dataService.setUser(user)
  }

  return (
    <ThemeProvider theme={appTheme}>      
      <AppContext.Provider value={{appMode, setAppMode, editMode, setEditMode, activeHoliday, setActiveHoliday}}>      
        <Background id='background'>
        <Header activeYear={year} setActiveYear={setYear} years={years}/>
          {appMode === 'Ferien' && <HolidayTable year={year} dataService={dataService} />}
          {appMode === 'Login' && <LoginModal authService={authService} setUser={setUser} />}
        </Background>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
