import styled, { css } from 'styled-components'
import { Select } from '@material-ui/core'

export const ContainerHeaderOptions = styled.div`
    display: flex;
    margin-top: 2%;
`

export const ContainerOptionFindName = styled.div`
    width: 40%;
    display: flex;
    border-radius: 20px;
    align-items: center;
    background-color: #ffffff;
`

export const IconOptionFindName = styled.svg`
    width: 7%;
    margin: 2.5%;
    fill: #2287E4;
`

export const InputOptionsFindName = styled.input`
    width: 82%;
    border: none;
    color: #2287E4;
    font-size: 1.5vw;
    padding: 2% 2% 2% 0%;

    :focus{
        outline: none;
    }
`

export const ContainerOptionMonth = styled.div`
    width: 25%;
    display: flex;
    margin-left: 2%;
    border-radius: 20px;
    align-items: center;
    background-color: #ffffff;
`

export const SelectMonth = styled(Select)`
    && {
        width: 78%;
        height: 100%;
        font-size: 1vw;
        background-color: #ffffff;
        border-top-right-radius: 0px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 0px;
    }
`

export const IconOptionMonth = styled.svg`
    width: 10%;
    fill: #2287E4;
    margin-left: 5%;
`

export const ContainerOptionStatus = styled.div`
    width: 25%;
    display: flex;
    margin-left: 2%;
    border-radius: 20px;
    align-items: center;
    background-color: #ffffff;
`

export const SelectStatus = styled(Select)`
    && {
        width: 78%;
        height: 100%;
        font-size: 1vw;
        background-color: #ffffff;
        border-top-right-radius: 0px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 0px;
    }
`

interface IIconOptionStatus {
    colorType: 'Pago' | 'Aguardando' | 'Atrasado' | 'Full'
}

export const IconOptionStatus = styled.svg<IIconOptionStatus>`
    width: 10%;
    margin-left: 5%;
    fill: ${props => {
        if (props.colorType === 'Full') {
            return '#2287E4'
        } else if (props.colorType === 'Pago') {
            return '#60bf92'
        } else if (props.colorType === 'Aguardando') {
            return '#E5D541'
        } else if (props.colorType === 'Atrasado') {
            return '#ef5252'
        }
    }};
`

export const Table = styled.table`
    width: 100%;
    margin-top: 2%;
    margin-bottom: 8%;
    table-layout: fixed;
    border-radius: 12px;
    background-color: #ffffff;
`

export const Header = styled.thead`
    background-color: #fafafa;
`

export const HeaderRow = styled.tr`
    
`

interface IHeaderCellTitle {
    right?: boolean
    first?: boolean
    last?: boolean
}

export const HeaderCellTitle = styled.th<IHeaderCellTitle>`
    color: #646e79;
    font-size: 1.2vw;
    padding-top: 1.5%;
    padding-bottom: 1.5%;
    background-color: #fafafa;
    border-bottom: 2px solid #f1f1f1;
    text-align: ${props => props.align};

    ${props => props.first && css`
        padding-left: 1.8%;
        border-top-left-radius: 12px;
    `}
    ${props => props.last && css`
        padding-right: 2.5%;
        border-top-right-radius: 12px;
    `}    
`

export const Body = styled.tbody`
    
`

export const BodyRow = styled.tr`
    cursor: pointer;

    :hover {
        background-color: #e4e4e4;
        
        td {
            border-bottom-color: #e4e4e4;

            button:hover {
                background-color: #b7b7b7;
            }
        }
    }
`

interface IBodyCell {
    first?: boolean
}

export const BodyCell = styled.td<IBodyCell>`
    color: #797979;
    font-size: 1.2vw;
    border-bottom: 2px solid #f1f1f1;
    
    ${props => props.first ? css`
        padding: 1.5%;
    ` : css`
        padding-top: 1.5%;
        padding-bottom: 1.5%;
    `}
`

export const ContainerName = styled.div`
    display: flex;
    align-items: center;
`

interface IIconName {
    colorType: 'receita' | 'despesa'
}

export const IconName = styled.svg<IIconName>`
    width: 8%;
    margin-right: 4%;
    fill: ${props => {
        if (props.colorType === 'receita') {
            return '#60bf92'
        } else if (props.colorType === 'despesa') {
            return '#ef5252'
        }
    }};
`

interface IContainerStatus {
    colorType: 'Pago' | 'Atrasado' | 'Aguardando'
}

export const ContainerStatus = styled.div<IContainerStatus>`
    width: 65%;
    display: flex;
    padding-top: 2.5%;
    border-radius: 15px;
    padding-bottom: 2.5%;
    justify-content: center;

    background-color: ${props => {
        if (props.colorType === 'Pago') {
            return '#60bf92'
        } else if (props.colorType === 'Atrasado') {
            return '#ef5252'
        } else if (props.colorType === 'Aguardando') {
            return '#E5D541'
        }
    }};
`

export const TextStatus = styled.div`
    color: #ffffff;
`

export const ContainerIconMore = styled.button`
    border: 0;
    width: 22%;
    padding: 3%;
    display: flex;
    cursor: pointer;
    margin-left: 62%;
    border-radius: 50%;
    background-color: transparent;

    :hover {
        background-color: #ebebeb;
    }
`

export const IconMore = styled.svg`
    width: 100%;
    fill: #797979;
`