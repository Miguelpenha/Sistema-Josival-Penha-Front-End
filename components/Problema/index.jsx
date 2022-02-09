import { Container, NameUser, Title, Description } from './style'
import { CheckCircleOutline, Close } from '@material-ui/icons'

export default function Problema({ problema }) {
    return (
        <Container>
            <NameUser>{problema.nameUser}</NameUser>
            <Title>{problema.título}</Title>
            <Description>{problema.problema}</Description>
            <div style={{marginTop: '2%'}}>
                <span style={{fontSize: '1.2vw', color: '#c5c5c5', fontWeight: 'bold'}}>Urgente: </span>
                {problema.urgente ? (
                    <CheckCircleOutline sx={{'&&': {
                        color: '#5AB55E'
                    }}} fontSize="large"/>
                ) : (
                    <Close sx={{'&&': {
                        color: '#ED3237'
                    }}} fontSize="large"/>
                )}
            </div>
        </Container>
    )
}