import Head from 'next/head'
import nookies from 'nookies'
import { Container, Main } from '../../styles/pages/professoras/index'
import NavTool from '../../components/NavTool'
import api from '../../api/api'

export default function Administrativo() {
  api.professoras.professorasAPI(true).then(quant => console.log(quant))
  return (
    <>
      <Head>
        <title>Administrativo</title>
      </Head>
      <Container>
        <NavTool/>
        <Main>
          <h1>Administrativo</h1>
        </Main>
      </Container>
    </>
  )
}

export const getServerSideProps = async ctx => {
  const { [process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS]:tokenProf } = nookies.get(ctx)
  const { [process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO]:tokenAdmin } = nookies.get(ctx)

  if (tokenProf) {
    return {
      redirect: {
        destination: '/professoras',
        permanent: false
      }
    }
  } else if (tokenAdmin) {
    return {
      props: {}
    }
  } else if (!tokenAdmin || !tokenProf) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}