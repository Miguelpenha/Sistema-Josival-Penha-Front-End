import { File, Image, Container, Title, Options, Option, OptionText, OptionDelete, OptionEdit, OptionInNew } from './style'
import { CheckCircleOutline, Close } from '@material-ui/icons'
import api from '../../services/api/base'

export default function FileComp({ foto, setAlert, reload }) {
    return (
        <File>
            <Image src={foto.url}/>
            <Container>
                <Title>{foto.fileName}</Title>
                <Options>
                    <Option color="error" onClick={() => {
                        api.delete('/alunos/fotos', {
                            data: {
                                key: foto.Key
                            }
                        }).then(() => reload())
                    }}>
                        <OptionDelete fontSize="large"/>
                    </Option>
                    <Option color="primary">
                        <OptionEdit fontSize="large"/>
                    </Option>
                    <Option color="default" onClick={() => {
                        setAlert({
                            open: true,
                            text: 'Foto aberta no navegador',
                            severity: 'info',
                            time: 3000
                        })
                        
                        window.desktop.openURL(foto.url)
                    }}>
                        <OptionInNew fontSize="large"/>
                    </Option>
                    <OptionText color="primary">
                        <span style={{fontSize: '1vw'}}>Usando: </span>
                        {foto.used ? <CheckCircleOutline sx={{'&&': {
                            color: '#5AB55E'
                        }}} fontSize="large"/> : <Close sx={{'&&': {
                            color: '#ED3237'
                        }}} fontSize="large"/>}
                    </OptionText>
                </Options>
            </Container>
        </File>
    )
}