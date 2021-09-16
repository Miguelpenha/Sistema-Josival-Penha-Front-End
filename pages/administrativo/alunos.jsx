import Head from 'next/head'
import nookies from 'nookies'
import { Container, NavOptions, LogoJPNome, Funções, Função, IconAlunosSele, IconAcadêmico, IconDashBoard, IconMarketing, IconFinanceiro, IconColaboradores, Main } from '../../styles/pages/administrativo/alunos'
import api from '../../api/api'

export default function Alunos() {
  api.professoras.professorasAPI(true).then(quant => console.log(quant))
  return (
    <>
      <Head>
        <title>Administrativo (Alunos)</title>
      </Head>
      <Container>
        <NavOptions>
          <LogoJPNome/>
          <Funções>
            <Função selected={true}>
              <IconAlunosSele/>
              Alunos
            </Função>
            <Função>
              <IconAcadêmico/>
              Acadêmico  
            </Função>
            <Função>
              <IconDashBoard/>
              Dashboard
            </Função>
            <Função>
              <IconMarketing/>
              Marketing
            </Função>
            <Função>
              <IconFinanceiro/>
              Financeiro
            </Função>
            <Função>
              <IconColaboradores/>
              Colaboradores
            </Função>
          </Funções>
        </NavOptions>
        <Main>
          asd
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