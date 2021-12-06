import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { InsertDriveFile } from '@material-ui/icons'
import Lottie from 'react-lottie'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const Title = styled.h1`
    text-align: center;
    font-size: 3vw;
    margin-top: 4%;
    margin-bottom: 2%;
    color: #009BDD;
`

export const ButtonFile = styled(Button)`
    && {
        background-color: #009BDD;
        font-size: 1.5vw;
        width: 17%;
        align-self: center;
        margin-top: 5%;
    }
`

export const IconFile = styled(InsertDriveFile)`
    margin-left: 4%;
`

export const AnimationControl = styled(Lottie).attrs({
    width: '50%'
})`
    
`