import Head from 'next/head'
import nookies from 'nookies'
import {
  FormContainer, 
  FormAccess, 
  InputFormFinanceiro, 
  ButtonFormFinanceiro, 
  Container, 
  Main, 
  Infos,
  Info,
  InfoTit,
  InfoDado,
  IconAccountBalance,
  IconTrendingUpInfo,
  IconTrendingDownInfo,
  DialogCadasDespesa,
  DialogContentCadasDespesa,
  InputNomeDespesa,
  InputNomeReceita,
  InputDespesa,
  InputReceita,
  RealInputDespesa,
  FormDespesa,
  InputDespesaObservação,
  InputReceitaObservação,
  DescriptionIcon,
  InputDespesaData,
  InvestimentoDespesa,
  InvestimentoReceita,
  FixaDespesa,
  FixaReceita,
  ButtonSubmitDespesa,
  ButtonSubmitReceita,
  ChartReceitasDespesas,
  Charts,
  ResumeFinanceiro,
  ContainerTitleNotReceitaOrDespesa,
  TitleNotReceitaOrDespesa
} from '../../../styles/pages/administrativo/financeiro'
import { NavOptions, LogoJPNome, Funções, Função, LinkFunção, IconAlunos, IconAcadêmico, IconDashBoard, IconMarketing, IconFinanceiroSele, IconPagamentos, IconColaboradores, IconError, TextFunção } from '../../../components/NavTool'
import Link from 'next/link'
import { MenuItem, InputAdornment, Snackbar, Alert, Skeleton, SpeedDialAction, SpeedDialIcon, SpeedDial, IconButton, Select } from '@material-ui/core'
import { TrendingDown as TrendingDownIcon, TrendingUp as TrendingUpIcon, Lock as LockIcon, KeyboardBackspace as ArrowBackIcon } from '@material-ui/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { get } from '../../../hooks'
import api from '../../../services/api/base'
import TableReceitasDespesas from '../../../components/TableReceitasDespesas'
import { memo } from 'react'

