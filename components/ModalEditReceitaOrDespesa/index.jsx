import { useForm } from 'react-hook-form'
import { useState, memo } from 'react'
import api from '../../services/api/base'
import { Modal } from '@material-ui/core'
import {
    Container,
    Title,
    Form,
    Campo,
    Label,
    InputText,
    TextArea,
    ContainerSwitch,
    Switch,
    TextSwitch,
    Button
} from './style'
import { Select, MenuItem } from '@material-ui/core'

function ModalEditReceitaOrDespesa({ open, onClose, onEdit, receitaOrDespesa, month }) {
    if (receitaOrDespesa) {
        const { register, handleSubmit, watch, reset } = useForm()
        const [fixaCampo, setFixaCampo] = useState(receitaOrDespesa.fixa)
        let days = []
        
        for (let cont = 1;cont<=31;cont++) {
            days.push(cont < 10 ? `0${cont}` : String(cont))
        }

        watch((value, { name }) => {
            if (name === 'fixa') {
            setFixaCampo(value)
            }
        })
        
        async function enviarReceitaOrDespesa(data, event) {
            let { nome, valor, date, observação, investimento, fixaDay, pago } = data

            let receitaOrDespesaSubmit = {}
            
            if (fixaCampo) {
                receitaOrDespesaSubmit = {
                    nome,
                    preco: valor,
                    data: date ? `${date.split('-')[1]}/${date.split('-')[2]}/${date.split('-')[0]}` : date,
                    investimento,
                    fixa: fixaCampo,
                    fixaDay: String(fixaDay),
                    observação,
                    pago,
                    criação: new Date().toISOString()
                }
            } else {
                receitaOrDespesaSubmit = {
                    nome,
                    preco: valor,
                    data: date ? `${date.split('-')[1]}/${date.split('-')[2]}/${date.split('-')[0]}` : date,
                    investimento,
                    fixa: fixaCampo,
                    fixaDay: String(fixaDay),
                    observação,
                    pago,
                    months: receitaOrDespesa.months,
                    criação: new Date().toISOString()
                }
            }
            
            if (receitaOrDespesa.receita) {
                await api.post(`/financeiro/receitas/${receitaOrDespesa._id}`, receitaOrDespesaSubmit)
            } else {
                await api.post(`/financeiro/despesas/${receitaOrDespesa._id}`, receitaOrDespesaSubmit)
            }
            
            reset()
            onEdit()
            onClose()
            setFixaCampo(null)
            event.preventDefault()
        }

        function CampoDateFixa() {
            return <>
                <Label htmlFor="Dia do pagamento fixo" style={{marginLeft: '20%', marginTop: '2%', marginBottom: '1.5%'}}>Dia do pagamento fixo</Label>
                <Select
                    name="fixaDay"
                    {...register('fixaDay')}
                    defaultValue={receitaOrDespesa.fixaDay || String(new Date().toLocaleDateString('pt-br').split('/')[0])}
                    sx={{
                        '&&': {
                            marginRight: '66%',
                            fontSize: '1vw'
                        }
                    }}
                >
                    {days.map((day, index) => (
                        <MenuItem key={index} value={day}>{day}</MenuItem>
                    ))}
                </Select>
            </>
        }

        function CampoDate() {
            return (
                <Campo>
                    <Label htmlFor="Data">Data</Label>
                    <InputText
                        name="data"
                        type="date"
                        {...register('date')}
                        placeholder="Data: "
                        receita={receitaOrDespesa.receita}
                        defaultValue={receitaOrDespesa.data ? `${receitaOrDespesa.data.split('/')[2]}-${receitaOrDespesa.data.split('/')[1]}-${receitaOrDespesa.data.split('/')[0]}` : receitaOrDespesa.fixa && `${new Date().toLocaleDateString('pt-br').split('/')[2]}-${new Date().toLocaleDateString('pt-br').split('/')[1]}-${receitaOrDespesa.fixaDay}`}
                    />
                </Campo>
            )
        }
       
        return (
            <Modal open={open} onClose={() => {
                reset()
                onClose()
                setFixaCampo(null)
            }}>
                <Container receita={receitaOrDespesa.receita}>
                    <Title>Editar {receitaOrDespesa.receita ? 'Receita' : 'Despesa'}</Title>
                    <Form onSubmit={handleSubmit(enviarReceitaOrDespesa)}>
                        <Campo>
                            <Label htmlFor="Nome">Nome</Label>
                            <InputText
                                name="nome"
                                type="text"
                                {...register('nome')}
                                placeholder="Nome: "
                                receita={receitaOrDespesa.receita}
                                defaultValue={receitaOrDespesa.nome}
                            />
                        </Campo>
                        <Campo>
                            <Label htmlFor="Valor">Valor</Label>
                            <InputText
                                type="text"
                                name="valor"
                                placeholder="Valor: "
                                {...register('valor')}
                                receita={receitaOrDespesa.receita}
                                defaultValue={receitaOrDespesa.fixa ? receitaOrDespesa.months[month].preco : receitaOrDespesa.preco}
                            />
                        </Campo>
                        <Campo>
                            <Label htmlFor="Observação">Observação</Label>
                            <TextArea
                                name="observação"
                                placeholder="Observação..."
                                {...register('observação')}
                                receita={receitaOrDespesa.receita}
                            >
                                {receitaOrDespesa.fixa ? receitaOrDespesa.months[month].observação : receitaOrDespesa.observação}
                            </TextArea>
                        </Campo>
                        <ContainerSwitch receita={receitaOrDespesa.receita}>
                            <Switch
                                name="pago"
                                receita={receitaOrDespesa.receita}
                                inputRef={register('pago').ref}
                                onChange={register('pago').onChange}
                                defaultChecked={receitaOrDespesa.fixa ? receitaOrDespesa.months[month].pago : receitaOrDespesa.pago}
                            />
                            <TextSwitch>Pago</TextSwitch>
                        </ContainerSwitch>
                        <ContainerSwitch receita={receitaOrDespesa.receita}>
                            <Switch
                                name="investimento"
                                receita={receitaOrDespesa.receita}
                                inputRef={register('investimento').ref}
                                onChange={register('investimento').onChange}
                                defaultChecked={receitaOrDespesa.investimento}
                            />
                            <TextSwitch>Investimento</TextSwitch>
                        </ContainerSwitch>
                        <ContainerSwitch receita={receitaOrDespesa.receita}>
                            <Switch
                                name="fixa"
                                onChange={(ev, checked) => setFixaCampo(checked)}
                                receita={receitaOrDespesa.receita}
                                defaultChecked={receitaOrDespesa.fixa}
                            />
                            <TextSwitch>Fixa</TextSwitch>
                        </ContainerSwitch>
                        {fixaCampo !== null ? <>
                            {fixaCampo ? (
                                <CampoDateFixa/>
                            ): (
                                <CampoDate/>
                            )}
                        </> : <>
                        {receitaOrDespesa.fixa ? (
                            <CampoDateFixa/>
                        ) : (
                            <CampoDate/>
                        )}
                        </>}
                        <Button
                            type="submit"
                            receita={receitaOrDespesa.receita}
                            title={`Editar ${receitaOrDespesa.receita ? 'receita' : 'despesa'}`}
                        >
                            Editar
                        </Button>
                    </Form>
                </Container>
            </Modal>
        )
    } else {
        return null
    }
}

export default memo(ModalEditReceitaOrDespesa)