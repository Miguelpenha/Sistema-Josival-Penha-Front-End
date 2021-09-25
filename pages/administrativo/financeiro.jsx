import Head from 'next/head'
import nookies from 'nookies'
import { Container, Main, IconAdd, IconTrendingDown, DialogCadasDespesa, DialogContentCadasDespesa, InputDespesa, RealInputDespesa, FormDespesa, InputDespesaDescrição, DescriptionIcon, InputDespesaData, ButtonSubmitDespesa } from '../../styles/pages/administrativo/financeiro'
import { NavOptions, LogoJPNome, Funções, Função, LinkFunção, IconAlunos, IconAcadêmico, IconDashBoard, IconMarketing, IconFinanceiroSele, IconColaboradores } from '../../components/NavTool'
import Link from 'next/link'
import { Menu, MenuItem, InputAdornment } from '@material-ui/core'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Financeiro() {
  const [fechadoCadas, setFechadoCadas] = useState(null)
  const openCadas = Boolean(fechadoCadas)
  const [openDialogCadasDespesas, setOpenDialogCadasDespesas] = useState(false)
  const { register, handleSubmit } = useForm()
  let atualDate = new Date()
  atualDate = `${atualDate.toLocaleDateString().split('/')[2]}-${atualDate.toLocaleDateString().split('/')[1]}-${atualDate.toLocaleDateString().split('/')[0]}`

  async function enviarDespesa(data, event) {
    const { despesa, date, descrição } = data
    console.log(despesa, date, descrição)
    event.preventDefault()
  }

  function clickCadas(event) {
    setFechadoCadas(event.currentTarget)
  }

  function clickCloseCadas() {
    setFechadoCadas(null)
  }

  function DialogCadasDespesas({ open }) {
    if (open) {
      return (
        <DialogCadasDespesa open={true} onClose={() => setOpenDialogCadasDespesas(false)}>
          <DialogContentCadasDespesa>
            <FormDespesa action="/administrativo" onSubmit={handleSubmit(enviarDespesa)}>
              <InputDespesa defaultValue="0.00" {...register('despesa')} required type="number" name="despesa" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <RealInputDespesa>R$</RealInputDespesa>
                    </InputAdornment>
                  </>
                )
              }}/>
              <InputDespesaData value={atualDate} type="date" {...register('date')} required name="date"/>
              <InputDespesaDescrição {...register('descrição')} type="text" name="descrição" fullWidth variant="standard" InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <DescriptionIcon/>
                    </InputAdornment>
                  </>
                )
              }}/>
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