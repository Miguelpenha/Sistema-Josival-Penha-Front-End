import Head from 'next/head'
import { Container, ContainerIconBack, IconBack } from '../../styles/pages/administrativo/pagamentos'
import nookies from 'nookies'
import { useRouter } from 'next/router'

export default function Pagamentos() {
    const { voltar } = useRouter().query
    
    return (
        <>
            <Head>
                <title>Pagamentos</title>
            </Head>
            <Container>
                <ContainerIconBack href="/administrativo/alunos">
                    <IconBack xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                    </IconBack>
                </ContainerIconBack>
                <h1>Pagamentos</h1>
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
          destination: tokenDesktop ? '/professoras' : '/desktop/professoras',
          permanent: false
        }
      }
    } else if (tokenAdmin) {
      if (tokenDesktop) {
        return {
          redirect: {
            destination: '/desktop/administrativo',
            permanent: false
          }
        }
      } else {
        return {
          props: {}
        }
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