import { Modal } from '@material-ui/core'
import { Container, Form, Campo, Label, InputText } from './style'

export default function ModalEditReceitaOrDespesa({ open, onClose, receitaOrDespesa }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Container receita={receitaOrDespesa.receita}>
                <h1>Editar {receitaOrDespesa.receita ? 'Receita' : 'Despesa'}</h1>
                <Form>
                    <Campo>
                        <Label htmlFor="Nome">Nome</Label>
                        <InputText
                            type="text"
                            placeholder="Nome: "
                            receita={receitaOrDespesa.receita}
                            defaultValue={receitaOrDespesa.nome}
                        />
                    </Campo>
                    <Campo>
                        <Label htmlFor="Valor">Valor</Label>
                        <InputText
                            type="text"
                            placeholder="Valor: "
                            receita={receitaOrDespesa.receita}
                            defaultValue={receitaOrDespesa.preco}
                        />
                    </Campo>
                </Form>
            </Container>
        </Modal>
    )
}