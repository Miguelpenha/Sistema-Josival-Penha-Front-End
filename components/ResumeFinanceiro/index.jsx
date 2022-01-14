import { Container } from './style'
import ReceitaOrDespesa from './ReceitaOrDespesa'

export default function ResumeFinanceiro({ receitas, despesas, onDeleteReceita, onDeleteDespesa }) {
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

        function sortDate(a, b) {
            return b.criação.sistema - a.criação.sistema
        }
        
        receitasDespesas.sort(sortDate)
    
        return (
            <Container>
                {receitasDespesas.map((receitaDespesa, index) => (
                    <ReceitaOrDespesa key={index} name={receitaDespesa.nome} value={receitaDespesa.preco} receita={receitaDespesa.receita ? true : false} onDeleteReceita={() => onDeleteReceita(receitaDespesa._id)} onDeleteDespesa={() => onDeleteDespesa(receitaDespesa._id)}/>
                ))}
            </Container>
        )
    } else {
        return null
    }
}