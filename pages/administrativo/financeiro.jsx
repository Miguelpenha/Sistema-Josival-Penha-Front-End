import Head from 'next/head'
import nookies from 'nookies'
import { Container, Main, IconAdd, IconTrendingDown } from '../../styles/pages/administrativo/financeiro'
import { NavOptions, LogoJPNome, Funções, Função, LinkFunção, IconAlunos, IconAcadêmico, IconDashBoard, IconMarketing, IconFinanceiroSele, IconColaboradores } from '../../components/NavTool'
import Link from 'next/link'
import { Menu, MenuItem, Box, Typography, Modal } from '@material-ui/core'
import { useState } from 'react'


export default function Financeiro() {
  const [fechadoCadas, setFechadoCadas] = useState(null)
  const openCadas = Boolean(fechadoCadas)

  function clickCadas(event) {
    setFechadoCadas(event.currentTarget)
  }

  function clickCloseCadas() {
    setFechadoCadas(null)
  }
  return (
    <>
      <Head>
        <title>Administrativo (Financeiro)</title>
      </Head>
      <Container>
        <NavOptions>
          <LogoJPNome/>
          <Funções>
            <Link href="alunos">
                <Função>
                    <LinkFunção>
                        <IconAlunos/>
                        Alunos
                    </LinkFunção>
                </Função>
            </Link>
            <Link href="academico">
              <Função>
                <LinkFunção>
                  <IconAcadêmico/>
                  Acadêmico
                </LinkFunção>
              </Função>
            </Link>
            <Link href="dashboard">
              <Função>
                <LinkFunção>
                  <IconDashBoard/>
                  Dashboard
                </LinkFunção>
              </Função>
            </Link>
            <Link href="marketing">
              <Função>
                <LinkFunção>
                  <IconMarketing/>
                  Marketing
                </LinkFunção>
              </Função>
            </Link>
            <Função selected={true}>
                <IconFinanceiroSele/>
                Financeiro
            </Função>
            <Link href="colaboradores">
              <Função>
                <LinkFunção>
                  <IconColaboradores/>
                  Colaboradores
                </LinkFunção>
              </Função>
            </Link>
          </Funções>
        </NavOptions>
        <Main>
          <IconAdd onClick={clickCadas}/>
          <Menu anchorEl={fechadoCadas} open={openCadas} onClose={clickCloseCadas} MenuListProps={{
          'aria-labelledby': 'basic-button',
        }} style={{height: '20%', width: '28%'}} >
            <MenuItem disableRipple style={{height: '100%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}}>
              <IconTrendingDown/>
              Despesas
            </MenuItem>
          </Menu>
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