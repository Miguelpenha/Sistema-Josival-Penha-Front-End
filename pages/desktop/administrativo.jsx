import { Container, ContainerIconBack, IconBack, Title, ContainerIconFile, IconFile, Animation } from '../../styles/pages/desktop/administrativo'
import { useRouter } from 'next/router'
import Link from 'next/link'
import nookies from 'nookies'

export default function Administrativo() {
  const router = useRouter()

  return (
    <Container>
      <ContainerIconBack title="Sair do sistema" onClick={() => {
        window.desktop.logout()
        router.push('/')
      }}>
        <IconBack xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
        </IconBack>
      </ContainerIconBack>
      <Title>Painel de controle Josival Penha</Title>
      <Link href="/desktop/arquivos">
        <ContainerIconFile title="Ver arquivos">
          Ver arquivos
          <IconFile xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/>
          </IconFile>
        </ContainerIconFile>
      </Link>
      <Animation options={{
        animationData: require('../../animations/control.json'),
        autoplay: true,
        loop: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
      }} isClickToPauseDisabled/>
    </Container>
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
        if (tokenDesktop) {
            return {
                props: {}
            }
        } else {
            return {
                redirect: {
                  destination: '/administrativo/alunos',
                  permanent: false
                }
            }
        }
    }

    if (!tokenAdmin || tokenProf) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
    }
    }
  
    return {
      props: {}
    }
}