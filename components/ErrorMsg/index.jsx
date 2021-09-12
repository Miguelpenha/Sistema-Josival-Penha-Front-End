import { Alert, Icon } from './style'

export default function ErrorMsg({ children }) {
    return (
        <Alert>
            <Icon/>
            {children}
        </Alert>
    )
}