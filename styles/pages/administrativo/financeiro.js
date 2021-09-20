import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { Add as IconAddSVG, TrendingDown as IconTrendingDownSVG } from '@material-ui/icons'

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 2.3fr 0.6fr;
`

const Main = styled.main`
    padding: 2%;
    color: black;
`

const IconAdd = styled(IconAddSVG)`
    color: #ffffff;
    background-color: #6A54ED;
    border-radius: 50%;
    border: 10px solid #6A54ED;
    cursor: pointer;

    && {
        width: 8%;
        height: auto;
    }

    &:hover {
        background-color: #9C59FF;
        border-color: #9C59FF;
    }
`

const IconTrendingDown = styled(IconTrendingDownSVG)`
    color: #ED3237;
    margin-right: 15%;

    && {
        width: 22%;
        height: auto;
    }
`

export { 
    Container,
    Main,
    IconAdd,
    IconTrendingDown
}