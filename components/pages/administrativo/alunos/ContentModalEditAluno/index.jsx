import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { get } from '../../../../../hooks'
import api from '../../../../../services/api/base'
import { Container, Campo, InputText, Error, InputDate, Select, ItemSelect, Button } from './style'
import LabelInput from '../../../../LabelInput'
import InputMask from 'react-input-mask'

export default function ContentModalEditAluno({ onClose, alunos, aluno }) {
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
            
            await api.post(`/alunos/${aluno._id}`, data)
            event.preventDefault()
            reset()
            onClose()
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
                    {nameError && <Error>Já existe um aluno com esse nome</Error>}
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
                    <LabelInput required htmlFor="Situação">Situação</LabelInput>
                    <Select
                        required
                        name="situação"
                        defaultValue={aluno.situação}
                        {...register('situação')}
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
                    <LabelInput required htmlFor="Primeiro responsável">Primeiro responsável</LabelInput>
                    <InputText
                        required
                        type="text"
                        name="responsável1"
                        variant="standard"
                        {...register('responsável1')}
                        placeholder="Responsável..."
                        defaultValue={aluno.responsável1}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="Segundo responsável">Segundo responsável</LabelInput>
                    <InputText
                        type="text"
                        name="responsável2"
                        variant="standard"
                        {...register('responsável2')}
                        placeholder="Responsável..."
                        defaultValue={aluno.responsável2}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="CEP">CEP</LabelInput>
                    <InputMask
                        mask="99.999-999"
                        {...register('cep')}
                        defaultValue={aluno.endereço && aluno.endereço.cep}
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
                    <LabelInput htmlFor="Número da casa">Número da casa</LabelInput>
                    <InputText
                        type="number"
                        name="número"
                        variant="standard"
                        {...register('número')}
                        placeholder="Número..."
                        defaultValue={aluno.endereço && aluno.endereço.número}
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
                        defaultValue={aluno.endereço && aluno.endereço.complemento}
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
                        defaultValue={aluno.endereço && aluno.endereço.bairro}
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
                        defaultValue={aluno.endereço && aluno.endereço.cidade}
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
                        defaultValue={aluno.endereço && aluno.endereço.rua}
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
                    <LabelInput htmlFor="Matrícula">Matrícula</LabelInput>
                    <InputText
                        type="text"
                        name="matrícula"
                        variant="standard"
                        {...register('matrícula')}
                        placeholder="Matrícula..."
                        defaultValue={aluno.matrícula}
                    />
                </Campo>
                <Campo>
                    <LabelInput htmlFor="Observação">Observação</LabelInput>
                    <InputText
                        multiline
                        type="text"
                        name="observação"
                        variant="standard"
                        {...register('observação')}
                        placeholder="Observação..."
                        defaultValue={aluno.observação}
                        rows="2"
                    />
                </Campo>
                <Button type="submit">Editar</Button>
            </form>
        </Container>
    )
}