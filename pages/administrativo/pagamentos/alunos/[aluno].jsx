import { get } from '../../../../hooks'
import Loading from '../../../../components/Loading'
import { Container, ContainerIconBack, IconBack } from '../../../../styles/pages/administrativo/pagamentos/aluno'
import Link from 'next/link'

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {
    return {
        props: {
            alunoId: context.params.aluno
        }
    }
}

export default function PagamentosAluno({ alunoId }) {
    const { data: aluno } = get(`/alunos/${alunoId}`)
        
    return (
        <Loading loading={aluno}>
            <Container>
                <Link href="/administrativo/pagamentos/alunos" passHref>
                    <ContainerIconBack>
                        <IconBack xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </IconBack>
                    </ContainerIconBack>
                </Link>
                <h1>{aluno && aluno.nome}</h1>
            </Container>
        </Loading>
    )
}