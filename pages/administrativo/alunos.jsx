import Head from 'next/head'
import nookies from 'nookies'
import { Container, NavOptions, LogoJPNome, Funções, Função, IconAlunosSele, IconAcadêmico, IconDashBoard, IconMarketing, IconFinanceiro, IconColaboradores, Main, AlunosBanner, InfoAdminContainer, InfoAdmin, InfoAdminTit, InfoAdminDado, IconInfoTotalAlunos, IconInfoTotalTurmas, IconInfoMédiaAlunos, IconInfoOcupação, NavInfos } from '../../styles/pages/administrativo/alunos'
import api from '../../api/api'
import { useEffect, useState } from 'react'

export default function Alunos() {
  const [alunos, setAlunos] = useState(0)
  const fetcher = (url) => fetch(url).then((res) => res.json())

  const { data, error } = useSWR('', fetcher)
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
          <AlunosBanner>
            Alunos
          </AlunosBanner>
          <InfoAdminContainer>
            <InfoAdmin>
              <InfoAdminTit>Total de Alunos</InfoAdminTit>
              <InfoAdminDado>{alunos}</InfoAdminDado>
              <IconInfoTotalAlunos/>
            </InfoAdmin>
            <InfoAdmin>
              <InfoAdminTit>Total de Turmas</InfoAdminTit>
              <InfoAdminDado>9</InfoAdminDado>
              <IconInfoTotalTurmas/>
            </InfoAdmin>
            <InfoAdmin>
              <InfoAdminTit>Média de Alunos por Turma</InfoAdminTit>
              <InfoAdminDado>13,3</InfoAdminDado>
              <IconInfoMédiaAlunos/>
            </InfoAdmin>
            <InfoAdmin>
              <InfoAdminTit>Ocupação das Vagas</InfoAdminTit>
              <InfoAdminDado>84%</InfoAdminDado>
              <IconInfoOcupação/>
            </InfoAdmin>
          </InfoAdminContainer>
        </Main>
        <NavInfos>
          asd2
        </NavInfos>
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