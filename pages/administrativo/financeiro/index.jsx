import Head from 'next/head'
import nookies from 'nookies'
import { FormContainer, FormAccess, InputFormFinanceiro, ButtonFormFinanceiro, Container, Main, IconTrendingDown, IconTrendingUp, IconLabel, Infos, Info, InfoTit, InfoDado, IconAccountBalance, IconTrendingUpInfo, IconTrendingDownInfo, DialogCadasDespesa, DialogContentCadasDespesa, InputNomeDespesa, InputNomeReceita, InputDespesa, InputReceita, RealInputDespesa, FormDespesa, InputDespesaObservação, InputReceitaObservação, DescriptionIcon, InputDespesaData, CampoCheckBoxsDespesas, CheckboxCategoriaDespesa, TitCampoCheckBoxDespesa, NomeCategoriaDepesaComCor, NomeCategoriaDepesaSóCor, InvestimentoDespesa, InvestimentoReceita, FixaDespesa, FixaReceita, ButtonSubmitDespesa, ButtonSubmitReceita, IconPayment, ChartReceitasDespesas, Charts } from '../../../styles/pages/administrativo/financeiro'
import ResumeFinanceiro from '../../../components/ResumeFinanceiro'
import { NavOptions, LogoJPNome, Funções, Função, LinkFunção, IconAlunos, IconAcadêmico, IconDashBoard, IconMarketing, IconFinanceiroSele, IconColaboradores, TextFunção } from '../../../components/NavTool'
import Link from 'next/link'
import { Menu, MenuItem, InputAdornment, Snackbar, Alert, TextField, Divider, Skeleton, SpeedDialAction, SpeedDialIcon, SpeedDial, IconButton } from '@material-ui/core'
import { TrendingDown as TrendingDownIcon, Label as LabelIcon, Payment as PaymentIcon, TrendingUp as TrendingUpIcon, Lock as LockIcon, KeyboardBackspace as ArrowBackIcon } from '@material-ui/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { get } from '../../../hooks'
import api from '../../../services/api/base'
import TableReceitasDespesas from '../../../components/TableReceitasDespesas'
import TableCategoriasReceitasDespesas from '../../../components/TableCategoriasReceitasDespesas'
import { memo } from 'react'

