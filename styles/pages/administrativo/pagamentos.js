import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 2.3fr 0.6fr;
    height: 100%;
`

export const Main = styled.main`
    padding: 2%;
    color: #000000;
    font-size: 1.5vw;

    table {
        thead {
            th {
                background-color: #E5E5E5;
                padding: 1%;
            }
        }

        tbody {
            tr {
                cursor: pointer;

                td {
                    background-color: #ffffff;
                    padding: 1%;
                }

                :hover {
                    td {
                        background-color: #E5E5E5;
                    }
                }
            }
        }

        margin-bottom: 5%;
        width: 100%;
    }
`

export const ContainerFilters = styled.div`
    display: flex;
    flex-direction: row;
    width: 60%;
    align-items: center;
`

export const ContainerInputFind = styled.div`
    margin-right: 3%;
    display: flex;
    align-items: center;
    width: 56%;
    background-color: #ffffff;
    border-radius: 15px;
    margin-top: 2%;
    margin-bottom: 2%;
`

export const IconInputFind = styled.svg`
    color: #1976D2;
    width: 80%;
    height: auto;
    margin-left: 2%;
`

export const InputFind = styled.input`
    padding: 3%;
    font-size: 1.4vw;
    color: #1976D2;
    font-weight: 500;
    border: #ffffff 2px solid;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    :focus {
        outline: none;
        border: #1976D2 2px solid;
    }
`