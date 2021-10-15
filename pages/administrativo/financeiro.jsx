import Head from 'next/head'
import nookies from 'nookies'
import { Container, Main, IconAdd, IconTrendingDown, IconTrendingUp, IconLabel, IconSyncAlt, Infos, Info, InfoTit, InfoDado, IconAccountBalance, IconTrendingUpInfo, IconTrendingDownInfo, DialogCadasDespesa, DialogContentCadasDespesa, InputNomeDespesa, InputNomeReceita, InputDespesa, InputReceita, RealInputDespesa, FormDespesa, InputDespesaObservação, InputReceitaObservação, DescriptionIcon, InputDespesaData, CampoCheckBoxsDespesas, CheckboxCategoriaDespesa, TitCampoCheckBoxDespesa, NomeCategoriaDepesaComCor, NomeCategoriaDepesaSóCor, InvestimentoDespesa, InvestimentoReceita, FixaDespesa, FixaReceita, ButtonSubmitDespesa, ButtonSubmitReceita, IconPayment, ChartReceitasDespesas, TableDespesas } from '../../styles/pages/administrativo/financeiro'
import { NavOptions, LogoJPNome, Funções, Função, LinkFunção, IconAlunos, IconAcadêmico, IconDashBoard, IconMarketing, IconFinanceiroSele, IconColaboradores, TextFunção } from '../../components/NavTool'
import Link from 'next/link'
import { Menu, MenuItem, InputAdornment, Snackbar, Alert, TextField, Divider, Skeleton } from '@material-ui/core'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { get } from '../../hooks'
import api from '../../services/api/base'
import { DataGrid as Table } from '@mui/x-data-grid'

