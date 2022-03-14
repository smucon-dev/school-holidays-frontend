
export interface IAppContext {
  appMode: AppMode,
  setAppMode: (appMode: AppMode) => void,
  editMode: boolean,
  setEditMode: (editMode: boolean) => void
}

export type HolidayType = 'Ferien' | 'Feiertag' | 'Schulfrei'

export type AppMode = 'Ferien' | 'Feiertag' | 'Login'

export interface User {
  userName: string,
  email: string
}

export interface Holiday {
  state: string,
  start: string | undefined,
  end: string | undefined,
  name: string,
  type: string
}