import Head from 'next/head'
import nookies from 'nookies'
import { Container, Main } from '../../styles/pages/professoras/index'
import NavTool from '../../components/NavTool'

export default function Professoras() {
  return (
    <>
      <Head>
        <title>Professoras</title>
      </Head>
      <Container>
        <NavTool/>
        <Main>
          <h1>Professoras</h1>
        </Main>
      </Container>
    </>
  )
}

export const getServerSideProps = async ctx => {
  const { [process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS]:tokenProf } = nookies.get(ctx)
  const { [process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO]:tokenAdmin } = nookies.get(ctx)

  if (tokenAdmin) {
    return {
      redirect: {
        destination: '/administrativo/alunos',
        permanent: false
      }
    }
  } else if (tokenProf) {
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