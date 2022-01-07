import { get } from '../hooks'
import { useState } from 'react'
import Head from 'next/head'
import {
    Container,
    ContainerIconBack,
    IconBack,
    ContainerBoletim,
    ContainerAlunoSelect,
    LabelAlunoSelect,
    AlunoSelect,
    ButtonSubmit
} from '../styles/pages/boletim'
import Link from 'next/link'
import { MenuItem } from '@material-ui/core'
import namesMatters from '../namesMatters.json'

export default function Responsible() {
    const { data: alunos } = get('/alunos')
    const [aluno, setAluno] = useState('')
    const [edit, setEdit] = useState(false)

    return (
        <>
            <Head>
                <title>Boletim do aluno</title>
            </Head>
            <Container>
                <Link href="/administrativo/alunos" passHref>
                    <ContainerIconBack title="Voltar">
                        <IconBack xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </IconBack>
                    </ContainerIconBack>
                </Link>
                <ContainerBoletim aluno={aluno}>
                    <ContainerAlunoSelect>
                        {!aluno && (
                            <LabelAlunoSelect htmlFor="Selecione um aluno">
                                Selecione um aluno
                            </LabelAlunoSelect>
                        )}
                        <AlunoSelect
                            value={aluno}
                            autoFocus={true}
                            fullWidth={aluno ? true : false}
                            onChange={ev => setAluno(ev.target.value)}
                        >
                            {alunos && alunos.map((aluno, index) => aluno.email && 
                                <MenuItem key={index} value={aluno.id}>{aluno.nome}</MenuItem>
                            )}
                        </AlunoSelect>
                    </ContainerAlunoSelect>
                    {aluno && <>
                        <h1>boletim</h1>
                        <table>
                            {namesMatters.map((matter, index) => (
                                <tr key={index}>
                                    <td>{matter.name}</td>
                                </tr>
                            ))}
                        </table>
                    </>}
                </ContainerBoletim>
                {aluno && (
                    <ButtonSubmit
                        disabled={!edit && true}
                        onClick={() => {
                            
                        }}
                    >
                        Editar boletim
                    </ButtonSubmit>
                )}
            </Container>
        </>
    )
}