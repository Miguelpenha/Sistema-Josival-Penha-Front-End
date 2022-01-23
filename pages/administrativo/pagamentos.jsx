import Head from 'next/head'
import { Container, Main } from '../../styles/pages/administrativo/pagamentos'
import {
  NavOptions,
  LogoJPNome,
  Funções,
  Função,
  LinkFunção,
  IconAlunos,
  IconFinanceiro,
  IconPagamentosSele,
  IconAcadêmico,
  IconDashBoard,
  IconMarketing,
  IconColaboradores,
  TextFunção
} from '../../components/NavTool'
import Link from 'next/link'
import nookies from 'nookies'

export default function Pagamentos() {
    return (
        <>
            <Head>
                <title>Pagamentos</title>
            </Head>
            <Container>
              <NavOptions>
                <LogoJPNome/>
                <Funções>
                  <Função>
                    <Link href="/administrativo/alunos" passHref>
                        <LinkFunção>
                          <IconAlunos/>
                          <TextFunção>Alunos</TextFunção>
                        </LinkFunção>
                    </Link>
                  </Função>
                  <Função>
                    <Link href="/administrativo/academico" passHref>
                      <LinkFunção>
                        <IconAcadêmico/>
                        <TextFunção>Acadêmico</TextFunção>
                      </LinkFunção>
                    </Link>
                  </Função>
                  <Função>
                    <Link href="/administrativo/dashboard" passHref>
                      <LinkFunção>
                        <IconDashBoard/>
                        <TextFunção>Dashboard</TextFunção>
                      </LinkFunção>
                    </Link>
                  </Função>
                  <Função>
                    <Link href="/administrativo/marketing" passHref>
                      <LinkFunção>
                        <IconMarketing/>
                        <TextFunção>Marketing</TextFunção>
                      </LinkFunção>
                    </Link>
                  </Função>
                  <Função selected={true}>
                      <IconPagamentosSele/>
                      <TextFunção>Pagamentos</TextFunção>
                  </Função>
                  <Função>
                    <Link href="/administrativo/financeiro" passHref>
                      <LinkFunção>
                        <IconFinanceiro/>
                        <TextFunção>Financeiro</TextFunção>
                      </LinkFunção>
                    </Link>
                  </Função>
                  <Função>
                    <Link href="/administrativo/colaboradores" passHref>
                      <LinkFunção>
                        <IconColaboradores/>
                        <TextFunção>Colaboradores</TextFunção>
                      </LinkFunção>
                    </Link>
                  </Função>
                </Funções>
              </NavOptions>
              <Main>
                <h1>Pagamentos</h1>
              </Main>
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