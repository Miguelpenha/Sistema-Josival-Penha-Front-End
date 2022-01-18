import { Modal } from '@material-ui/core'
import { Container, Title, Form, Campo, Label, InputText, ContainerSwitch, Switch } from './style'

export default function ModalEditReceitaOrDespesa({ open, onClose, receitaOrDespesa }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Container receita={receitaOrDespesa.receita}>
                <Title>Editar {receitaOrDespesa.receita ? 'Receita' : 'Despesa'}</Title>
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
                    <ContainerSwitch>
                        <Switch defaultChecked={receitaOrDespesa.investimento} receita={receitaOrDespesa.receita}/>
                        <span>Investimento</span>
                    </ContainerSwitch>
                    <ContainerSwitch>
                        <Switch defaultChecked={receitaOrDespesa.fixa} receita={receitaOrDespesa.receita}/>
                        <span>Fixa</span>
                    </ContainerSwitch>
                </Form>
            </Container>
        </Modal>
    )
}