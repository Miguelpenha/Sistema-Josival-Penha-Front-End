import { memo } from 'react'
import { Alert, Icon } from './style'

function ErrorMsg({ children }) {
    return (
        <Alert>
            <Icon/>
            {children}
        </Alert>
    )
}

export default memo(ErrorMsg)