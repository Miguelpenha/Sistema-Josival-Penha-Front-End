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
    const { data: alunos, mutate: mutateAlunos } = get('/alunos')
    const { aluno: alunoId } = router.query
    const { data: aluno, mutate: mutateAluno } = get(`/alunos/${alunoId}`)
    const [mes, setMes] = useState(null)
    const [openModalMensalidade, setOpenModalMensalidade] = useState(false)
    const [find, setFind] = useState('')
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
    
    return <>
        <Head>
            <title>Alunos Pagamentos</title>
        </Head>
        <Loading loading={[alunos, aluno]}>
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
                    {alunos && alunos.length >=1 && alunoId && aluno && <>
                        <InputFind
                            type="text"
                            name="pesquisar"
                            placeholder="Pesquisar..."
                            onChange={ev => setFind(ev.target.value)}
                        />
                        <Select
                            value={alunoId}
                            onChange={event => (
                                router.push(
                                    `/administrativo/pagamentos/alunos?aluno=${event.target.value}`,
                                    null,
                                    { shallow: true }
                                )
                            )}
                        >
                            {alunos && alunos.length >=1 && alunoId && aluno && alunos.map((aluno, index) => {
                                if (aluno.nome.toUpperCase().includes(find.toUpperCase())) {
                                    return (
                                        <MenuItem value={aluno._id} key={index}>{aluno.nome}</MenuItem>
                                    )
                                }
                            })}
                        </Select>
                    </>}
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
                            {aluno && aluno.pagamentos && meses.map((mês, index) => (
                                <tr key={index} onClick={() => handleOpenModalMensalidade(mês.num)}>
                                    <td>{mês.mês}</td>
                                    <td>
                                        {aluno.pagamentos[mês.num].pago ? 'Em dia' : new Date().getMonth()+1 == mês.num ? Number(new Date(new Date().getFullYear(), mês.num-1, Number(new Date().toLocaleDateString('pt-br').split('/')[0])).toLocaleDateString('pt-br').split('/')[0]) <= Number(aluno.pagamentos[mês.num].vencimento.split('/')[0]) ? 'Em dia' : 'Atrazado' : Number(new Date(new Date().getFullYear(), mês.num-1, 1).toLocaleDateString('pt-br').split('/')[0]) <= Number(aluno.pagamentos[mês.num].vencimento.split('/')[0]) ? 'Em dia' : 'Atrazado'}
                                    </td>
                                    <td>{aluno.pagamentos[mês.num].value}</td>
                                    <td>{aluno.pagamentos[mês.num].vencimento}</td>
                                    <td>{aluno.pagamentos[mês.num].forma}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {aluno && aluno.pagamentos && mes && (
                        <ModalMensalidade
                            open={openModalMensalidade}
                            onClose={handleCloseModalMensalidade}
                            aluno={aluno}
                            mesMensalidade={mes}
                            onEdit={() => mutateAluno(`/alunos/${alunoId}`)}
                        />
                    )}
                </Container>
            </Main>
        </Loading>
    </>
}