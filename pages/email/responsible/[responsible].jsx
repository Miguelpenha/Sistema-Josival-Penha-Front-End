import { useState } from 'react'
import router, { useRouter } from 'next/router'
import { Container, ContainerIconBack, IconBack, ContainerEmail, TextEmail, ResultEmail, ButtonSubmit } from '../../../styles/email/responsible'
import Link from 'next/link'
import parse from 'html-react-parser'
import markdown from 'markdown-it'
import { useEffect } from 'react'
import api from '../../../services/api/base'

export default function Responsible() {
    const [valueEmail, setValueEmail] = useState('')
    const [email, setEmail] = useState('')
    const { responsible } = useRouter().query

    useEffect(() => {
        let novaLetra = ''
        let ultLetra = ''
        
        for (let letra of valueEmail) {
            if (letra === '\n' && ultLetra === '\n') {
                novaLetra += '<br>\n\n'
            } else {
                novaLetra += letra
            }
            
            ultLetra=letra
        }
        
        setEmail(novaLetra)
    }, [valueEmail])

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
                <TextEmail
                    rows="7"
                    autoFocus={true}
                    spellCheck="true"
                    value={valueEmail}
                    autoCorrect="true"
                    autoComplete="true"
                    onChange={ev => setValueEmail(ev.target.value)}
                />
                <hr/>
                <ResultEmail>
                    {parse(
                        markdown({
                            html: true,
                            breaks: true,
                            typographer: true
                        }).render(email)
                    )}
                </ResultEmail>
            </ContainerEmail>
            <ButtonSubmit type="submit" onClick={() => 
                api.post('/emails/responsible', { id: responsible, msg: email }).then(() => router.push('/administrativo/alunos'))
            }>Enviar E-mail</ButtonSubmit>
        </Container>
    )
}