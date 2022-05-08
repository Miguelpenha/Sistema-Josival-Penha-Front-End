import { useState } from 'react'
import { Container, ContainerIconBack, IconBack, Title, TextNotification, Button } from '../../styles/pages/administrativo/notification'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Notification() {
    const [text, setText] = useState('')
    const router = useRouter()

    return (
        <Container>
            <Link href="/administrativo/pagamentos" passHref>
                <ContainerIconBack>
                    <IconBack xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                    </IconBack>
                </ContainerIconBack>
            </Link>
            <Title>Gerar alerta</Title>
            <form action={`${process.env.NEXT_STATIC_API_URL}/alunos/documents/notification`} method="post" onSubmit={() => router.push('alunos')}>
                <input type="hidden" name="keyapi" value={process.env.NEXT_STATIC_API_KEY}/>
                <TextNotification
                    rows={14}
                    name="text"
                    placeholder="Texto do alerta..."
                    onChange={ev => setText(ev.target.value)}
                />
                <Button type="submit" disabled={text.length >= 1 ? false : true}>Gerar alerta</Button>
            </form>
        </Container>
    )
}

export default Notification