export default function Financeiro() {
  const { data: totalReceitas, mutate: mutateTotalReceitas } = get('/financeiro/receitas/total')
  const { data: totalDespesas, mutate: mutateTotalDespesas } = get('/financeiro/despesas/total')
  const { data: despesas, mutate: mutateDespesas } = get('/financeiro/despesas')
  const { data: receitas, mutate: mutateReceitas } = get('/financeiro/receitas')
  const { data: saldo, mutate: mutateSaldo } = get('/financeiro/saldo')
  const [fechadoCadas, setFechadoCadas] = useState(null)
  const [veri, setVeri] = useState(false)
  const [alert, setAlert] = useState({
    open: false
  })
  let atualDateBruta = new Date()
  const [atualDate] = useState(`${atualDateBruta.toLocaleDateString().split('/')[2]}-${atualDateBruta.toLocaleDateString().split('/')[1]}-${atualDateBruta.toLocaleDateString().split('/')[0]}`)
  const [openDialogCadasDespesas, setOpenDialogCadasDespesas] = useState(false)
  const [openDialogCadasReceitas, setOpenDialogCadasReceitas] = useState(false)

  const actions = [
    {
      icon: <TrendingDownIcon sx={{color: '#ED3237'}}/>,
      name: 'Despesa',
      onClick: () => {
        setOpenDialogCadasDespesas(true)
        setFechadoCadas(false)
      },
      color: '#ED3237'
    },
    {
      icon: <TrendingUpIcon sx={{color: '#5AB55E'}}/>,
      name: 'Receita',
      onClick: () => {
        setOpenDialogCadasReceitas(true)
        setFechadoCadas(false)
      },
      color: '#5AB55E'
    }
  ]

  function DialogCadasDespesas({ open }) {
    const { register, handleSubmit, reset, watch } = useForm()
    const [fixaCampo, setFixaCampo] = useState(false)
    let days = []
    for (let cont = 1;cont<=31;cont++) {
      days.push(cont < 10 ? `0${cont}` : String(cont))
    }

    async function enviarDespesa(data, event) {
      let { nome, despesa: despesaValor, date, observação, investimento, fixa, fixaDay } = data
      date = `${date.split('-')[1]}/${date.split('-')[2]}/${date.split('-')[0]}`
      const despesa = {
        nome,
        preco: despesaValor,
        data: date,
        investimento,
        fixa,
        fixaDay: String(fixaDay),
        observação,
        criação: new Date().toISOString()
      }
      await api.post('/financeiro/despesas', despesa)
      setAlert({
        open: true,
        text: 'Despesa salva com sucesso!',
        variant: 'filled',
        severity: 'success'
      })
      reset()
      setOpenDialogCadasDespesas(false)
      event.preventDefault()
      mutateTotalDespesas('/financeiro/despesas/total')
      mutateDespesas('/financeiro/despesas')
      mutateSaldo('/financeiro/saldo')
    }
    watch((value, { name, type }) => {
      if (name === 'fixa') {
        setFixaCampo(value.fixa)
      }
    })
    if (open) {
      return (
        <DialogCadasDespesa open={true} onClose={() => {
          setOpenDialogCadasDespesas(false)
          reset()
        }}>
          <DialogContentCadasDespesa>
            <FormDespesa onSubmit={handleSubmit(enviarDespesa)}>
              <InputNomeDespesa required {...register('nome')} placeholder="Nome" type="text" name="nome" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <DescriptionIcon/>
                    </InputAdornment>
                  </>
                )
              }}/>
              <InputDespesa defaultValue="1,00" {...register('despesa')} required type="text" name="despesa" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <RealInputDespesa>R$</RealInputDespesa>
                    </InputAdornment>
                  </>
                )
              }}/>
              <FixaDespesa name="fixa" inputRef={register('fixa').ref} onChange={register('fixa').onChange}/>Fixa
              {fixaCampo && <>
                <br/>
                <span style={{fontSize: '1.2vw',marginLeft: '2%'}}>Dia do pagamento fixo</span>
                <Select name="fixaDay" {...register('fixaDay')} defaultValue={String(new Date().toLocaleDateString().split('/')[0])} sx={{'&&': {
                  marginLeft: '1%',
                  fontSize: '1vw'
                }}}>
                  {days.map((day, index) => (
                    <MenuItem key={index} value={day}>{day}</MenuItem>
                  ))}
                </Select>
              </>}
              {!fixaCampo && (
                <InputDespesaData defaultValue={atualDate} type="date" {...register('date')} required name="date"/>
              )}
              <InputDespesaObservação multiline {...register('observação')} placeholder="Observação" type="text" name="observação" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <DescriptionIcon/>
                    </InputAdornment>
                  </>
                )
              }}/>
              <br/>
              <InvestimentoDespesa {...register('investimento')}/>Investimento
              <ButtonSubmitDespesa type="submit" variant="contained">Salvar</ButtonSubmitDespesa>
            </FormDespesa>
          </DialogContentCadasDespesa>
        </DialogCadasDespesa>
      )
    }
    return null
  }

  function DialogCadasReceitas({ open }) {
    const { register, handleSubmit, reset, watch } = useForm()
    const [fixaCampo, setFixaCampo] = useState(false)
    let days = []
    for (let cont = 1;cont<=31;cont++) {
      days.push(cont < 10 ? `0${cont}` : String(cont))
    }

    async function enviarReceita(data, event) {
      let { nome, receita: receitaValor, date, observação, investimento, fixa, fixaDay } = data
      date = `${date.split('-')[1]}/${date.split('-')[2]}/${date.split('-')[0]}`
      const receita = {
        nome,
        preco: receitaValor,
        data: date,
        investimento,
        fixa,
        fixaDay: String(fixaDay),
        observação,
        criação: new Date().toISOString()
      }
      await api.post('/financeiro/receitas', receita)
      setAlert({
        open: true,
        text: 'Receita salva com sucesso!',
        variant: 'filled',
        severity: 'success'
      })
      reset()
      setOpenDialogCadasReceitas(false)
      event.preventDefault()
      mutateTotalReceitas('/financeiro/receitas/total')
      mutateReceitas('/financeiro/receitas')
      mutateSaldo('/financeiro/saldo')
    }
    watch((value, { name, type }) => {
      if (name === 'fixa') {
        setFixaCampo(value.fixa)
      }
    })
    if (open) {
      return (
        <DialogCadasDespesa open={true} onClose={() => {
          setOpenDialogCadasReceitas(false)
          reset()
        }}>
          <DialogContentCadasDespesa>
            <FormDespesa onSubmit={handleSubmit(enviarReceita)}>
              <InputNomeReceita required {...register('nome')} placeholder="Nome" type="text" name="nome" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <DescriptionIcon/>
                    </InputAdornment>
                  </>
                )
              }}/>
              <InputReceita defaultValue="1,00" {...register('receita')} required type="text" name="receita" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <RealInputDespesa>R$</RealInputDespesa>
                    </InputAdornment>
                  </>
                )
              }}/>
              <FixaReceita name="fixa" inputRef={register('fixa').ref} onChange={register('fixa').onChange}/>Fixa
              {fixaCampo && <>
                <br/>
                <span style={{fontSize: '1.2vw',marginLeft: '2%'}}>Dia do pagamento fixo</span>
                <Select name="fixaDay" {...register('fixaDay')} defaultValue={String(new Date().toLocaleDateString().split('/')[0])} sx={{'&&': {
                  marginLeft: '1%',
                  fontSize: '1vw'
                }}}>
                  {days.map((day, index) => (
                    <MenuItem key={index} value={day}>{day}</MenuItem>
                  ))}
                </Select>
              </>}
              {!fixaCampo && (
                <InputDespesaData defaultValue={atualDate} type="date" {...register('date')} required name="date"/>
              )}
              <InputReceitaObservação multiline {...register('observação')} placeholder="Observação" type="text" name="observação" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <DescriptionIcon/>
                    </InputAdornment>
                  </>
                )
              }}/>
              <br/>
              <InvestimentoReceita {...register('investimento')}/>Investimento
              <ButtonSubmitReceita type="submit" variant="contained">Salvar</ButtonSubmitReceita>
            </FormDespesa>
          </DialogContentCadasDespesa>
        </DialogCadasDespesa>
      )
    }
    return null
  }

  function ChartReceitasDespesasComCarregamento() {
    if (receitas && despesas && totalReceitas && totalDespesas) {
      if (receitas.length >= 1 || despesas.length >= 1) {
        return <ChartReceitasDespesas style={{marginTop: '4.5%'}} width="500px" height="300px" chartType="PieChart" data={[
          ['Linguagens', 'Quantidade'],
          ['Receitas', totalDespesas && totalReceitas && totalReceitas.totalBruto],
          ['Despesas', totalReceitas && totalDespesas && totalDespesas.totalBruto]
        ]} options={{
          colors: ['#5AB55E', '#ED3237'],
          pieHole: 0.4,
          title: totalReceitas && totalDespesas && totalReceitas.totalBruto==totalDespesas.totalBruto ? 'Iguais' : totalReceitas.totalBruto>totalDespesas.totalBruto ? 'Receitas' : 'Despesas',
          titleTextStyle: {
            color: totalReceitas && totalDespesas && totalReceitas.totalBruto==totalDespesas.totalBruto ? '#009CDE' : totalReceitas.totalBruto>totalDespesas.totalBruto ? '#5AB55E' : '#ED3237',
            fontSize: 20
          },
          pieStartAngle: 180
        }}/>
      } else {
        return null
      }
    } else {
      return <Skeleton variant="rectangular" width={500} height={300} style={{marginTop: '3%', borderRadius: '20px'}} animation="wave"/>
    }
  }

  function Verification({ children }) {
    const [error, setError] = useState(false)
    
    if (veri) {
      return children
    } else {
      return (
        <FormContainer>
          <Link href="/administrativo/alunos">
            <IconButton component="a" sx={{justifySelf: 'flex-start', width: 'fit-content', margin: '1%'}}>
              <ArrowBackIcon sx={{color: '#0872FC', fontSize: '3vw'}}/>
            </IconButton>
          </Link>
          <FormAccess onSubmit={async ev => {
            ev.preventDefault()
            const authorized = (await api.post('financeiro/verify', {
              password: ev.target[0].value
            })).data.authorized
            
            if (authorized) {
              setError(false)
              setVeri(true)
            } else {
              setError(true)
            }
          }}>
            <InputFormFinanceiro
              autoFocus
              required
              id="senha"
              name="senha"
              type="password"
              error={error}
              variant="standard"
              placeholder="Senha de acesso financeiro"
              InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{color: error ? '#F06360' : '#0872FC'}} fontSize="large"/>
                      </InputAdornment>
                    )
                  }}
            />
            {error && <Alert variant="standard" severity="error" sx={{fontSize: '1vw', width: 'fit-content', borderRadius: '10px', alignSelf: 'flex-start', marginLeft: '15%'}}>Senha incorreta</Alert>}
            <ButtonFormFinanceiro type="submit" variant="contained">Entrar</ButtonFormFinanceiro>
          </FormAccess>
        </FormContainer>
      )
    }
  }

  const VerificationMemo = memo(Verification)
  
  return (
    <VerificationMemo>
      <Head>
        <title>Administrativo (Financeiro)</title>
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
            <Função>
              <Link href="/administrativo/pagamentos" passHref>
                <LinkFunção>
                  <IconPagamentos/>
                  <TextFunção>Pagamentos</TextFunção>
                </LinkFunção>
              </Link>
            </Função>
            <Função selected={true}>
              <IconFinanceiroSele/>
              <TextFunção>Financeiro</TextFunção>
            </Função>
            <Função>
              <Link href="/administrativo/colaboradores" passHref>
                <LinkFunção>
                  <IconColaboradores/>
                  <TextFunção>Colaboradores</TextFunção>
                </LinkFunção>
              </Link>
            </Função>
            <Função menor>
              <Link href="/administrativo/reportar" passHref>
                <LinkFunção>
                  <IconError/>
                  <TextFunção>Reportar erro</TextFunção>
                </LinkFunção>
              </Link>
            </Função>
          </Funções>
        </NavOptions>
        <Main>
          <div style={{position: 'relative'}}>
              <SpeedDial
                direction="down"
                ariaLabel="SpeedDial basic example"
                sx={{position: 'absolute'}}
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
                        backgroundColor: '#ffffff',
                        color: `${action.color}`,
                        fontSize: '1.2vw',
                        padding: '15%',
                        borderRadius: '15px',
                        width: 'max-content'
                      },
                      '& .MuiSpeedDialAction-fab, & .MuiSpeedDialAction-fab:hover': {
                        backgroundColor: '#ffffff',
                        color: '#EFEFEF'
                      }
                    }}
                    onClick={action.onClick}
                  />
                ))}
              </SpeedDial>
            </div>
            <Infos>
              <Info>
                <InfoTit>Saldo atual</InfoTit>
                <br/>
                {saldo ? <InfoDado color="#0872FC">{saldo.saldo}</InfoDado> : <Skeleton variant="rectangular" width={`60%`} height={35} style={{display: 'inline-block', borderRadius: '10px', marginTop: '5%'}} animation="wave"/>}
                <IconAccountBalance color="#009CDE" bg="#A7E7FF"/>
              </Info>
              <Info>
                <InfoTit>Receitas</InfoTit>
                <br/>
                {totalReceitas ? <InfoDado color="#60BF92">+{totalReceitas.total}</InfoDado> : <Skeleton variant="rectangular" width={`60%`} height={35} style={{display: 'inline-block', borderRadius: '10px', marginTop: '5%'}} animation="wave"/>}
                <IconTrendingUpInfo color="#ffffff" bg="#60BF92"/>
              </Info>
              <Info>
                <InfoTit>Despesas</InfoTit>
                <br/>
                {totalDespesas ? <InfoDado color="#EF5252">-{totalDespesas.total}</InfoDado> : <Skeleton variant="rectangular" width={`60%`} height={35} style={{display: 'inline-block', borderRadius: '10px', marginTop: '5%'}} animation="wave"/>}
                <IconTrendingDownInfo color="#ffffff" bg="#EF5252"/>
              </Info>
            </Infos>
            {receitas && despesas && <>
              {!receitas.length >= 1 && !despesas.length >= 1 && (
                <ContainerTitleNotReceitaOrDespesa>
                  <TitleNotReceitaOrDespesa>
                    Não há receitas ou despesas cadastradas, cadastre uma receita ou despesa para ver resumos e gráficos
                  </TitleNotReceitaOrDespesa>
                </ContainerTitleNotReceitaOrDespesa>
              )}
            </>}
            <ResumeFinanceiro receitas={receitas} despesas={despesas} onDeleteReceita={id => {
              api.delete(`/financeiro/receitas/${id}`).then(() => {
                mutateTotalReceitas('/financeiro/receitas/total')
                mutateReceitas('/financeiro/receitas')
                mutateSaldo('/financeiro/saldo')
              })
            }} onDeleteDespesa={id => {
              api.delete(`/financeiro/despesas/${id}`).then(() => {
                mutateTotalDespesas('/financeiro/despesas/total')
                mutateDespesas('/financeiro/despesas')
                mutateSaldo('/financeiro/saldo')
              })
            }}/>
            <Charts>
              <ChartReceitasDespesasComCarregamento/>
            </Charts>
            {receitas && despesas ? <TableReceitasDespesas receitas={receitas && receitas} despesas={despesas && despesas} onDeleteDespesas={id => {
              api.delete(`/financeiro/despesas/${id}`).then(() => {
                mutateTotalDespesas('/financeiro/despesas/total')
                mutateDespesas('/financeiro/despesas')
                mutateSaldo('/financeiro/saldo')
              })
            }} onDeleteReceitas={id => {
              api.delete(`/financeiro/receitas/${id}`).then(() => {
                mutateTotalReceitas('/financeiro/receitas/total')
                mutateReceitas('/financeiro/receitas')
                mutateSaldo('/financeiro/saldo')
              })
            }} onDeleteTodos={() => {
              despesas.map(despesa => {
                api.delete(`/financeiro/despesas/${despesa._id}`).then(() => {
                  mutateTotalDespesas('/financeiro/despesas/total')
                  mutateDespesas('/financeiro/despesas')
                  mutateSaldo('/financeiro/saldo')
                })
              })
              receitas.map(receita => {
                api.delete(`/financeiro/receitas/${receita._id}`).then(() => {
                  mutateTotalReceitas('/financeiro/receitas/total')
                  mutateReceitas('/financeiro/receitas')
                  mutateSaldo('/financeiro/saldo')
                })
              })
            }} onEditReceita={() => {}} onEditDespesa={() => {}} saldo={saldo && saldo.saldo}/> : <Skeleton variant="rectangular" width={`85.5%`} height={`50%`} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', borderRadius: '20px', marginTop: '5%'}} animation="wave"/>}
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
            <DialogCadasDespesas open={openDialogCadasDespesas}/>
            <DialogCadasReceitas open={openDialogCadasReceitas}/>
        </Main>
      </Container>
    </VerificationMemo>
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