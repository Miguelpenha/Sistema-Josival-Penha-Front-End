import { useRouter }  from 'next/router'
import { get } from '../../../../hooks'
import Head from 'next/head'
import { Container, ContainerIconBack, IconBack } from '../../../../styles/pages/administrativo/financeiro/date'
import Link from 'next/link'
import ResumeFinanceiro from '../../../../components/ResumeFinanceiro'
import api from '../../../../services/api/base'

export default function Date() {
    const { date: dateBruta } = useRouter().query
    const date = dateBruta && dateBruta.replace(/-/g, '/')
    const { data: receitasDespesas, mutate: mutateReceitasDespesas } = get(`/financeiro/date/${dateBruta}`)

    return (
        <>
            <Head>
                <title>Financeiro do dia {date}</title>
            </Head>
            <Container>
                <Link href="/administrativo/financeiro" passHref>
                    <ContainerIconBack title="Voltar para a página do financeiro">
                        <IconBack xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </IconBack>
                    </ContainerIconBack>
                </Link>
                {receitasDespesas && receitasDespesas.receitas && receitasDespesas.despesas && (
                    <ResumeFinanceiro
                        resume
                        receitas={receitasDespesas.receitas}
                        despesas={receitasDespesas.despesas}
                        saldo={receitasDespesas.totals.saldo.total}
                        saldoReceitas={receitasDespesas.totals.receitas.total}
                        saldoDespesas={receitasDespesas.totals.despesas.total}
                        onDeleteReceita={id => (
                            api.delete(`/financeiro/receitas/${id}`).then(() => {
                                mutateReceitasDespesas(`/financeiro/date/${dateBruta && dateBruta}`)
                            })
                        )}
                        onDeleteDespesa={id => (
                            api.delete(`/financeiro/despesas/${id}`).then(() => {
                                mutateReceitasDespesas(`/financeiro/date/${dateBruta && dateBruta}`)
                            })
                        )}
                    />
                )}
            </Container>
        </>
    )
}