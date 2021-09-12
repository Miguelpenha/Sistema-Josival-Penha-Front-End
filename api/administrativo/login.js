import api from '../base'

export default async function login(login='', senha='') {
    const { data } = await api.post('/administrativo/login', {
        login,
        senha
    })
    
    return data.token
}