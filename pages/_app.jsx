import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import GlobalStyle from '../styles/global'
import { AuthProvider } from '../contexts/AuthContext'
import { ApiProvider } from '../contexts/ApiContext'

function SistemaJosivalPenha({ Component, pageProps }) {
  return (
    <ApiProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {pageProps.veriApi ? <div>Carregando...</div> : <Component {...pageProps}/>}
          <GlobalStyle/>
        </ThemeProvider>
      </AuthProvider>
    </ApiProvider>
  )
}

export default SistemaJosivalPenha