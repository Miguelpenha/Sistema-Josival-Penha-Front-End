import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import GlobalStyle from '../styles/global'
import Head from 'next/head'
import { AuthProvider } from '../contexts/AuthContext'

function SistemaJosivalPenha({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps}/>
        <GlobalStyle/>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default SistemaJosivalPenha