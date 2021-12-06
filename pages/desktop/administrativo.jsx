import nookies from 'nookies'
import { Container, Title, ButtonFile, IconFile, AnimationControl, IconBack, IconButtonBack } from '../../styles/pages/desktop/administrativo'
import Link from 'next/link'

export default function Administrativo() {
  return (
    <Container>
      <Link href="/">
        <IconButtonBack color="primary" component="a" onClick={() => window.desktop.logout()}>
            <IconBack fontSize="large"/>
        </IconButtonBack>
      </Link>
      <Title>Painel de controle Josival Penha</Title>
      <Link href="arquivos">
        <ButtonFile variant="contained" component="a">
          Ver arquivos
          <IconFile fontSize="large"/>
        </ButtonFile>
      </Link>
      <AnimationControl options={{
        animationData: require('../../animations/control.json'),
        autoplay: true,
        loop: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
      }}/>
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
  
    return {
      props: {}
    }
}