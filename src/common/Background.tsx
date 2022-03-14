import { Box, Container, useTheme } from "@mui/material";


export default function Background(props: any) {

  const theme = useTheme()
  const gradientStart = theme.palette.background.gradient?.gradientStart
  const gradientEnd = theme.palette.background.gradient?.gradientEnd

  return (
    <Box sx={{
        background: `linear-gradient(180deg, ${gradientStart}, ${gradientEnd})`,
        height: '100vh',
        width: '100vw'
      }}>
      <Container maxWidth='lg'
        sx={{
          display: 'grid',
        }}
      >
        {props.children}
      </Container>
    </Box>
  )

}