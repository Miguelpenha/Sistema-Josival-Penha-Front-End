import api from '../base'

export default async function tokenId(token='') {
    const { data } = await api.post('/administrativo/tokenId', {
        token
    })
    
    return data
}