export default function Financeiro() {
  const { data: totalReceitas, mutate: mutateTotalReceitas } = get('/financeiro/receitas/total')
  const { data: totalDespesas, mutate: mutateTotalDespesas } = get('/financeiro/despesas/total')
  const { data: saldo, mutate: mutateSaldo } = get('/financeiro/saldo')
  const [fechadoCadas, setFechadoCadas] = useState(null)
  const [alert, setAlert] = useState({
    open: false
  })
  let atualDateBruta = new Date()
  const [atualDate] = useState(`${atualDateBruta.toLocaleDateString().split('/')[2]}-${atualDateBruta.toLocaleDateString().split('/')[1]}-${atualDateBruta.toLocaleDateString().split('/')[0]}`)
  const openCadas = Boolean(fechadoCadas)
  const [openDialogCadasDespesas, setOpenDialogCadasDespesas] = useState(false)
  const [openDialogCadasReceitas, setOpenDialogCadasReceitas] = useState(false)
  const [openDialogCadasCategoriasDespesas, setOpenDialogCadasCategoriasDespesas] = useState(false)
  const [openDialogCadasCategoriasReceitas, setOpenDialogCadasCategoriasReceitas] = useState(false)
  const [openDialogCadasFontesDespesas, setOpenDialogCadasFontesDespesas] = useState(false)
  const [openDialogCadasFontesReceitas, setOpenDialogCadasFontesReceitas] = useState(false)
  
  function clickCadas(event) {
    setFechadoCadas(event.currentTarget)
  }

  function clickCloseCadas() {
    setFechadoCadas(null)
  }

  function DialogCadasDespesas({ open }) {
    const { data: categoriasDespesas } = get('/financeiro/despesas/categorias')
    const { data: fontesDespesas } = get('/financeiro/despesas/fontes')
    const { register, handleSubmit, reset } = useForm()
    let categorias = []
    let fontes = []
    async function enviarDespesa(data, event) {
      let { nome, despesa: despesaValor, date, observação, investimento, fixa } = data
      date = `${date.split('-')[1]}/${date.split('-')[2]}/${date.split('-')[0]}`
      const despesa = {
        nome,
        preco: despesaValor,
        categorias,
        fontes,
        data: date,
        investimento,
        fixa,
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
      limparCampos()
      setOpenDialogCadasDespesas(false)
      event.preventDefault()
      mutateTotalDespesas('/financeiro/despesas/total')
      mutateSaldo('/financeiro/saldo')
    }
    function limparCampos() {
      reset()
      categorias = []
      fontes = []
    }
    function veriFonteDespesa(event, data) {
      if (data) {
        fontes.push(event.target.name)
      } else {
        fontes.splice(fontes.indexOf(event.target.name), 1)
      }
    }
    function veriCategoriaDespesa(event, data) {
      if (data) {
        categorias.push(event.target.name)
      } else {
        categorias.splice(categorias.indexOf(event.target.name), 1)
      }
    }
    if (open) {
      return (
        <DialogCadasDespesa open={true} onClose={() => {
          setOpenDialogCadasDespesas(false)
          limparCampos()
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
              <InputDespesaData defaultValue={atualDate} type="date" {...register('date')} required name="date"/>
              <InputDespesaObservação multiline {...register('observação')} placeholder="Observação" type="text" name="observação" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <DescriptionIcon/>
                    </InputAdornment>
                  </>
                )
              }}/>
              <FixaDespesa name="fixa" inputRef={register('fixa').ref} onChange={register('fixa').onChange}/>Fixa
              <br/>
              <InvestimentoDespesa {...register('investimento')}/>Investimento
              <CampoCheckBoxsDespesas>
                <TitCampoCheckBoxDespesa>Categorias</TitCampoCheckBoxDespesa>
                {categoriasDespesas.length == 0 && <Alert style={{marginTop: '3%', marginLeft: '10%', marginRight: '10%', marginBottom: '5%'}} variant="standard" severity="info">
                  <h2>Não existem categorias cadastradas</h2>
                </Alert>}
                {categoriasDespesas.map(categoria =>
                  <div key={categoria._id}>
                    <CheckboxCategoriaDespesa name={categoria.nome} onChange={veriCategoriaDespesa} sx={{
                      color: categoria.cor,
                      '&.Mui-checked': {
                        color: categoria.cor
                      }
                    }}/>
                    <NomeCategoriaDepesaComCor>
                      <NomeCategoriaDepesaSóCor color={categoria.cor}/>
                      {categoria.nome}
                    </NomeCategoriaDepesaComCor>
                  </div>
                )}
              </CampoCheckBoxsDespesas>
              <CampoCheckBoxsDespesas>
                <TitCampoCheckBoxDespesa>Fontes</TitCampoCheckBoxDespesa>
                {fontesDespesas.length == 0 && <Alert style={{marginTop: '3%', marginLeft: '10%', marginRight: '10%', marginBottom: '5%'}} variant="standard" severity="info">
                  <h2>Não existem fontes cadastradas</h2>
                </Alert>}
                {fontesDespesas.map(fonte => 
                  <div key={fonte._id}>
                    <CheckboxCategoriaDespesa name={fonte.nome} onChange={veriFonteDespesa} sx={{
                      color: fonte.cor,
                      '&.Mui-checked': {
                        color: fonte.cor
                      }
                    }}/>
                    <NomeCategoriaDepesaComCor>
                      <NomeCategoriaDepesaSóCor color={fonte.cor}/>
                      {fonte.nome}
                    </NomeCategoriaDepesaComCor>
                  </div>
                )}
              </CampoCheckBoxsDespesas>
              <ButtonSubmitDespesa type="submit" variant="contained">Salvar</ButtonSubmitDespesa>
            </FormDespesa>
          </DialogContentCadasDespesa>
        </DialogCadasDespesa>
      )
    }
    return null
  }

  function DialogCadasCategoriasDespesas({ open }) {
    const { register, handleSubmit, reset } = useForm()
    async function enviarDespesa(data, event) {
      let { nome, cor } = data
      const despesa = {
        nome,
        cor,
        criação: new Date().toISOString()
      }
      await api.post('/financeiro/despesas/categorias', despesa)
      setAlert({
        open: true,
        text: 'Categoria de despesa salva com sucesso!',
        variant: 'filled',
        severity: 'success'
      })
      limparCampos()
      setOpenDialogCadasCategoriasDespesas(false)
      event.preventDefault()
    }
    function limparCampos() {
      reset()
    }
    if (open) {
      return (
        <DialogCadasDespesa open={true} onClose={() => {
          setOpenDialogCadasCategoriasDespesas(false)
          limparCampos()
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
              <TextField style={{marginTop: '5%', width: '65%'}} required type="color" {...register('cor')} placeholder="Cor" name="cor"/>
              <ButtonSubmitDespesa style={{marginBottom: '0%'}} type="submit" variant="contained">Salvar</ButtonSubmitDespesa>
            </FormDespesa>
          </DialogContentCadasDespesa>
        </DialogCadasDespesa>
      )
    }
    return null
  }

  function DialogCadasFontesDespesas({ open }) {
    const { register, handleSubmit, reset } = useForm()
    async function enviarDespesa(data, event) {
      let { nome, cor } = data
      const despesa = {
        nome,
        cor,
        criação: new Date().toISOString()
      }
      await api.post('/financeiro/despesas/fontes', despesa)
      setAlert({
        open: true,
        text: 'Fonte de despesa salva com sucesso!',
        variant: 'filled',
        severity: 'success'
      })
      limparCampos()
      setOpenDialogCadasFontesDespesas(false)
      event.preventDefault()
    }
    function limparCampos() {
      reset()
    }
    if (open) {
      return (
        <DialogCadasDespesa open={true} onClose={() => {
          setOpenDialogCadasFontesDespesas(false)
          limparCampos()
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
              <TextField style={{marginTop: '5%', width: '65%'}} required type="color" {...register('cor')} placeholder="Cor" name="cor"/>
              <ButtonSubmitDespesa style={{marginBottom: '0%'}} type="submit" variant="contained">Salvar</ButtonSubmitDespesa>
            </FormDespesa>
          </DialogContentCadasDespesa>
        </DialogCadasDespesa>
      )
    }
    return null
  }

  function DialogCadasReceitas({ open }) {
    const { data: categoriasReceitas} = get('/financeiro/receitas/categorias')
    const { data: fontesReceitas } = get('/financeiro/receitas/fontes')
    const { register, handleSubmit, reset } = useForm()
    let categorias = []
    let fontes = []
    async function enviarReceita(data, event) {
      let { nome, receita: receitaValor, date, observação, investimento, fixa } = data
      date = `${date.split('-')[1]}/${date.split('-')[2]}/${date.split('-')[0]}`
      const receita = {
        nome,
        preco: receitaValor,
        categorias,
        fontes,
        data: date,
        investimento,
        fixa,
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
      limparCampos()
      setOpenDialogCadasReceitas(false)
      event.preventDefault()
      mutateTotalReceitas('/financeiro/receitas/total')
      mutateSaldo('/financeiro/saldo')
    }
    function limparCampos() {
      reset()
      categorias = []
      fontes = []
    }
    function veriFonteReceita(event, data) {
      if (data) {
        fontes.push(event.target.name)
      } else {
        fontes.splice(fontes.indexOf(event.target.name), 1)
      }
    }
    function veriCategoriaReceita(event, data) {
      if (data) {
        categorias.push(event.target.name)
      } else {
        categorias.splice(categorias.indexOf(event.target.name), 1)
      }
    }
    if (open) {
      return (
        <DialogCadasDespesa open={true} onClose={() => {
          setOpenDialogCadasReceitas(false)
          limparCampos()
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
              <InputDespesaData defaultValue={atualDate} type="date" {...register('date')} required name="date"/>
              <InputReceitaObservação multiline {...register('observação')} placeholder="Observação" type="text" name="observação" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <DescriptionIcon/>
                    </InputAdornment>
                  </>
                )
              }}/>
              <FixaReceita name="fixa" inputRef={register('fixa').ref} onChange={register('fixa').onChange}/>Fixa
              <br/>
              <InvestimentoReceita {...register('investimento')}/>Investimento
              <CampoCheckBoxsDespesas>
                <TitCampoCheckBoxDespesa>Categorias</TitCampoCheckBoxDespesa>
                {categoriasReceitas.length == 0 && <Alert style={{marginTop: '3%', marginLeft: '10%', marginRight: '10%', marginBottom: '5%'}} variant="standard" severity="info">
                  <h2>Não existem categorias cadastradas</h2>
                </Alert>}
                {categoriasReceitas.map(categoria =>
                  <div key={categoria._id}>
                    <CheckboxCategoriaDespesa name={categoria.nome} onChange={veriCategoriaReceita} sx={{
                      color: categoria.cor,
                      '&.Mui-checked': {
                        color: categoria.cor
                      }
                    }}/>
                    <NomeCategoriaDepesaComCor>
                      <NomeCategoriaDepesaSóCor color={categoria.cor}/>
                      {categoria.nome}
                    </NomeCategoriaDepesaComCor>
                  </div>
                )}
              </CampoCheckBoxsDespesas>
              <CampoCheckBoxsDespesas>
                <TitCampoCheckBoxDespesa>Fontes</TitCampoCheckBoxDespesa>
                {fontesReceitas.length == 0 && <Alert style={{marginTop: '3%', marginLeft: '10%', marginRight: '10%', marginBottom: '5%'}} variant="standard" severity="info">
                  <h2>Não existem fontes cadastradas</h2>
                </Alert>}
                {fontesReceitas.map(fonte => 
                  <div key={fonte._id}>
                    <CheckboxCategoriaDespesa name={fonte.nome} onChange={veriFonteReceita} sx={{
                      color: fonte.cor,
                      '&.Mui-checked': {
                        color: fonte.cor
                      }
                    }}/>
                    <NomeCategoriaDepesaComCor>
                      <NomeCategoriaDepesaSóCor color={fonte.cor}/>
                      {fonte.nome}
                    </NomeCategoriaDepesaComCor>
                  </div>
                )}
              </CampoCheckBoxsDespesas>
              <ButtonSubmitReceita type="submit" variant="contained">Salvar</ButtonSubmitReceita>
            </FormDespesa>
          </DialogContentCadasDespesa>
        </DialogCadasDespesa>
      )
    }
    return null
  }

  function DialogCadasCategoriasReceitas({ open }) {
    const { register, handleSubmit, reset } = useForm()
    async function enviarCategoriaReceita(data, event) {
      let { nome, cor } = data
      const categoria = {
        nome,
        cor,
        criação: new Date().toISOString()
      }
      await api.post('/financeiro/receitas/categorias', categoria)
      setAlert({
        open: true,
        text: 'Categoria de receita salva com sucesso!',
        variant: 'filled',
        severity: 'success'
      })
      limparCampos()
      setOpenDialogCadasCategoriasReceitas(false)
      event.preventDefault()
    }
    function limparCampos() {
      reset()
    }
    if (open) {
      return (
        <DialogCadasDespesa open={true} onClose={() => {
          setOpenDialogCadasCategoriasReceitas(false)
          limparCampos()
        }}>
          <DialogContentCadasDespesa>
            <FormDespesa onSubmit={handleSubmit(enviarCategoriaReceita)}>
              <InputNomeReceita required {...register('nome')} placeholder="Nome" type="text" name="nome" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <DescriptionIcon/>
                    </InputAdornment>
                  </>
                )
              }}/>
              <TextField style={{marginTop: '5%', width: '65%'}} required type="color" {...register('cor')} placeholder="Cor" name="cor"/>
              <ButtonSubmitReceita style={{marginBottom: '0%'}} type="submit" variant="contained">Salvar</ButtonSubmitReceita>
            </FormDespesa>
          </DialogContentCadasDespesa>
        </DialogCadasDespesa>
      )
    }
    return null
  }

  function DialogCadasFontesReceitas({ open }) {
    const { register, handleSubmit, reset } = useForm()
    async function enviarFonteReceita(data, event) {
      let { nome, cor } = data
      const fonte = {
        nome,
        cor,
        criação: new Date().toISOString()
      }
      await api.post('/financeiro/receitas/fontes', fonte)
      setAlert({
        open: true,
        text: 'Fonte de receita salva com sucesso!',
        variant: 'filled',
        severity: 'success'
      })
      limparCampos()
      setOpenDialogCadasFontesReceitas(false)
      event.preventDefault()
    }
    function limparCampos() {
      reset()
    }
    if (open) {
      return (
        <DialogCadasDespesa open={true} onClose={() => {
          setOpenDialogCadasFontesReceitas(false)
          limparCampos()
        }}>
          <DialogContentCadasDespesa>
            <FormDespesa onSubmit={handleSubmit(enviarFonteReceita)}>
              <InputNomeReceita required {...register('nome')} placeholder="Nome" type="text" name="nome" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <DescriptionIcon/>
                    </InputAdornment>
                  </>
                )
              }}/>
              <TextField style={{marginTop: '5%', width: '65%'}} required type="color" {...register('cor')} placeholder="Cor" name="cor"/>
              <ButtonSubmitReceita style={{marginBottom: '0%'}} type="submit" variant="contained">Salvar</ButtonSubmitReceita>
            </FormDespesa>
          </DialogContentCadasDespesa>
        </DialogCadasDespesa>
      )
    }
    return null
  }

  function ChartReceitasDespesasComCarregamento() {
    if (totalReceitas && totalDespesas) {
      return <ChartReceitasDespesas width="500px" height="300px" chartType="PieChart" data={[
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
        }
      }}/>
    } else {
      return <Skeleton variant="rectangular" width={500} height={300} style={{marginTop: '3%', borderRadius: '20px'}} animation="wave"/>
    }
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  return (
    <>
      <Head>
        <title>Administrativo (Financeiro)</title>
      </Head>
      <Container>
        <NavOptions>
          <LogoJPNome/>
          <Funções>
            <Função>
              <Link href="alunos" passHref>
                <LinkFunção>
                  <IconAlunos/>
                  <TextFunção>Alunos</TextFunção>
                </LinkFunção>
              </Link>
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
            <Função selected={true}>
              <IconFinanceiroSele/>
              <TextFunção>Financeiro</TextFunção>
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
          <IconAdd onClick={clickCadas}/>
          <Infos>
            <Info>
              <InfoTit>Saldo atual: </InfoTit>
              <br/>
              {saldo ? <InfoDado color="#0872FC">{saldo.saldo}</InfoDado> : <Skeleton variant="rectangular" width={`60%`} height={35} style={{display: 'inline-block', borderRadius: '10px', marginTop: '5%'}} animation="wave"/>}
              <IconAccountBalance color="#009CDE" bg="#A7E7FF"/>
            </Info>
            <Info>
              <InfoTit>Receitas: </InfoTit>
              <br/>
              {totalReceitas ? <InfoDado color="#60BF92">{totalReceitas.total}</InfoDado> : <Skeleton variant="rectangular" width={`60%`} height={35} style={{display: 'inline-block', borderRadius: '10px', marginTop: '5%'}} animation="wave"/>}
              <IconTrendingUpInfo color="#ffffff" bg="#60BF92"/>
            </Info>
            <Info>
              <InfoTit>Despesas: </InfoTit>
              <br/>
              {totalDespesas ? <InfoDado color="#EF5252">{totalDespesas.total}</InfoDado> : <Skeleton variant="rectangular" width={`60%`} height={35} style={{display: 'inline-block', borderRadius: '10px', marginTop: '5%'}} animation="wave"/>}
              <IconTrendingDownInfo color="#ffffff" bg="#EF5252"/>
            </Info>
          </Infos>
          <ChartReceitasDespesasComCarregamento/>
          <TableDespesas
            
          />
          <Menu anchorEl={fechadoCadas} open={openCadas} onClose={clickCloseCadas} MenuListProps={{
          'aria-labelledby': 'basic-button',
        }} style={{height: '62%', width: '32%'}}>
            <MenuItem disableRipple style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}} onClick={() => {
              setOpenDialogCadasDespesas(true)
              setFechadoCadas(false)
            }}>
              <IconTrendingDown color="#ED3237"/>
              Despesa
            </MenuItem>
            <MenuItem disableRipple style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}} onClick={() => {
              setOpenDialogCadasCategoriasDespesas(true)
              setFechadoCadas(false)
            }}>
              <IconLabel color="#ED3237"/>
              Categoria
            </MenuItem>
            <MenuItem disableRipple style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}} onClick={() => {
              setOpenDialogCadasFontesDespesas(true)
              setFechadoCadas(false)
            }}>
              <IconPayment color="#ED3237"/>
              Fonte
            </MenuItem>
            <Divider/>
            <MenuItem disableRipple style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}} onClick={() => {
              setOpenDialogCadasReceitas(true)
              setFechadoCadas(false)
            }}>
              <IconTrendingUp color="#5AB55E"/>
              Receita
            </MenuItem>
            <MenuItem disableRipple style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}} onClick={() => {
              setOpenDialogCadasCategoriasReceitas(true)
              setFechadoCadas(false)
            }}>
              <IconLabel color="#5AB55E"/>
              Categoria
            </MenuItem>
            <MenuItem disableRipple style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}} onClick={() => {
              setOpenDialogCadasFontesReceitas(true)
              setFechadoCadas(false)
            }}>
              <IconPayment color="#5AB55E"/>
              Fonte
            </MenuItem>
            <Divider/>
            <MenuItem disableRipple style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}} onClick={() => {
              setFechadoCadas(false)
            }}>
              <IconSyncAlt color="#0872FC"/>
              Transferência
            </MenuItem>
          </Menu>
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
          <DialogCadasCategoriasDespesas open={openDialogCadasCategoriasDespesas}/>
          <DialogCadasFontesDespesas open={openDialogCadasFontesDespesas}/>
          <DialogCadasReceitas open={openDialogCadasReceitas}/>
          <DialogCadasCategoriasReceitas open={openDialogCadasCategoriasReceitas}/>
          <DialogCadasFontesReceitas open={openDialogCadasFontesReceitas}/>
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