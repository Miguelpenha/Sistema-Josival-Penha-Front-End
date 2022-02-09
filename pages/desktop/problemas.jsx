import { Container, Title, IconButtonBack, IconBack, Files } from '../../styles/pages/desktop/problemas'
import { useState } from 'react'
import Problema from '../../components/Problema'
import { Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Alert } from '../../components/AlertStyle'
import { get } from '../../hooks'
import Link from 'next/link'
import nookies from 'nookies'

export default function Arquivos() {
    const { data: problemas, mutate: mutateProblemas } = get('/problemas')
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
            <Link href="administrativo">
                <IconButtonBack color="primary" component="a">
                    <IconBack fontSize="large"/>
                </IconButtonBack>
            </Link>
            <Title>Problemas</Title>
            <Files>
                {problemas && typeof problemas === 'object' && problemas.map((problema, key) => <Problema problema={problema}/>)}
            </Files>
            <AlertFunction/>
        </Container>
    )
}

export const getServerSideProps = async ctx => {
    const { [process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS]:tokenProf } = nookies.get(ctx)
    const { [process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO]:tokenAdmin } = nookies.get(ctx)
    const { [process.env.NEXT_STATIC_NAME_COOKIE_DESKTOP]:tokenDesktop } = nookies.get(ctx)
    
    if (tokenProf) {
      return {
        redirect: {
          destination: tokenDesktop ? '/desktop/professoras' : '/professoras',
          permanent: false
        }
      }
    } else if (tokenAdmin) {
        if (tokenDesktop) {
            return {
                props: {}
            }
        } else {
            return {
                redirect: {
                  destination: '/administrativo/alunos',
                  permanent: false
                }
            }
        }
    }

    if (!tokenAdmin || tokenProf) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
    }
    }
  
    return {
      props: {}
    }
}