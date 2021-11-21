import Head from 'next/head'
import nookies from 'nookies'
import { Container, Main, AlunosBanner, InfoAdminContainer, InfoAdmin, InfoAdminTit, InfoAdminDado, IconInfoTotalAlunos, IconInfoTotalTurmas, IconInfoMédiaAlunos, IconInfoOcupação, NavInfos, DialogCadasAluno, InputNomeCadasAluno, ButtonSubmitCadasAluno, CampoInputCadasAluno, InputSelectCadasAluno, InputDespesaData, LabelInputStyle, LabelInputStyleReq, ErrorInput } from '../../styles/pages/administrativo/alunos'
import { NavOptions, LogoJPNome, Funções, Função, LinkFunção, IconAlunosSele, IconFinanceiro, IconAcadêmico, IconDashBoard, IconMarketing, IconColaboradores, TextFunção } from '../../components/NavTool'
import { get } from '../../hooks'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import TableAlunos from '../../components/TableAlunos'
import TableTurmas from '../../components/TableTurmas'
import { SpeedDial, SpeedDialAction, SpeedDialIcon, Skeleton, Snackbar, Alert, DialogContent, MenuItem } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import api from '../../services/api/base'
import InputMask from 'react-input-mask'
import { useForm } from 'react-hook-form'

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
  let atualDateBruta = new Date()
  const [atualDate] = useState(`${atualDateBruta.toLocaleDateString().split('/')[2]}-${atualDateBruta.toLocaleDateString().split('/')[1]}-${atualDateBruta.toLocaleDateString().split('/')[0]}`)

  function LabelInput({ children, required }) {
    if (required) {
      return (
        <>
          <LabelInputStyle>
            {children}
            <LabelInputStyleReq>*</LabelInputStyleReq>
          </LabelInputStyle>
        </>
      )
    } else {
      return <LabelInputStyle>{children}</LabelInputStyle>
    }
  }

  function ModelAlunosCadastrar({ open }) {
    if (open) {
      const [nomeError, setNomeError] = useState(false)
      const { register, handleSubmit, reset, watch, setValue } = useForm()

      watch(async (value, { name, type }) => {
        if (name === 'nome') {
          let nomes = []
          alunos.map(aluno => nomes.push(aluno.nome))
          if (nomes.includes(value.nome)) {
            setNomeError(true)
          } else {
            setNomeError(false)
          }
        }
      })
      
      async function enviarAluno(data, event) {
        if (!nomeError) {
          let { nome, turma, sexo, cpf, res1, res2, telefone, email, cep, num, complemento, bairro, rua, matricula, nascimento, situacao, observacao, foto } = data
          
          let date = `${nascimento.split('-')[1]}/${nascimento.split('-')[2]}/${nascimento.split('-')[0]}`
          const aluno = {
            nome, turma, sexo, cpf, res1, res2, telefone, email, cep, num, complemento, bairro, rua, matricula, date, situacao, observacao, foto, criação: new Date().toISOString()
          }

          await api.post('/alunos', aluno)
          setAlert({
            open: true,
            text: 'Aluno cadastrado com sucesso!',
            variant: 'filled',
            severity: 'success'
          })
          reset()
          setOpenModelAlunosCadastrar(false)
          event.preventDefault()
          mutateAlunos('/alunos')
          mutateQuantAlunos('/alunos?quant=true')
          mutateTurmas('turmas')
          mutateQuantTurmas('turmas?quant=true')
        }
      }

      return (
        <DialogCadasAluno open={true} onClose={() => setOpenModelAlunosCadastrar(false)}>
          <DialogContent>
            <form style={{paddingBottom: '17%'}} onSubmit={handleSubmit(enviarAluno)}>
                <CampoInputCadasAluno>
                  <LabelInput required>Nome</LabelInput>
                  <InputNomeCadasAluno name="nome" required {...register('nome')} placeholder="Nome do aluno" type="text" variant="standard"/>
                  {nomeError && <ErrorInput>Já existe um aluno cadastrado com esse nome</ErrorInput>}
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput required>Sexo</LabelInput>
                  <InputSelectCadasAluno id="sexo" {...register('sexo')}>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                  </InputSelectCadasAluno>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput required>Turma</LabelInput>
                  <InputSelectCadasAluno id="turma" {...register('turma')}>
                    {turmas.map(turma => <MenuItem value={turma.nome}>{turma.nome}</MenuItem>)}
                  </InputSelectCadasAluno>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput required>Primeiro responsável(a)</LabelInput>
                  <InputNomeCadasAluno name="res1" required {...register('res1')} placeholder="Nome do primeiro responsável" type="text" variant="standard"/>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>Segundo responsável(a)</LabelInput>
                  <InputNomeCadasAluno name="res2" {...register('res2')} placeholder="Nome do segundo responsável" type="text" variant="standard"/>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput required>Telefone</LabelInput>
                  <InputMask mask="(99) 99999-9999" {...register('telefone')}>
                    {() => <InputNomeCadasAluno name="telefone" required placeholder="Telefone do aluno" type="tel" variant="standard"/>}
                  </InputMask>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput required>Situação</LabelInput>
                  <InputSelectCadasAluno name="situacao" {...register('situacao')} defaultValue="Ativo">
                    <MenuItem value="Ativo">Ativo</MenuItem>
                    <MenuItem value="Cancelado">Cancelado</MenuItem>
                  </InputSelectCadasAluno>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>Data de nascimento</LabelInput>
                  <InputDespesaData defaultValue={atualDate} type="date" name="nascimento" {...register('nascimento')}/>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>CPF</LabelInput>
                  <InputMask mask="999.999.999-99" {...register('cpf')}>
                    {() => <InputNomeCadasAluno name="cpf" placeholder="CPF do aluno" type="text" variant="standard"/>}
                  </InputMask>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>E-mail</LabelInput>
                  <InputNomeCadasAluno name="email" {...register('email')} placeholder="E-mail do aluno" type="email" variant="standard"/>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>CEP</LabelInput>
                  <InputMask mask="99.999-999" {...register('cep')}>
                    {() => <InputNomeCadasAluno name="cep" placeholder="CEP do aluno" type="tel" variant="standard"/>}
                  </InputMask>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>Número</LabelInput>
                  <InputNomeCadasAluno name="num" {...register('num')} placeholder="Número da casa" type="number" variant="standard"/>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>Complemento</LabelInput>
                  <InputNomeCadasAluno name="complemento" {...register('complemento')} placeholder="Complemento da casa" type="text" variant="standard"/>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>Bairro</LabelInput>
                  <InputNomeCadasAluno name="bairro" {...register('bairro')} placeholder="Bairro do aluno" type="text" variant="standard"/>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>Cidade</LabelInput>
                  <InputNomeCadasAluno name="cidade" {...register('cidade')} placeholder="Cidade do aluno" type="text" variant="standard"/>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>Rua</LabelInput>
                  <InputNomeCadasAluno name="rua" {...register('rua')} placeholder="Rua do aluno" type="text" variant="standard"/>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>Matrícula</LabelInput>
                  <InputNomeCadasAluno name="matricula" {...register('matricula')} placeholder="Matrícula do aluno" type="text" variant="standard"/>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>Observação</LabelInput>
                  <InputNomeCadasAluno name="observacao" {...register('observacao')} placeholder="Digite a observação" type="text" multiline variant="standard" rows={2}/>
                </CampoInputCadasAluno>
                <CampoInputCadasAluno>
                  <LabelInput>Foto</LabelInput>
                  <input name="foto" {...register('foto')} type="file" accept="image/*,application/x-shockwave-flash,application/octet-stream" style={{border: '1px solid #0872FC', borderRadius: '5px', padding: '1%'}}/>
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