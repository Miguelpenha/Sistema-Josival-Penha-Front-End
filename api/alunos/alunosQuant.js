import api from '../base'

export default async function alunosQuant(quant=false) {
    if (quant) {
        const { data } = await api.get('/alunos?quant=true')
        
        return data.quant
    } else {
        const { data } = await api.get('/alunos')
        
        return data
    }
}