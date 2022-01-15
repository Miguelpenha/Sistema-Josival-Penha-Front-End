import {
    Container,
    Row1,
    Nome,
    Date,
    Row2,
    Value,
    Options,
    ContainerIconOptions,
    IconOptions
} from './style'
import LimitText from '../../LimitText'

export default function ReceitaOrDespesa({ name, value, date, receita, onDeleteReceita, onDeleteDespesa }) {
    return (
        <Container receita={receita}>
            <Row1>
                <Nome>
                    <LimitText limit="25">{name}</LimitText>
                </Nome>
                <Date>{date}</Date>
            </Row1>
            <Row2>
                <Value receita={receita}>{receita ? '+' : '-'} {value}</Value>
                <Options>
                    <ContainerIconOptions title={`Editar essa ${receita ? 'receita' : 'despesa'}`} bg="#A0C9FF">
                        <IconOptions color="#0872FC" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </IconOptions>
                    </ContainerIconOptions>
                    <ContainerIconOptions
                        bg="#FBD6D7"
                        title={`Excluir essa ${receita ? 'receita' : 'despesa'}`}
                        onClick={() => {
                            if (receita) {
                                onDeleteReceita()
                            } else {
                                onDeleteDespesa()
                            }
                        }}
                    >
                        <IconOptions color="#ED3237" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </IconOptions>
                    </ContainerIconOptions>
                </Options>
            </Row2>
        </Container>
    )
}