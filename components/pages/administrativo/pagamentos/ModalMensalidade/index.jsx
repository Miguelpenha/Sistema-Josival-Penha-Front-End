import { useForm } from 'react-hook-form'
import api from '../../../../../services/api/base'
import { Modal } from '@material-ui/core'
import {
    Container,
    Form,
    Title,
    Campo,
    TextInput,
    DateInput,
    Switch,
    Button
} from './style'
import Label from '../../../../LabelInput'

export default function ModalMensalidade({ open, onClose, aluno, mesMensalidade, onEdit }) {
    const { register, handleSubmit, reset } = useForm()

    async function submit(data, event) {
        const { valor, descrição, forma, vencimento, pago } = data

        await api.post('/pagamentos', {
            id: aluno._id,
            mês: mesMensalidade,
            value: valor,
            descrição,
            forma,
            vencimento: `${vencimento.split('-')[2]}/${vencimento.split('-')[1]}/${vencimento.split('-')[0]}`,
            pago
        })

        onEdit()
        event.preventDefault()
        onClose()
        reset()
    }

    return (
      <Modal open={open} onClose={onClose}>
        <div>
          {aluno && aluno.pagamentos && aluno.pagamentos[mesMensalidade] && (
              <Container>
                <Form onSubmit={handleSubmit(submit)}>
                    <Title>Mensalidade</Title>
                    <Campo>
                        <Label required htmlFor="Valor">Valor</Label>
                        <TextInput
                            required
                            type="text"
                            name="valor"
                            colorIn="#4ED134"
                            variant="standard"
                            {...register('valor')}
                            placeholder="Valor da mensalidade..."
                            defaultValue={aluno.pagamentos[mesMensalidade].value}
                        />
                    </Campo>
                    <Campo>
                        <Label required htmlFor="Descrição">Descrição</Label>
                        <TextInput
                            rows={2}
                            type="text"
                            name="descrição"
                            multiline={true}
                            variant="standard"
                            colorIn="#8A8A8A"
                            {...register('descrição')}
                            placeholder="Descrição..."
                            defaultValue={aluno.pagamentos[mesMensalidade].descrição}
                        />
                    </Campo>
                    <Campo>
                        <Label required htmlFor="Forma de pagamento">Forma de pagamento</Label>
                        <TextInput
                            required
                            type="text"
                            name="forma"
                            colorIn="#4ED134"
                            variant="standard"
                            {...register('forma')}
                            placeholder="Forma de pagamento..."
                            defaultValue={aluno.pagamentos[mesMensalidade].forma}
                        />
                    </Campo>
                    <Campo>
                        <Label required htmlFor="Vencimento">Vencimento</Label>
                        <DateInput
                            required
                            type="date"
                            name="vencimento"
                            {...register('vencimento')}
                            defaultValue={
                                `${aluno.pagamentos[mesMensalidade].vencimento.split('/')[2]}-${aluno.pagamentos[mesMensalidade].vencimento.split('/')[1]}-${aluno.pagamentos[mesMensalidade].vencimento.split('/')[0]}`
                            }
                        />
                    </Campo>
                    <Campo>
                        <Label required htmlFor="Pago">Pago</Label>
                        <Switch
                            name="pago"
                            inputRef={register('pago').ref}
                            onChange={register('pago').onChange}
                            defaultChecked={aluno.pagamentos[mesMensalidade].pago}
                        />
                    </Campo>
                    <Button type="submit">Salvar</Button>
                </Form>
              </Container>
          )}
        </div>
      </Modal>
    )
}