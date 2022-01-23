import { get } from '../../hooks'
import { useState } from 'react'
import Head from 'next/head'
import { Container, Main } from '../../styles/pages/administrativo/pagamentos'
import NavOptions from '../../components/pages/administrativo/pagamentos/NavOptions'
import ModalMensalidade from '../../components/pages/administrativo/pagamentos/ModalMensalidade'
import nookies from 'nookies'

export default function Pagamentos() {
  const { data: alunos } = get('/alunos')
  const [openModalMensalidade, setOpenModalMensalidade] = useState(false)
  const [aluno, setAluno] = useState(null)
  const [mesMensalidade, setMesMensalidade] = useState(null)
  const handleCloseModalMensalidade = () => setOpenModalMensalidade(false)
  const handleOpenModalMensalidade = () => setOpenModalMensalidade(true)

  return (
      <>
          <Head>
              <title>Pagamentos</title>
          </Head>
          <Container>
            <NavOptions/>
            <Main>
              <h1
                onClick={() => {
                  handleOpenModalMensalidade()
                  setAluno(alunos[0])
                  setMesMensalidade('01')
                }}
              >
                Pagamentos
              </h1>
              <ModalMensalidade
                open={openModalMensalidade}
                onClose={handleCloseModalMensalidade}
                aluno={aluno}
                mesMensalidade={mesMensalidade}
              />
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