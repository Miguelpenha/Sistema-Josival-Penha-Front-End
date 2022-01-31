import { useState } from 'react'
import {
    Container,
    ContainerIconBack,
    IconBack,
    Title,
    Form,
    Campo,
    Label,
    Input,
    TextArea,
    TextSwitch,
    Button
} from '../../styles/pages/administrativo/reportar'
import Link from 'next/link'
import api from '../../services/api/base'
import { useRouter } from 'next/router'
import { Switch } from '@material-ui/core'

export default function Reportar() {
    const [urgente, setUrgente] = useState(false)
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
            <Title>Reportar erro</Title>
            <Form onSubmit={async ev => {
                ev.preventDefault()
                await api.post('/problemas', {
                    nameUser: ev.currentTarget[0].value,
                    título: ev.currentTarget[1].value,
                    problema: ev.currentTarget[2].value,
                    urgente,
                    criação: new Date().toISOString()
                })
                router.push('/administrativo/alunos')
            }}>
                <Campo>
                    <Label htmlFor="Nome">Nome</Label>
                    <Input placeholder="Nome..." type="text" required defaultValue={process.env.NEXT_STATIC_NAME_ADMIN}/>
                </Campo>
                <Campo>
                    <Label htmlFor="Título">Título</Label>
                    <Input placeholder="Título..." type="text" required/>
                </Campo>
                <Campo>
                    <Label htmlFor="Problema">Problema</Label>
                    <TextArea placeholder="Problema..." rows="3" required/>
                </Campo>
                <div>
                    <Switch checked={urgente} onChange={ev => setUrgente(ev.target.checked)}/>
                    <TextSwitch>Urgente</TextSwitch>
                </div>
                <Button>Reportar</Button>
            </Form>
        </Container>
    )
}