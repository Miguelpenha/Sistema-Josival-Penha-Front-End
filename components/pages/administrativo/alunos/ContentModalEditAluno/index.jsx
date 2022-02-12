import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Campo, InputText, Error, InputDate, Button } from './style'
import LabelInput from './LabelInput'

export default function ContentModalEditAluno({ onClose, alunos, aluno }) {
    const [nameError, setNameError] = useState(false)
    const { register, reset, handleSubmit, watch } = useForm()

    function submit(data, event) {
        if (nameError) {
            console.log(data)
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
        <form onSubmit={handleSubmit(submit)}>
            <Campo>
                <LabelInput required htmlFor="Nome">Nome</LabelInput>
                <InputText placeholder="Nome..." required {...register('nome')} type="text" variant="standard"/>
                {nameError && <Error>Já existe um aluno com esse nome</Error>}
            </Campo>
            <Campo>
                <LabelInput required htmlFor="Data de nascimento">Data de nascimento</LabelInput>
                <InputDate required {...register('nascimento')} type="date" value={`${aluno.nascimento.split('/')[2]}-${aluno.nascimento.split('/')[1]}-${aluno.nascimento.split('/')[0]}`}/>
            </Campo>
            <Button type="submit">Editar</Button>
        </form>
    )
}