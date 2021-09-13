import api from '../base'

export default async function professoras(quant=false) {
    if (quant) {
        const { data } = await api.get('/professoras?quant=true')
        
        return data.quant
    } else {
        const { data } = await api.get('/professoras')
        
        return data
    }
}