import styled from 'styled-components'
import { Card, IconButton } from '@material-ui/core'
import { Delete, Edit, OpenInNew } from '@material-ui/icons'

export const File = styled(Card)`
    display: flex;
    width: 40%;
    padding: 2%;
    flex-direction: row;
    height: fit-content;
    margin-top: 2%;
`

export const Image = styled.img`
    width: 20%;
    height: auto;
    border-radius: 15px;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5%;
`

export const Title = styled.h2`
    color: #009BDD;
`

export const Options = styled.nav`
    width: fit-content;
`

export const Option = styled(IconButton)`
    
`

export const OptionText = styled.span`
    
`

export const OptionDelete = styled(Delete)`
    && {
        color: #E91E63;
    }
`

export const OptionEdit = styled(Edit)`
    && {
        color: #90CAF9;
    }
`

export const OptionInNew = styled(OpenInNew)`
    
`