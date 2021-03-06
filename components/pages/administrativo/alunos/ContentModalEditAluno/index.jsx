import { useState, memo } from 'react'
import { useForm } from 'react-hook-form'
import { get } from '../../../../../hooks'
import api from '../../../../../services/api/base'
import { Container, Campo, InputText, Error, InputDate, Select, ItemSelect, Button } from './style'
import LabelInput from '../../../../LabelInput'
import InputMask from 'react-input-mask'

function ContentModalEditAluno({ onClose, alunos, aluno }) {
    const [nameError, setNameError] = useState(false)
    const { register, reset, handleSubmit, watch } = useForm()
    const { data: turmas } = get('/turmas')

    async function submit(data, event) {
        if (!nameError) {
            data.nascimento = `${data.nascimento.split('-')[2]}/${data.nascimento.split('-')[1]}/${data.nascimento.split('-')[0]}`
            turmas.map(turma => {
                if (turma.nome == data.turma) {
                    data.turma = turma._id
                }
            })
            
            api.post(`/alunos/${aluno._id}`, data).then(() => {
                event.preventDefault()
                reset()
                onClose()
            })
        } else {
            event.preventDefault()
        }
    }

    watch((value, { name }) => {
        if (name === 'nome') {
            let nomes = []
            
            alunos.map(alunoMap => {
                if (alunoMap._id != aluno._id) {
                    nomes.push(alunoMap.nome.toUpperCase())
                }
            })
            
            if (nomes.includes(value.nome.toUpperCase())) {
                setNameError(true)
            } else {
                setNameError(false)
            }
        }
    })

    return (
        <Container>
            <form onSubmit={handleSubmit(submit)}>
                <Campo>
                    <LabelInput required htmlFor="Nome">Nome</LabelInput>
                    <InputText
                        required
                        type="text"
                        name="nome"
                        variant="standard"
                        {...register('nome')}
                        placeholder="Nome..."
                        defaultValue={aluno.nome}
                    />
                    {nameError && <Error>J?? existe um aluno com esse nome</Error>}
                </Campo>
                <Campo>
                    <LabelInput required htmlFor="Data de nascimento">Data de nascimento</LabelInput>
                    <InputDate
                        required
                        type="date"
                        name="nascimento"
                        {...register('nascimento')}
                        defaultValue={
                            `${aluno.nascimento.split('/')[2]}-${aluno.nascimento.split('/')[1]}-${aluno.nascimento.split('/')[0]}`
                        }
                    />
                </Campo>
                <Campo>
                    <LabelInput required htmlFor="Sexo">Sexo</LabelInput>
                    <Select
                        required
                        name="sexo"
                        defaultValue={aluno.sexo}
                        {...register('sexo')}
                    >
                        <ItemSelect value="Masculino">Masculino</ItemSelect>
                        <ItemSelect value="Feminino">Feminino</ItemSelect>
                    </Select>
                </Campo>
                <Campo>
                    <LabelInput required htmlFor="Turma">Turma</LabelInput>
                    <Select
                        required
                        name="turma"
                        {...register('turma')}
                        defaultValue={aluno.turma}
                    >
                        {turmas.map((turma, index) => (
                            <ItemSelect value={turma.nome} key={index}>{turma.nome}</ItemSelect>
                        ))}
                    </Select>
                </Campo>
                <Campo>
                    <LabelInput required htmlFor="Situa????o">Situa????o</LabelInput>
                    <Select
                        required
                        name="situa????o"
                        defaultValue={aluno.situa????o}
                        {...register('situa????o')}
                    >
                        <ItemSelect value="Ativo">Ativo</ItemSelect>
                        <ItemSelect value="Cancelado">Cancelado</ItemSelect>
                    </Select>
                </Campo>
                <Campo>
                    <LabelInput required htmlFor="Telefone">Telefone</LabelInput>
                    <InputMask
                        mask="(99) 99999-9999"
                        {...register('telefone')}
                        defaultValue={aluno.telefone}
                    >
                        {() => 
                            <InputText
                                required
                                type="tel"
                                name="telefone"
                                variant="standard"
                                placeholder="Telefone..."
                            />
                        }
                    </InputMask>
                </Campo>
                <Campo>
                    <LabelInput required htmlFor="Primeiro respons??vel">Primeiro respons??vel</LabelInput>
                    <InputText
                        required
                        type="text"
                        name="respons??vel1"
                        variant="standard"
                        {...register('respons??vel1')}
                        placeholder="Respons??vel..."
                        defaultValue={aluno.respons??vel1}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="Segundo respons??vel">Segundo respons??vel</LabelInput>
                    <InputText
                        type="text"
                        name="respons??vel2"
                        variant="standard"
                        {...register('respons??vel2')}
                        placeholder="Respons??vel..."
                        defaultValue={aluno.respons??vel2}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="CEP">CEP</LabelInput>
                    <InputMask
                        mask="99.999-999"
                        {...register('cep')}
                        defaultValue={aluno.endere??o && aluno.endere??o.cep}
                    >
                        {() => 
                            <InputText
                                name="cep"
                                type="text"
                                variant="standard"
                                placeholder="CEP..."
                            />
                        }
                    </InputMask>
                </Campo>
                <Campo>
                    <LabelInput htmlFor="N??mero da casa">N??mero da casa</LabelInput>
                    <InputText
                        type="number"
                        name="n??mero"
                        variant="standard"
                        {...register('n??mero')}
                        placeholder="N??mero..."
                        defaultValue={aluno.endere??o && aluno.endere??o.n??mero}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="Complemento da casa">Complemento da casa</LabelInput>
                    <InputText
                        type="text"
                        name="complemento"
                        variant="standard"
                        {...register('complemento')}
                        placeholder="Complemento..."
                        defaultValue={aluno.endere??o && aluno.endere??o.complemento}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="Bairro">Bairro</LabelInput>
                    <InputText
                        type="text"
                        name="bairro"
                        variant="standard"
                        {...register('bairro')}
                        placeholder="Bairro..."
                        defaultValue={aluno.endere??o && aluno.endere??o.bairro}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="Cidade">Cidade</LabelInput>
                    <InputText
                        type="text"
                        name="cidade"
                        variant="standard"
                        {...register('cidade')}
                        placeholder="Cidade..."
                        defaultValue={aluno.endere??o && aluno.endere??o.cidade}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="Rua">Rua</LabelInput>
                    <InputText
                        type="text"
                        name="rua"
                        variant="standard"
                        {...register('rua')}
                        placeholder="Rua..."
                        defaultValue={aluno.endere??o && aluno.endere??o.rua}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="CPF">CPF</LabelInput>
                    <InputMask
                        mask="999.999.999-99"
                        {...register('cpf')}
                        defaultValue={aluno.cpf}
                    >
                        {() => 
                            <InputText
                                type="text"
                                name="cpf"
                                variant="standard"
                                placeholder="CPF..."
                            />
                        }
                    </InputMask>
                </Campo>
                <Campo>
                    <LabelInput htmlFor="E-mail">E-mail</LabelInput>
                    <InputText
                        type="email"
                        name="email"
                        variant="standard"
                        {...register('email')}
                        placeholder="E-mail..."
                        defaultValue={aluno.email}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="Matr??cula">Matr??cula</LabelInput>
                    <InputText
                        type="text"
                        name="matr??cula"
                        variant="standard"
                        {...register('matr??cula')}
                        placeholder="Matr??cula..."
                        defaultValue={aluno.matr??cula}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="Observa????o">Observa????o</LabelInput>
                    <InputText
                        multiline
                        type="text"
                        name="observa????o"
                        variant="standard"
                        {...register('observa????o')}
                        placeholder="Observa????o..."
                        defaultValue={aluno.observa????o}
                        rows="2"
                    />
                </Campo>
                <Button type="submit">Editar</Button>
            </form>
        </Container>
    )
}

export default memo(ContentModalEditAluno)