export default function Financeiro() {
  const { data: totalReceitas, mutate: mutateTotalReceitas } = get('/financeiro/receitas/total')
  const { data: totalDespesas, mutate: mutateTotalDespesas } = get('/financeiro/despesas/total')
  const { data: despesas, mutate: mutateDespesas } = get('/financeiro/despesas')
  const { data: receitas, mutate: mutateReceitas } = get('/financeiro/receitas')
  const { data: saldo, mutate: mutateSaldo } = get('/financeiro/saldo')
  const { data: categoriasReceitasTotal, mutate: mutateCategoriasReceitasTotal } = get('/financeiro/receitas/categorias/total')
  const { data: categoriasDespesasTotal, mutate: mutateCategoriasDespesasTotal } = get('/financeiro/despesas/categorias/total')
  const [fechadoCadas, setFechadoCadas] = useState(null)
  const [veri, setVeri] = useState(false)
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

  function clickCloseCadas() {
    setFechadoCadas(null)
  }

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
      icon: <LabelIcon sx={{color: '#ED3237'}}/>,
      name: 'Categoria',
      onClick: () => {
        setOpenDialogCadasCategoriasDespesas(true)
        setFechadoCadas(false)
      },
      color: '#ED3237'
    },
    {
      icon: <PaymentIcon sx={{color: '#ED3237'}}/>,
      name: 'Fonte',
      onClick: () => {
        setOpenDialogCadasFontesDespesas(true)
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
    },
    {
      icon: <LabelIcon sx={{color: '#5AB55E'}}/>,
      name: 'Categoria',
      onClick: () => {
        setOpenDialogCadasCategoriasReceitas(true)
        setFechadoCadas(false)
      },
      color: '#5AB55E'
    },
    {
      icon: <PaymentIcon sx={{color: '#5AB55E'}}/>,
      name: 'Fonte',
      onClick: () => {
        setOpenDialogCadasFontesReceitas(true)
        setFechadoCadas(false)
      },
      color: '#5AB55E'
    }
  ]

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
      mutateDespesas('/financeiro/despesas')
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
      mutateReceitas('/financeiro/receitas')
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
      return <Skeleton variant="rectangular" width={500} height={300} style={{marginTop: '3%', borderRadius: '20px'}} animation="wave"/>
    }
  }

  function ChartCategoriasReceitasComCarregamento() {
    if (categoriasReceitasTotal) {
      try {
        let categoriasReceitasBrutas = []
        let colors = []
        categoriasReceitasTotal.map(categoria => {
          categoriasReceitasBrutas.push([categoria.nome, categoria.total])
          colors.push(categoria.cor)
        })
      
      return <ChartReceitasDespesas width="500px" height="300px" chartType="PieChart" data={[
        ['Nome', 'Total'],
        ...categoriasReceitasBrutas
      ]} options={{
        colors,
        pieHole: 0.4,
        title: 'Categorias receitas',
        titleTextStyle: {
          color: '#5AB55E',
          fontSize: 20
        },
        pieStartAngle: 180
      }}/>
      } catch {
        return null
      }
    } else {
      return <Skeleton variant="rectangular" width={500} height={300} style={{marginTop: '3%', borderRadius: '20px'}} animation="wave"/>
    }
  }

  function ChartCategoriasDespesasComCarregamento() {
    if (categoriasDespesasTotal) {
      try {
        let categoriasDespesasBrutas = []
        let colors = []
        categoriasDespesasTotal.map(categoria => {
          categoriasDespesasBrutas.push([categoria.nome, categoria.total])
          colors.push(categoria.cor)
        })
        
        return <ChartReceitasDespesas width="500px" height="300px" chartType="PieChart" data={[
          ['Nome', 'Total'],
          ...categoriasDespesasBrutas
        ]} options={{
          colors,
          pieHole: 0.4,
          title: 'Categorias despesas',
          titleTextStyle: {
            color: '#ED3237',
            fontSize: 20
          },
          pieStartAngle: 180
        }}/>
      } catch {
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
            {/* <IconAdd onClick={clickCadas}/> */}
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
              {categoriasReceitasTotal && categoriasReceitasTotal.length > 0 && <ChartCategoriasReceitasComCarregamento/>}
              {categoriasDespesasTotal && categoriasDespesasTotal.length > 0 && <ChartCategoriasDespesasComCarregamento/>}
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
            {categoriasReceitasTotal && categoriasDespesasTotal ? <TableCategoriasReceitasDespesas categoriasReceitas={categoriasReceitasTotal && categoriasReceitasTotal} categoriasDespesas={categoriasDespesasTotal && categoriasDespesasTotal} onDeleteCategoriaReceita={id => {
              api.delete(`/financeiro/despesas/categorias/${id}`).then(() => {
                mutateDespesas('/financeiro/despesas')
                mutateCategoriasDespesasTotal('/financeiro/despesas/categorias/total')
              })
            }} onDeleteCategoriaDespesa={id => {
              api.delete(`/financeiro/receitas/categorias/${id}`).then(() => {
                mutateReceitas('/financeiro/receitas')
                mutateCategoriasReceitasTotal('/financeiro/receitas/categorias/total')
              })
            }} onDeleteTodos={() => {
              categoriasReceitasTotal.map(categoriaReceita => {
                api.delete(`/financeiro/receitas/categorias/${categoriaReceita._id}`).then(() => {
                  mutateReceitas('/financeiro/receitas')
                  mutateCategoriasReceitasTotal('/financeiro/receitas/categorias/total')
                })
              })
              categoriasDespesasTotal.map(categoriaDespesa => {
                api.delete(`/financeiro/despesas/categorias/${categoriaDespesa._id}`).then(() => {
                  mutateDespesas('/financeiro/despesas')
                  mutateCategoriasDespesasTotal('/financeiro/despesas/categorias/total')
                })
              })
            }} saldo={saldo && saldo.saldo}/> : <Skeleton variant="rectangular" width={`85.5%`} height={`50%`} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', borderRadius: '20px', marginTop: '5%'}} animation="wave"/>}
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