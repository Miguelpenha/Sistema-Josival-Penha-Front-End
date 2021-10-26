import Head from 'next/head'
import nookies from 'nookies'
import { Container, Main, AlunosBanner, InfoAdminContainer, InfoAdmin, InfoAdminTit, InfoAdminDado, IconInfoTotalAlunos, IconInfoTotalTurmas, IconInfoMédiaAlunos, IconInfoOcupação, NavInfos, IconAdd, IconAddCircleOutline } from '../../styles/pages/administrativo/alunos'
import { NavOptions, LogoJPNome, Funções, Função, LinkFunção, IconAlunosSele, IconFinanceiro, IconAcadêmico, IconDashBoard, IconMarketing, IconColaboradores, TextFunção } from '../../components/NavTool'
import { get } from '../../hooks'
import Skeleton from '@material-ui/core/Skeleton'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import TableAlunos from '../../components/TableAlunos'
import { Menu, MenuItem } from '@material-ui/core'

export default function Alunos() {
  const { data: quantAlunos, mutate: mutateQuantAlunos } = get('/alunos?quant=true')
  const { data: quantTurmas, mutate: mutateQuantTurmas } = get('/turmas?quant=true')
  const { data: alunos, mutate: mutateAlunos } = get('/alunos')
  const [mediaAlunos, setMediaAlunos] = useState(undefined)
  const [mediaOcupação, setMediaOcupação] = useState(undefined)
  const [fechadoCadas, setFechadoCadas] = useState(null)
  const openCadas = Boolean(fechadoCadas)

  function clickCloseCadas() {
    setFechadoCadas(null)
  }

  function clickCadas(event) {
    setFechadoCadas(event.currentTarget)
  }

  useEffect(() => {
    if (quantTurmas && quantAlunos) {
      setMediaAlunos(parseFloat(Number(quantAlunos.quant)/Number(quantTurmas.quant)).toFixed(2))
      setMediaOcupação(parseFloat((Number(quantAlunos.quant)*Number(quantTurmas.quant))/100).toFixed(2))
    }
  }, [quantAlunos, quantTurmas])
  
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
              <TextFunção>Alunos</TextFunção>
            </Função>
            <Função>
              <Link href="academico" passHref>
                <LinkFunção>
                  <IconAcadêmico/>
                  <TextFunção>Acadêmico</TextFunção>
                </LinkFunção>
              </Link>
            </Função>
            <Função>
              <Link href="dashboard" passHref>
                <LinkFunção>
                  <IconDashBoard/>
                  <TextFunção>Dashboard</TextFunção>
                </LinkFunção>
              </Link>
            </Função>
            <Função>
              <Link href="marketing" passHref>
                <LinkFunção>
                  <IconMarketing/>
                  <TextFunção>Marketing</TextFunção>
                </LinkFunção>
              </Link>
            </Função>
            <Função>
              <Link href="financeiro" passHref>
                <LinkFunção>
                  <IconFinanceiro/>
                  <TextFunção>Financeiro</TextFunção>
                </LinkFunção>
              </Link>
            </Função>
            <Função>
              <Link href="colaboradores" passHref>
                <LinkFunção>
                  <IconColaboradores/>
                  <TextFunção>Colaboradores</TextFunção>
                </LinkFunção>
              </Link>
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
              {!quantAlunos && <Skeleton variant="rectangular" width={`20%`} height={35} style={{display: 'inline-block', borderRadius: '10px', marginTop: '5%'}} animation="wave"/>}
              {quantAlunos && <InfoAdminDado>{quantAlunos.quant}</InfoAdminDado>}
              <IconInfoTotalAlunos/>
            </InfoAdmin>
            <InfoAdmin>
              <InfoAdminTit>Total de Turmas</InfoAdminTit>
              {!quantTurmas && <Skeleton variant="rectangular" width={`20%`} height={35} style={{display: 'inline-block', borderRadius: '10px', marginTop: '5%'}} animation="wave"/>}
              {quantTurmas && <InfoAdminDado>{quantTurmas.quant}</InfoAdminDado>}
              <IconInfoTotalTurmas/>
            </InfoAdmin>
            <InfoAdmin>
              <InfoAdminTit>Média de Alunos por Turma</InfoAdminTit>
              {!mediaAlunos && mediaAlunos != 0 && <Skeleton variant="rectangular" width={`20%`} height={35} style={{display: 'inline-block', borderRadius: '10px', marginTop: '5%'}} animation="wave"/>}
              {mediaAlunos >= 0 && <InfoAdminDado>{mediaAlunos}</InfoAdminDado>}
              <IconInfoMédiaAlunos/>
            </InfoAdmin>
            <InfoAdmin style={{width: '28%'}}>
              <InfoAdminTit>Ocupação das Vagas</InfoAdminTit>
              {!mediaOcupação && mediaOcupação != 0 && <Skeleton variant="rectangular" width={`20%`} height={35} style={{display: 'inline-block', borderRadius: '10px', marginTop: '5%'}} animation="wave"/>}
              {mediaOcupação >= 0 && <InfoAdminDado>{mediaOcupação}%</InfoAdminDado>}
              <IconInfoOcupação/>
            </InfoAdmin>
          </InfoAdminContainer>
          <IconAdd onClick={clickCadas}/>
          <Menu anchorEl={fechadoCadas} open={openCadas} onClose={clickCloseCadas} MenuListProps={{
          'aria-labelledby': 'basic-button',
          }} style={{height: '62%', width: '32%'}}>
            <MenuItem disableRipple style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}} onClick={() => 
              setFechadoCadas(false)
            }>
              <IconAddCircleOutline color="#0872FC"/>
              Despesa
            </MenuItem>
          </Menu>
          <TableAlunos
            alunos={alunos && alunos}
            onDeleteAlunos={id => {
              api.delete(`/alunos/${id}`).then()
              mutateAlunos('/alunos')
              mutateQuantAlunos('/alunos?quant=true')
              mutateQuantTurmas('/turmas?quant=true')
            }}
            onDeleteAlunosTodos={() => {
              alunos.map(aluno => api.delete(`/alunos/${aluno._id}`).then())
              mutateAlunos('/alunos')
              mutateQuantAlunos('/alunos?quant=true')
              mutateQuantTurmas('/turmas?quant=true')
            }}
          />
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