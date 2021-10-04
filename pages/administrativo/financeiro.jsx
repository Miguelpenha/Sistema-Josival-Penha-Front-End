import Head from 'next/head'
import nookies from 'nookies'
import { Container, Main, IconAdd, IconTrendingDown, DialogCadasDespesa, DialogContentCadasDespesa, InputNomeDespesa, InputDespesa, RealInputDespesa, FormDespesa, InputDespesaObservação, DescriptionIcon, InputDespesaData, CampoCheckBoxsDespesas, CheckboxCategoriaDespesa, NomeCategoriaDepesaComCor, NomeCategoriaDepesaSóCor, InvestimentoDespesa, FixaDespesa, ButtonSubmitDespesa } from '../../styles/pages/administrativo/financeiro'
import { NavOptions, LogoJPNome, Funções, Função, LinkFunção, IconAlunos, IconAcadêmico, IconDashBoard, IconMarketing, IconFinanceiroSele, IconColaboradores, TextFunção } from '../../components/NavTool'
import Link from 'next/link'
import { Menu, MenuItem, InputAdornment } from '@material-ui/core'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { get } from '../../hooks'
import api from '../../services/api/base'

export default function Financeiro() {
  const [fechadoCadas, setFechadoCadas] = useState(null)
  const { data: categoriasDespesas } = get('/financeiro/despesas/categorias')
  const { data: fontesDespesas } = get('/financeiro/despesas/fontes')
  let atualDateBruta = new Date()
  const [atualDate, setAtualDate] = useState(`${atualDateBruta.toLocaleDateString().split('/')[2]}-${atualDateBruta.toLocaleDateString().split('/')[1]}-${atualDateBruta.toLocaleDateString().split('/')[0]}`)
  const openCadas = Boolean(fechadoCadas)
  const [openDialogCadasDespesas, setOpenDialogCadasDespesas] = useState(false)
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
    limparCampos()
    setOpenDialogCadasDespesas(false)
    event.preventDefault()
  }

  function clickCadas(event) {
    setFechadoCadas(event.currentTarget)
  }

  function clickCloseCadas() {
    setFechadoCadas(null)
  }

  function veriCategoriaDespesa(event, data) {
    if (data) {
      categorias.push(event.target.name)
    } else {
      categorias.splice(categorias.indexOf(event.target.name), 1)
    }
  }

  function veriFonteDespesa(event, data) {
    if (data) {
      fontes.push(event.target.name)
    } else {
      fontes.splice(fontes.indexOf(event.target.name), 1)
    }
  }

  function limparCampos() {
    reset()
    categorias = []
    fontes = []
  }

  function DialogCadasDespesas({ open }) {
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
              <InputDespesa defaultValue="0,00" {...register('despesa')} required type="text" name="despesa" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <RealInputDespesa>R$</RealInputDespesa>
                    </InputAdornment>
                  </>
                )
              }}/>
              <InputDespesaData defaultValue={atualDate} type="date" {...register('date')} required name="date"/>
              <InputDespesaObservação {...register('observação')} placeholder="Observação" type="text" name="observação" fullWidth variant="standard" InputProps={{
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
                <h3>Categorias</h3>
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
                <h3>Fontes</h3>
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
              <Link href="alunos">
                <LinkFunção>
                  <IconAlunos/>
                  <TextFunção>Alunos</TextFunção>
                </LinkFunção>
              </Link>
            </Função>
            <Função>
              <Link href="academico">
                <LinkFunção>
                  <IconAcadêmico/>
                  <TextFunção>Acadêmico</TextFunção>
                </LinkFunção>
              </Link>
            </Função>
            <Função>
              <Link href="dashboard">
                <LinkFunção>
                  <IconDashBoard/>
                  <TextFunção>Dashboard</TextFunção>
                </LinkFunção>
              </Link>
            </Função>
            <Função>
              <Link href="marketing">
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
              <Link href="colaboradores">
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
          <Menu anchorEl={fechadoCadas} open={openCadas} onClose={clickCloseCadas} MenuListProps={{
          'aria-labelledby': 'basic-button',
        }} style={{height: '20%', width: '28%'}}>
            <MenuItem disableRipple style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}} onClick={() => {
              setOpenDialogCadasDespesas(true)
              setFechadoCadas(false)
            }}>
              <IconTrendingDown/>
              Despesas
            </MenuItem>
          </Menu>
          <DialogCadasDespesas open={openDialogCadasDespesas}/>
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