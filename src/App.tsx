import { ThemeProvider } from '@mui/material';
import React, { createContext, useState } from 'react';
import './App.css';
import Background from './common/Background';
import appTheme from './app/appTheme';
import Header from './common/pageHader/Header';
import { AppMode, User } from './app/model';
import HolidayTable from './features/schoolHolidays/HolidayTable';
import { AuthService } from './services/AuthService'
import Login from './features/maintenance/Login';
import { IAppContext } from './app/model'
import { DataService } from './services/DataService';

export const AppContext = createContext<IAppContext>({
  appMode: 'Ferien',
  setAppMode: () => {},
  editMode: false,
  setEditMode: () => {},
})


function App() {

  const authService: AuthService = new AuthService()
  const dataService: DataService = new DataService()

  const years = [2021, 2022, 2023]


  const [user, setUser] = useState<User | undefined>()
  const [appMode, setAppMode] = useState<AppMode>('Ferien')
  const [editMode, setEditMode] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear())

  return (
    <ThemeProvider theme={appTheme}>      
      <AppContext.Provider value={{appMode, setAppMode, editMode, setEditMode}}>      
        <Background id='background'>
        <Header activeYear={year} setActiveYear={setYear} years={years}/>
          {appMode === 'Ferien' && <HolidayTable year={year} dataService={dataService} />}
          {appMode === 'Login' && <Login authService={authService} setUser={setUser} />}
        </Background>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
