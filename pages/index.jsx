import Head from 'next/head'
import { HomeStyleGlobal as HomeStyle } from '../styles/pages'
import Link from 'next/link'
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
    <HomeStyle>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        <HomeStyle.PartLeft className="part-left">
          <HomeStyle.LogoJPNome/>
        </HomeStyle.PartLeft>
        <HomeStyle.PartRight className="part-right">
          <Link href="/administrativo/login" passHref>
            <HomeStyle.LinkAdmin>
              <HomeStyle.LinkAdmin.Icon/>
              Administrativo
            </HomeStyle.LinkAdmin>
          </Link>
          <Link href="/professoras/login" passHref>
            <HomeStyle.LinkProfessoras background="secondary">
              <HomeStyle.LinkProfessoras.Icon/>
              Professoras
            </HomeStyle.LinkProfessoras>
          </Link>
        </HomeStyle.PartRight>
      </main>
    </HomeStyle>
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