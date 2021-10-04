import Head from 'next/head'
import HomeStyle from '../styles/pages/Home'
import Link from 'next/link'
import nookies from 'nookies'

export default function Home() {
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

  if (tokenProf) {
    return {
      redirect: {
        destination: '/professoras',
        permanent: false
      }
    }
  } else if (tokenAdmin) {
    return {
      redirect: {
        destination: '/administrativo/alunos',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}