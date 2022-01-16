import {
    Container,
    ContainerReceitasDespesas,
    ContainerSaldos,
    Saldo
} from './style'
import ReceitaOrDespesa from './ReceitaOrDespesa'

export default function ResumeFinanceiro({ receitas, despesas, onDeleteReceita, onDeleteDespesa, resume, saldoReceitas, saldoDespesas, saldo, ...props }) {
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
                <Container {...props}>
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
                            <Saldo color="#EF5252">
                                <h1>Despesas - {saldoDespesas}</h1>
                            </Saldo>
                            <Saldo color="#60BF92">
                                <h1>Receitas + {saldoReceitas}</h1>
                            </Saldo>
                            <Saldo color="#0872FC">
                                <h1>Saldo {saldo}</h1>
                            </Saldo>
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