import api from '../base'

export default async function auth(token='') {
    const { data } = await api.post('/administrativo/auth', {
        token
    })

    return data
}