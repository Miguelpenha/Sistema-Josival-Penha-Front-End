import Head from 'next/head'
import nookies from 'nookies'
import { Container, Main, AlunosBanner, InfoAdminContainer, InfoAdmin, InfoAdminTit, InfoAdminDado, IconInfoTotalAlunos, IconInfoTotalTurmas, IconInfoMédiaAlunos, IconInfoOcupação, NavInfos, DialogCadasAluno, InputNomeCadasAluno, ButtonSubmitCadasAluno, CampoInputCadasAluno, InputSelectCadasAluno } from '../../styles/pages/administrativo/alunos'
import { NavOptions, LogoJPNome, Funções, Função, LinkFunção, IconAlunosSele, IconFinanceiro, IconAcadêmico, IconDashBoard, IconMarketing, IconColaboradores, TextFunção } from '../../components/NavTool'
import { get } from '../../hooks'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import TableAlunos from '../../components/TableAlunos'
import TableTurmas from '../../components/TableTurmas'
import { SpeedDial, SpeedDialAction, SpeedDialIcon, Skeleton, Snackbar, Alert, DialogContent, MenuItem } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import api from '../../services/api/base'

export default function Alunos() {
  const { data: quantAlunos, mutate: mutateQuantAlunos } = get('/alunos?quant=true')
  const { data: quantTurmas, mutate: mutateQuantTurmas } = get('/turmas?quant=true')
  const { data: alunos, mutate: mutateAlunos } = get('/alunos')
  const { data: turmas, mutate: mutateTurmas } = get('/turmas')
  const [mediaAlunos, setMediaAlunos] = useState(undefined)
  const [mediaOcupação, setMediaOcupação] = useState(undefined)
  const [openModelAlunosCadastrar, setOpenModelAlunosCadastrar] = useState(false)
  const [alert, setAlert] = useState({
    open: false
  })

  function ModelAlunosCadastrar({ open }) {
    if (open) {
        return (
          <DialogCadasAluno open={true} onClose={() => setOpenModelAlunosCadastrar(false)}>
              <DialogContent>
                  <form >
                      <CampoInputCadasAluno>
                        <span style={{fontSize: '1vw', width: 'fit-content', color: '#8a8a8a'}}>Nome</span>
                        <InputNomeCadasAluno name="nome" required placeholder="Nome do aluno" type="text" variant="standard"/>
                      </CampoInputCadasAluno>
                      <CampoInputCadasAluno>
                        <span style={{fontSize: '1vw', width: 'fit-content', color: '#8a8a8a'}}>Turma</span>
                        <InputSelectCadasAluno id="turma">
                          {turmas.map(turma => <MenuItem value={turma._id}>{turma.nome}</MenuItem>)}
                          <MenuItem value="asd">asd</MenuItem>
                        </InputSelectCadasAluno>
                      </CampoInputCadasAluno>
                      <CampoInputCadasAluno>
                        <span style={{fontSize: '1vw', width: 'fit-content', color: '#8a8a8a'}}>Sexo</span>
                        <InputSelectCadasAluno id="sexo">
                          <MenuItem value="Masculino">Masculino</MenuItem>
                          <MenuItem value="Feminino">Feminino</MenuItem>
                        </InputSelectCadasAluno>
                      </CampoInputCadasAluno>
                      <ButtonSubmitCadasAluno style={{marginBottom: '0%'}} type="submit" variant="contained">Cadastrar</ButtonSubmitCadasAluno>
                  </form>
              </DialogContent>
          </DialogCadasAluno>
        )
    }

    return null
  }

  useEffect(() => {
    if (quantTurmas && quantAlunos) {
      setMediaAlunos(parseFloat(Number(quantAlunos.quant)/Number(quantTurmas.quant)).toFixed(2))
      setMediaOcupação(parseFloat((Number(quantAlunos.quant)*Number(quantTurmas.quant))/100).toFixed(2))
    }
  }, [quantAlunos, quantTurmas])

  const actions = [
    {
      icon: <AddIcon/>,
      name: 'Cadastrar aluno',
      onClick: () => {
        setOpenModelAlunosCadastrar(true)
      }
    }
  ]
  
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
          <AlunosBanner>
            Alunos
          </AlunosBanner>
          <InfoAdminContainer style={{paddingBottom: '9%'}}>
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
          <div style={{position: 'relative'}}>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{position: 'absolute', bottom: 2.8, left: 12}}
              icon={<SpeedDialIcon sx={{'& .MuiSpeedDialIcon-icon': {
                width: '50%',
                height: 'auto'
              }}}/>}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipOpen
                  tooltipTitle={action.name}
                  tooltipPlacement="right"
                  sx={{
                    '& .MuiSpeedDialAction-staticTooltipLabel': {
                      backgroundColor: '#0872FC',
                      color: '#ffffff'
                    },
                    '& .MuiSpeedDialAction-fab, & .MuiSpeedDialAction-fab:hover': {
                      backgroundColor: '#0872FC',
                      color: '#ffffff'
                    }
                  }}
                  onClick={action.onClick}
                />
              ))}
            </SpeedDial>
          </div>
          {alunos ? <TableAlunos
            setAlert={setAlert}
            alunos={alunos && alunos}
            onDeleteAlunos={id => {
              api.delete(`/alunos/${id}`).then(() => {
                mutateAlunos('/alunos')
                mutateAlunos('/alunos')
                mutateQuantAlunos('/alunos?quant=true')
                mutateTurmas('/turmas')
                mutateQuantTurmas('/turmas?quant=true')
              })
            }}
            onDeleteAlunosTodos={() => {
              alunos.map(aluno => api.delete(`/alunos/${aluno._id}`).then())
              mutateAlunos('/alunos')
              mutateQuantAlunos('/alunos?quant=true')
            }}
          /> : <Skeleton variant="rectangular" width={`85.5%`} height={`50%`} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', borderRadius: '20px', marginTop: '5%'}} animation="wave"/>}
          {turmas ? <TableTurmas            
            turmas={turmas && turmas}
            alunos={alunos && alunos}
            setAlert={setAlert}
            onDeleteAlunos={id => {
              api.delete(`/alunos/${id}`).then(() => {
                  mutateAlunos('/alunos')
                  mutateAlunos('/alunos')
                  mutateQuantAlunos('/alunos?quant=true')
                  mutateTurmas('/turmas')
                  mutateQuantTurmas('/turmas?quant=true')
              })
            }}
            onDeleteAlunosTodos={() => {
              alunos.map(aluno => api.delete(`/alunos/${aluno._id}`).then())
              mutateAlunos('/alunos')
              mutateQuantAlunos('/alunos?quant=true')
          }}
            onDeleteTurmas={id => {
              api.delete(`/turmas/${id}`).then(() => {
                mutateTurmas('/turmas')
                mutateQuantTurmas('/turmas?quant=true')
                mutateAlunos('/alunos')
                mutateQuantAlunos('/alunos?quant=true')
              })
            }}
            onDeleteTurmasTodos={() => {
              turmas.map(turma => api.delete(`/turmas/${turma._id}`).then())
              mutateTurmas('/turmas')
              mutateQuantTurmas('/turmas?quant=true')
              mutateAlunos('/alunos')
              mutateQuantAlunos('/alunos?quant=true')
            }}
          /> : <Skeleton variant="rectangular" width={`85.5%`} height={`50%`} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', borderRadius: '20px', marginTop: '5%'}} animation="wave"/>}
        </Main>
        <NavInfos>
          asd2
        </NavInfos>
        <Snackbar anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom'
          }} open={alert.open} onClose={() => setAlert({
            open: false
          })} autoHideDuration={3000}>
            <Alert variant={alert.variant} severity={alert.severity} onClose={() => 
              setAlert({
                open: false
              })
            }>
              <h1>{alert.text}</h1>
            </Alert>
          </Snackbar>
          <ModelAlunosCadastrar open={openModelAlunosCadastrar}/>
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