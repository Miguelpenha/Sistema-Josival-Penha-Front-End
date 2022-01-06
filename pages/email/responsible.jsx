import { get } from '../../hooks'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Container, ContainerIconBack, IconBack, ContainerEmail, ContainerAlunoSelect, LabelAlunoSelect, AlunoSelect, TextEmail, ButtonSubmit } from '../../styles/pages/email/responsible'
import Link from 'next/link'
import { MenuItem } from '@material-ui/core'
import api from '../../services/api/base'

export default function Responsible() {
    const { data: alunos } = get('/alunos')
    const [aluno, setAluno] = useState('')
    const [textEmail, setTextEmail] = useState('')
    const router = useRouter()

    useEffect(() => aluno && window.document.getElementById('email').focus(), [aluno])

    return (
        <Container>
            <Link href="/administrativo/alunos" passHref>
                <ContainerIconBack title="Voltar">
                    <IconBack xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                    </IconBack>
                </ContainerIconBack>
            </Link>
            <ContainerEmail>
                <ContainerAlunoSelect>
                    <LabelAlunoSelect htmlFor="Selecione um aluno">Selecione um aluno</LabelAlunoSelect>
                    <AlunoSelect value={aluno} autoFocus={true} onChange={ev => setAluno(ev.target.value)}>
                        {alunos && alunos.map((aluno, index) => <MenuItem key={index} value={aluno.id}>{aluno.nome}</MenuItem>)}
                    </AlunoSelect>
                </ContainerAlunoSelect>
                {aluno && (
                    <TextEmail
                        rows="7"
                        id="email"
                        spellCheck="true"
                        value={textEmail}
                        autoCorrect="true"
                        autoComplete="true"
                        onChange={ev => setTextEmail(ev.target.value)}
                    />
                )}
            </ContainerEmail>
            {aluno && (
                <ButtonSubmit
                    disabled={!textEmail && true}
                    onClick={() => (
                        api.post('/emails/responsible', { id: aluno, msg: textEmail }).then(() => router.push('/administrativo/alunos'))
                    )}
                >
                    Enviar E-mail
                </ButtonSubmit>
            )}
        </Container>
    )
}