import { Modal } from '@material-ui/core'
import { Container } from './style'

export default function ModalEditReceitaOrDespesa({ open, onClose, receitaOrDespesa }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Container receita={receitaOrDespesa.receita}>
                <h1>{receitaOrDespesa.nome}</h1>
            </Container>
        </Modal>
    )
}