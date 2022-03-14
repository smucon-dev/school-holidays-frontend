import * as createPalette from '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {

  interface BackgroundGradientOptions {
    gradientStart?: string,
    gradientEnd?: string
  }

  interface TypeBackground {
    default: string;
    paper: string;
    gradient?: BackgroundGradientOptions
  }

}