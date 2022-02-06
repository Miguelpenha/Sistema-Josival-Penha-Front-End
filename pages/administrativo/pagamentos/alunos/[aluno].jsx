import { get } from '../../../../hooks'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Loading from '../../../../components/Loading'
import { Container, ContainerIconBack, IconBack } from '../../../../styles/pages/administrativo/pagamentos/alunos'
import Link from 'next/link'
import { Select, MenuItem } from '@material-ui/core'

export default function PagamentosAlunos() {
    const router = useRouter()
    const { data: alunos } = get('/alunos')
    const { aluno: alunoId } = router.query
    const { data: aluno } = get(`/alunos/${alunoId}`)
    
    return <>
        <Head>
            <title>Alunos Pagamentos</title>
        </Head>
        <Loading loading={[alunos, aluno]}>
            <Container>
                <Link href="/administrativo/pagamentos" passHref>
                    <ContainerIconBack>
                        <IconBack xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </IconBack>
                    </ContainerIconBack>
                </Link>
                <Select
                    value={alunoId}
                    onChange={event => (
                        router.push(
                            `/administrativo/pagamentos/alunos/${event.target.value}`,
                            null,
                            { shallow: true }
                        )
                    )}
                >
                  {alunos && alunos.map((aluno, index) =>
                    <MenuItem value={aluno._id} key={index}>{aluno.nome}</MenuItem>
                  )}
                </Select>
                <h1>{aluno && aluno.nome}</h1>
            </Container>
        </Loading>
    </>
}