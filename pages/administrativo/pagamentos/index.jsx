import { get } from '../../../hooks'
import { useState } from 'react'
import Head from 'next/head'
import { Container, Main, ContainerFilters, ContainerInputFind, IconInputFind, InputFind, Table, IconAtrasadoOrEmDia } from '../../../styles/pages/administrativo/pagamentos'
import NavOptions from '../../../components/pages/administrativo/pagamentos/NavOptions'
import { Select, MenuItem, Switch } from '@material-ui/core'
import Link from 'next/link'
import nookies from 'nookies'

export default function Pagamentos() {
  const { data: turmas } = get('/turmas')
  const { data: alunos } = get('/alunos')
  const [mesFilter, setMesFilter] = useState(new Date().toLocaleDateString('pt-br').split('/')[1])
  const [textFilter, setTextFilter] = useState('')
  const [turmaFilter, setTurmaFilter] = useState('Nenhuma turma')
  const [atrazadosFilter, setAtrazadosFilter] = useState(false)

  return (
      <>
          <Head>
              <title>Pagamentos</title>
          </Head>
          <Container>
            <NavOptions/>
            <Main>
              <h1>Pagamentos</h1>
              <ContainerFilters>
                <ContainerInputFind>
                  <IconInputFind xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </IconInputFind>
                  <InputFind
                    type="text"
                    value={textFilter}
                    placeholder="Pesquisar"
                    onChange={event => setTextFilter(event.target.value)}
                  />
                </ContainerInputFind>
                <Select value={mesFilter} onChange={event => setMesFilter(event.target.value)}>
                  <MenuItem value="01">Janeiro</MenuItem>
                  <MenuItem value="02">Fevereiro</MenuItem>
                  <MenuItem value="03">Março</MenuItem>
                  <MenuItem value="04">Abril</MenuItem>
                  <MenuItem value="05">Maio</MenuItem>
                  <MenuItem value="06">Junho</MenuItem>
                  <MenuItem value="07">Julho</MenuItem>
                  <MenuItem value="08">Agosto</MenuItem>
                  <MenuItem value="09">Setembro</MenuItem>
                  <MenuItem value="10">Outubro</MenuItem>
                  <MenuItem value="11">Novembro</MenuItem>
                  <MenuItem value="12">Dezembro</MenuItem>
                </Select>
                <Select value={turmaFilter} onChange={event => setTurmaFilter(event.target.value)}>
                  <MenuItem value="Nenhuma turma">Nenhuma turma</MenuItem>
                  {alunos && turmas && turmas.map((turma, index) => <>
                    {turma.alunos >= 1 && (
                      <MenuItem value={turma._id} key={index}>
                        {turma.nome} ({turma.alunos} alunos)
                      </MenuItem>
                    )}
                  </>)}
                </Select>
              </ContainerFilters>
              <Switch checked={atrazadosFilter} onChange={event => setAtrazadosFilter(event.target.checked)}/>Atrazados
              {turmas && turmas.map((turma, index) => {
                if (turmaFilter === 'Nenhuma turma' || turma._id === turmaFilter) {
                  let renderVeri = false

                  alunos && alunos.map(aluno => {
                    if (aluno.turma === turma.nome && aluno.nome.toUpperCase().includes(textFilter.toUpperCase())) {
                      const veriAtrazado = aluno.pagamentos[mesFilter].pago ? false : new Date().getMonth()+1 == mesFilter ? Number(new Date(new Date().getFullYear(), mesFilter-1, Number(new Date().toLocaleDateString('pt-br').split('/')[0])).toLocaleDateString('pt-br').split('/')[0]) <= Number(aluno.pagamentos[mesFilter].vencimento.split('/')[0]) ? false : true : Number(new Date(new Date().getFullYear(), mesFilter-1, 1).toLocaleDateString('pt-br').split('/')[0]) <= Number(aluno.pagamentos[mesFilter].vencimento.split('/')[0]) ? false : true

                      if (atrazadosFilter ? veriAtrazado : true) {
                        renderVeri = true
                      }
                    }
                  })

                  if (renderVeri) {
                    return (
                      <Table key={index} cellSpacing="0" cellpadding="0">
                        <thead>
                          <tr>
                            <th colSpan={4}>
                              <h2>{turma.nome}</h2>
                            </th>
                          </tr>
                          <tr>
                            <th align="left">Aluno</th>
                            <th align="left">Status</th>
                            <th align="left">Valor</th>
                            <th align="left">Forma de pagamento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {alunos && alunos.map((aluno, index) => {
                            if(aluno.turma === turma.nome && aluno.nome.toUpperCase().includes(textFilter.toUpperCase())) {
                              const veriAtrazado = aluno.pagamentos[mesFilter].pago ? false : new Date().getMonth()+1 == mesFilter ? Number(new Date(new Date().getFullYear(), mesFilter-1, Number(new Date().toLocaleDateString('pt-br').split('/')[0])).toLocaleDateString('pt-br').split('/')[0]) <= Number(aluno.pagamentos[mesFilter].vencimento.split('/')[0]) ? false : true : Number(new Date(new Date().getFullYear(), mesFilter-1, 1).toLocaleDateString('pt-br').split('/')[0]) <= Number(aluno.pagamentos[mesFilter].vencimento.split('/')[0]) ? false : true
                              if (atrazadosFilter ? veriAtrazado : true) {
                                return (
                                    <tr className="aluno" key={index}>
                                        <td>
                                            <Link href={`/administrativo/pagamentos/alunos/${aluno.id}`} passHref>
                                                <a>{aluno.nome}</a>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link href={`/administrativo/pagamentos/alunos/${aluno.id}`} passHref>
                                                <a>
                                                 {aluno.pagamentos[mesFilter].pago ? <IconAtrasadoOrEmDia color="#60BF92"/> : new Date().getMonth()+1 == mesFilter ? Number(new Date(new Date().getFullYear(), mesFilter-1, Number(new Date().toLocaleDateString('pt-br').split('/')[0])).toLocaleDateString('pt-br').split('/')[0]) <= Number(aluno.pagamentos[mesFilter].vencimento.split('/')[0]) ? <IconAtrasadoOrEmDia color="#60BF92"/> : <IconAtrasadoOrEmDia color="#EF5252"/> : Number(new Date(new Date().getFullYear(), mesFilter-1, 1).toLocaleDateString('pt-br').split('/')[0]) <= Number(aluno.pagamentos[mesFilter].vencimento.split('/')[0]) ? <IconAtrasadoOrEmDia color="#60BF92"/> : <IconAtrasadoOrEmDia color="#EF5252"/>}
                                                  {aluno.pagamentos[mesFilter].pago ? 'Em dia' : new Date().getMonth()+1 == mesFilter ? Number(new Date(new Date().getFullYear(), mesFilter-1, Number(new Date().toLocaleDateString('pt-br').split('/')[0])).toLocaleDateString('pt-br').split('/')[0]) <= Number(aluno.pagamentos[mesFilter].vencimento.split('/')[0]) ? 'Em dia' : 'Atrazado' : Number(new Date(new Date().getFullYear(), mesFilter-1, 1).toLocaleDateString('pt-br').split('/')[0]) <= Number(aluno.pagamentos[mesFilter].vencimento.split('/')[0]) ? 'Em dia' : 'Atrazado'}
                                                </a>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link href={`/administrativo/pagamentos/alunos/${aluno.id}`} passHref>
                                                <a>{aluno.pagamentos[mesFilter].value}</a>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link href={`/administrativo/pagamentos/alunos/${aluno.id}`} passHref>
                                                <a>{aluno.pagamentos[mesFilter].forma}</a>
                                            </Link>
                                        </td>
                                  </tr>
                                )
                              }
                            }
                          })}
                        </tbody>
                      </Table>
                    )
                  } else {
                    return null
                  }
                }
              })}
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