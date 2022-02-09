import { Modal } from '@material-ui/core'
import { Container, Title, Form, Campo, Label, InputText, TextArea, ContainerSwitch, Switch, TextSwitch } from './style'

export default function ModalEditReceitaOrDespesa({ open, onClose, receitaOrDespesa }) {
    return (
        <Modal open={open} onClose={onClose}>
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
                    <Campo>
                        <Label htmlFor="Data">Data</Label>
                        <InputText
                            type="date"
                            placeholder="Data: "
                            receita={receitaOrDespesa.receita}
                            defaultValue={receitaOrDespesa.data ? `${receitaOrDespesa.data.split('/')[2]}-${receitaOrDespesa.data.split('/')[1]}-${receitaOrDespesa.data.split('/')[0]}` : receitaOrDespesa.fixa && `${new Date().toLocaleDateString().split('/')[2]}-${new Date().toLocaleDateString().split('/')[1]}-${receitaOrDespesa.fixaDay}`}
                        />
                    </Campo>
                    <Campo>
                        <Label htmlFor="Observação">Observação</Label>
                        <TextArea receita={receitaOrDespesa.receita}>{receitaOrDespesa.observação}</TextArea>
                    </Campo>
                    <ContainerSwitch receita={receitaOrDespesa.receita}>
                        <Switch
                            receita={receitaOrDespesa.receita}
                            defaultChecked={receitaOrDespesa.investimento}
                        />
                        <TextSwitch>Investimento</TextSwitch>
                    </ContainerSwitch>
                    <ContainerSwitch receita={receitaOrDespesa.receita}>
                        <Switch
                            receita={receitaOrDespesa.receita}
                            defaultChecked={receitaOrDespesa.fixa}
                        />
                        <TextSwitch>Fixa</TextSwitch>
                    </ContainerSwitch>
                </Form>
            </Container>
        </Modal>
    )
}