import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const Title = styled.h1`
    color: #009BDD;
    align-self: center;
`

export const IconButtonBack = styled(IconButton)`
    width: fit-content;
`

export const IconBack = styled(ArrowBack)`
    
`

export const Files = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 2%;
    flex-wrap: wrap;
    padding-bottom: 2%;
`