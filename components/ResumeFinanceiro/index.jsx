import { Container } from './style'
import ReceitaOrDespesa from './ReceitaOrDespesa'

export default function ResumeFinanceiro({ receitas, despesas }) {
    if (typeof receitas != 'string' && typeof despesas != 'string') {
        receitas.map(receita => {
            receita.receita = true
            receita.criação.sistema = new Date(receita.criação.sistema)
        })
    
        despesas.map(despesa => {
            despesa.despesa = true
            despesa.criação.sistema = new Date(despesa.criação.sistema)
        })
    
        const receitasDespesas = [...receitas, ...despesas]
    
        return (
            <Container>
                {receitasDespesas.map((receitaDespesa, index) => (
                    <ReceitaOrDespesa name={receitaDespesa.nome} value={receitaDespesa.preco} receita={receitaDespesa.receita ? true : false}/>
                ))}
            </Container>
        )
    } else {
        return null
    }
}