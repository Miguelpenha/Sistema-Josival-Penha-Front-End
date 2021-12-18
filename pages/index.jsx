import Head from 'next/head'
import { Container, ContainerLogo, Logo, ContainerLinks, Link } from '../styles/pages'
import IconAdmin from '../assets/icon-link-admin.svg'
import IconProf from '../assets/icon-link-professoras.svg'
import nookies from 'nookies'
import { useEffect } from 'react'


export default function Home() {
  useEffect(() => {
    if (window.desktop) {
      nookies.set(undefined, process.env.NEXT_STATIC_NAME_COOKIE_DESKTOP, true, {
        path: '/',
        secure: true,
        domain: process.env.NEXT_STATIC_DOMAIN,
        maxAge: 52560000 * 60 * 1 // 100 year
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container>
        <ContainerLogo>
          <Logo/>
        </ContainerLogo>
        <ContainerLinks>
          <Link href="/administrativo" bg="#0872FC">
            <IconAdmin/>
            Administrativo
          </Link>
          <Link href="/administrativo" bg="#6A54ED">
          <IconProf/>
            Professoras
          </Link>
        </ContainerLinks>
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
        destination: tokenDesktop ? 'desktop/professoras' : 'professoras',
        permanent: false
      }
    }
  } else if (tokenAdmin) {
    return {
      redirect: {
        destination: tokenDesktop ? 'desktop/administrativo' : 'administrativo/alunos',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}