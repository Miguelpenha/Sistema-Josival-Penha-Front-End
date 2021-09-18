import api from '../base'

export default async function tokenId(token='') {
    const { data } = await api.post('/professoras/tokenId', {
        token
    })
    
    return data
}