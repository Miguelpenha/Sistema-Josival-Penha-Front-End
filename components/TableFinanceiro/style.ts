import styled, { css } from 'styled-components'

export const Table = styled.table`
    width: 100%;
    margin-top: 6%;
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

export const IconName = styled.svg`
    width: 8%;
    fill: #797979;
    margin-right: 2%;
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