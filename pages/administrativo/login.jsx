import { LoginStyleGlobal as LoginStyle, IconButtonBack, IconBack } from '../../styles/pages/administrativo/login'
import Head from 'next/head'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { AuthContext } from '../../contexts/AuthContext'
import nookies from 'nookies'
import ErrorMsg from '../../components/ErrorMsg'
import api from '../../services/api/api'
import Link from 'next/link'

export default function Login() {
  const { sigIn } = useContext(AuthContext)
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  
  async function enviar(data, event) {
    const { login, senha } = data
    const token = await api.administrativo.login(login, senha, false)
    if (token) {
      setError(false)
      setErrorMsg('')
      sigIn({
        login,
        senha
      }, 'administrativo', window.navigator.userAgent.split('(')[1].split(')')[0].split(';').map(info => info.trim())).then(() => {
        window.desktop ? router.push('/desktop/administrativo').then() : router.push('/administrativo/alunos').then()
      })
    } else {
      event.preventDefault()
      setError(true)
      setErrorMsg('Login ou senha inválidos')
    }
  }
  
  return (
    <>
      <Head>
        <title>Login Administrativo</title>
      </Head>
      <Link href="/">
        <IconButtonBack color="primary" component="a">
            <IconBack fontSize="large"/>
        </IconButtonBack>
      </Link>
      <LoginStyle>
        <LoginStyle.PartLeft>
          <LoginStyle.PartLeft.LogoJPNome/>
        </LoginStyle.PartLeft>
        <LoginStyle.PartRight>
            {error && <ErrorMsg>{errorMsg}</ErrorMsg>}
            <LoginStyle.PartRight.Form action='/administrativo' onSubmit={handleSubmit(enviar)} error={error}>
                <LoginStyle.PartRight.Form.Tit>
                    Seja bem vindo!
                </LoginStyle.PartRight.Form.Tit>
                <LoginStyle.PartRight.Form.Label>Login de acesso</LoginStyle.PartRight.Form.Label>
                <LoginStyle.PartRight.Form.Input {...register('login')} name="login" type="text" required/>
                <LoginStyle.PartRight.Form.Label>Senha de acesso</LoginStyle.PartRight.Form.Label>
                <LoginStyle.PartRight.Form.Input {...register('senha')} name="senha" type="password" required/>
                <LoginStyle.PartRight.Form.Btn type="submit">Entrar</LoginStyle.PartRight.Form.Btn>
            </LoginStyle.PartRight.Form>
        </LoginStyle.PartRight>
      </LoginStyle>
    </>
  )
}

export const getServerSideProps = async ctx => {
  const { [process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS]:tokenProf } = nookies.get(ctx)
  const { [process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO]:tokenAdmin } = nookies.get(ctx)
  const { [process.env.NEXT_STATIC_NAME_COOKIE_DESKTOP]:tokenDesktop } = nookies.get(ctx)
  
  if (tokenProf) {
    return {
      redirect: {
        destination: tokenDesktop ? '/desktop/professoras' : '/professoras',
        permanent: false
      }
    }
  } else if (tokenAdmin) {
    return {
      redirect: {
        destination: tokenDesktop ? '/desktop/administrativo' : '/administrativo/alunos',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}