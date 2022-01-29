import { useRouter } from 'next/router'
import { get } from '../../../hooks'
import { Container } from '../../../styles/pages/administrativo/pagamentos/aluno'

export default function PagamentosAluno({  }) {
    const { aluno: alunoId } = useRouter().query

    if (alunoId) {
        const { data: aluno } = get(`/alunos/${alunoId}`)
        
        return (
            <Container>
                <h1>{aluno && aluno.nome}</h1>
            </Container>
        )
    } else {
        return null
    }
}