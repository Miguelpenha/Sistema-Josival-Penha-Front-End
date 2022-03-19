import { get } from '../../../hooks'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'
import Loading from '../../../components/Loading'
import { Main, ContainerIconBack, IconBack, Container, Select, InputFind, Table, IconAtrasadoOrEmDia } from '../../../styles/pages/administrativo/pagamentos/alunos'
import Link from 'next/link'
import { MenuItem } from '@material-ui/core'
import ModalMensalidade from '../../../components/pages/administrativo/pagamentos/ModalMensalidade'

export default function PagamentosAlunos() {
    const router = useRouter()
    const { aluno: alunoId } = router.query
    const { data: alunos } = get('/alunos')
    console.log(alunos)
    const { data: aluno, mutate: mutateAluno } = get(`/alunos/${alunoId}`)
    console.log(aluno)
    const [mes, setMes] = useState(null)
    const [openModalMensalidade, setOpenModalMensalidade] = useState(false)
    const find = router.query.queryAluno || ''
    const handleCloseModalMensalidade = () => setOpenModalMensalidade(false)
    const handleOpenModalMensalidade = mês => {
        mutateAluno(`/alunos/${alunoId}`)
        setMes(mês)
        setOpenModalMensalidade(true)
    }
    const meses = [
        {
            mês: 'Janeiro',
            num: '01'
        },
        {
            mês: 'Fevereiro',
            num: '02'
        },
        {
            mês: 'Março',
            num: '03'
        },
        {
            mês: 'Abril',
            num: '04'
        },
        {
            mês: 'Maio',
            num: '05'
        },
        {
            mês: 'Junho',
            num: '06'
        },
        {
            mês: 'Julho',
            num: '07'
        },
        {
            mês: 'Agosto',
            num: '08'
        },
        {
            mês: 'Setembro',
            num: '09'
        },
        {
            mês: 'Outubro',
            num: '10'
        },
        {
            mês: 'Novembro',
            num: '11'
        },
        {
            mês: 'Dezembro',
            num: '12'
        }
    ]

    function veriPago(pagamento) {
        if (pagamento.pago) {
            return (
                <>
                    <IconAtrasadoOrEmDia color="#60BF92"/>Pago
                </>
            )
        } else {
            const mêsVencimento = Number(pagamento.vencimento.split('/')[1])
            const mêsAtual = Number(new Date().toLocaleDateString('pt-br').split('/')[1])

            if (mêsVencimento >= mêsAtual) {
                if (mêsVencimento === mêsAtual) {
                    const diaVencimento = Number(pagamento.vencimento.split('/')[0])
                    const diaAtual = Number(new Date().toLocaleDateString('pt-br').split('/')[0])
                    
                    if (diaVencimento >= diaAtual) {                 
                        return (
                            <>
                                <IconAtrasadoOrEmDia color="#cccccc"/>Em Espera
                            </>
                        )
                    } else {
                        return (
                            <>
                                <IconAtrasadoOrEmDia color="#EF5252"/>Atrasado
                            </>
                        )
                    }
                } else {
                    return (
                        <>
                            <IconAtrasadoOrEmDia color="#cccccc"/>Em Espera
                        </>
                    )
                }
            } else {
                return (
                    <>
                        <IconAtrasadoOrEmDia color="#EF5252"/>Atrasado
                    </>
                )
            }
        }
    }

    return (
        <>
            <Head>
                <title>Alunos Pagamentos</title>
            </Head>
            {alunos && aluno && aluno.pagamentos && (
                <Main>
                    <Link href="/administrativo/pagamentos" passHref>
                        <ContainerIconBack>
                            <IconBack xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                            </IconBack>
                        </ContainerIconBack>
                    </Link>
                    <Container>
                        <InputFind
                            type="text"
                            name="pesquisar"
                            placeholder="Pesquisar aluno..."
                            onChange={ev =>
                                ev.target.value.length >=1 ? router.push(
                                    `/administrativo/pagamentos/alunos?aluno=${alunoId}&queryAluno=${ev.target.value}`,
                                    null,
                                    { shallow: true }
                                ) : router.push(
                                    `/administrativo/pagamentos/alunos?aluno=${alunoId}`,
                                    null,
                                    { shallow: true }
                                )
                            }
                            defaultValue={find}
                        />
                        <Select
                            value={alunoId}
                            onChange={event => (
                                find.length >=1 ? router.push(
                                    `/administrativo/pagamentos/alunos?aluno=${event.target.value}&queryAluno=${find}`,
                                    null,
                                    { shallow: true }
                                ) : router.push(
                                    `/administrativo/pagamentos/alunos?aluno=${event.target.value}`,
                                    null,
                                    { shallow: true }
                                )
                            )}
                        >
                            {alunos.map((aluno, index) => {
                                if (aluno.nome.toUpperCase().includes(find.toUpperCase())) {
                                    return (
                                        <MenuItem value={aluno._id} key={index}>{aluno.nome}</MenuItem>
                                    )
                                }
                            })}
                        </Select>
                        <Table cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr>
                                    <th align="left">Mês</th>
                                    <th align="left">Status</th>
                                    <th align="left">Valor</th>
                                    <th align="left">Vencimento</th>
                                    <th align="left">Forma de pagamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meses.map((mês, index) => (
                                    <tr key={index} onClick={() => handleOpenModalMensalidade(mês.num)}>
                                        <td>{mês.mês}</td>
                                        <td>
                                            {veriPago(aluno.pagamentos[mês.num])}
                                        </td>
                                        <td>{aluno.pagamentos[mês.num].value}</td>
                                        <td>{aluno.pagamentos[mês.num].vencimento}</td>
                                        <td>{aluno.pagamentos[mês.num].forma}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <ModalMensalidade
                            open={openModalMensalidade}
                            onClose={handleCloseModalMensalidade}
                            aluno={aluno}
                            mesMensalidade={mes}
                            onEdit={() => mutateAluno(`/alunos/${alunoId}`)}
                        />
                    </Container>
                </Main>
            )}
        </>
    )
}