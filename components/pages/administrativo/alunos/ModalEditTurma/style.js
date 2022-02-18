import styled from 'styled-components'
import { DialogContent } from '@material-ui/core'

export const Container = styled(DialogContent)`
    scrollbar-width: thin;
    scrollbar-color: #0872FC #cccccc;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #cccccc;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background-color: #0872FC;
    }
`