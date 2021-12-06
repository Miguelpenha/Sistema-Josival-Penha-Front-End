import { Container, Title, IconButtonBack, IconBack, Files } from '../../styles/pages/desktop/arquivos'
import { useState } from 'react'
import File from '../../components/File'
import { Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Alert } from '../../components/AlertStyle'
import { get } from '../../hooks'

export default function Arquivos() {
    const { data: fotosAlunos, mutate: mutateFotosAlunos } = get('/alunos/fotos')
    const [alert, setAlert] = useState({
        open: false
    })

    function AlertFunction() {
        return (
        <Snackbar anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom'
        }} open={alert.open} autoHideDuration={alert.time} onClose={() => setAlert({
            open: false
        })}>
            <Alert onClose={() => setAlert({
            open: false
            })} severity={alert.severity} action={
            <IconButton color="info" onClick={() => setAlert({
                open: false
            })}>
                <Close fontSize="large" sx={{'&&': {
                color: '#014361'
                }}}/>
            </IconButton>
            }>{alert.text}</Alert>
        </Snackbar>
        )
    }
    
    return (
        <Container>
        <IconButtonBack color="primary">
            <IconBack fontSize="large"/>
        </IconButtonBack>
        <Title>Arquivos</Title>
        <Files>
            {fotosAlunos && fotosAlunos.map((foto, key) => <File foto={foto} key={key} setAlert={data => setAlert(data)}/>)}
        </Files>
        <AlertFunction/>
        </Container>
    )
}