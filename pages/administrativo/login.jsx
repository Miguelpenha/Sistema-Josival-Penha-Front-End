import { Container, ContainerLogo, Logo, ContainerForm, Form, Title, Campo, Label, Input, Button, IconButtonBack, IconBack } from '../../styles/pages/administrativo/login'
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
    const token = await api.administrativo.login(login, senha, true, window.navigator.userAgent.split('(')[1].split(')')[0].split(';').map(info => info.trim()))
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
      {window.desktop && <Link href="/">
        <IconButtonBack color="primary" component="a">
            <IconBack fontSize="large"/>
        </IconButtonBack>
      </Link>}
      <Container>
        <ContainerLogo>
          <Logo/>
        </ContainerLogo>
        <ContainerForm>
          <Form action='/administrativo' onSubmit={handleSubmit(enviar)} error={error}>
            <Title>Seja bem vindo!</Title>
            {error && <ErrorMsg>{errorMsg}</ErrorMsg>}
            <Campo>
              <Label>Login de acesso</Label>
              <Input {...register('login')} name="login" type="text" required/>
            </Campo>
            <Campo>
              <Label>Senha de acesso</Label>
              <Input {...register('senha')} name="senha" type="password" required/>
            </Campo>
            <Button type="submit">Entrar</Button>
          </Form>
        </ContainerForm>
      </Container>
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