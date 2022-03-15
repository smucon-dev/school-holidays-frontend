import { CognitoUser } from "@aws-amplify/auth"

export interface IAppContext {
  appMode: AppMode
  setAppMode: (appMode: AppMode) => void
  editMode: boolean
  setEditMode: (editMode: boolean) => void
  activeHoliday: Holiday | undefined
  setActiveHoliday: (holiday: Holiday | undefined) => void
}

export type HolidayType = 'Ferien' | 'Feiertag' | 'Schulfrei'

export type AppMode = 'Ferien' | 'Feiertag' | 'Login'

export interface User {
  userName: string,
  cognitoUser: CognitoUser
}

export interface Holiday {
  state: string,
  start: string | undefined,
  end: string | undefined,
  name: string,
  type: string
}

export interface HolidayItem {
  State: string,
  SK: string,
  StartDate: string,
  EndDate: string,
  Name: string,
  Type: string
}