import {
    Container,
    ContainerReceitasDespesas,
    ContainerSaldos
} from './style'
import ReceitaOrDespesa from './ReceitaOrDespesa'

export default function ResumeFinanceiro({ receitas, despesas, onDeleteReceita, onDeleteDespesa, resume, saldoReceitas, saldoDespesas, saldo }) {
    if (typeof receitas != 'string' && typeof despesas != 'string') {
        if (receitas.length || despesas.length) {
            receitas.map(receita => {
                receita.receita = true
                receita.criação.sistema = new Date(receita.criação.sistema)
            })
        
            despesas.map(despesa => {
                despesa.despesa = true
                despesa.criação.sistema = new Date(despesa.criação.sistema)
            })
        
            const receitasOrDespesas = [...receitas, ...despesas]
    
            function sortDate(a, b) {
                return b.criação.sistema - a.criação.sistema
            }
            
            receitasOrDespesas.sort(sortDate)
            
            return (
                <Container>
                    <ContainerReceitasDespesas>
                        {receitasOrDespesas.map((receitaOrDespesa, index) => (
                            <ReceitaOrDespesa
                                key={index}
                                name={receitaOrDespesa.nome}
                                value={receitaOrDespesa.preco}
                                date={receitaOrDespesa.criação.data}
                                receita={receitaOrDespesa.receita ? true : false}
                                onDeleteReceita={() => onDeleteReceita(receitaOrDespesa._id)}
                                onDeleteDespesa={() => onDeleteDespesa(receitaOrDespesa._id)}
                            />
                        ))}
                    </ContainerReceitasDespesas>
                    {resume && (
                        <ContainerSaldos>
                            <h1>Saldo Despesas: - {saldoDespesas}</h1>
                            <h1>Saldo Receitas: + {saldoReceitas}</h1>
                            <h1>Saldo: {saldo}</h1>
                        </ContainerSaldos>
                    )}
                </Container>
            )
        } else {
            return null
        }
    } else {
        return null
    }
}