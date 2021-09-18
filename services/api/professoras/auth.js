import api from '../base'

export default async function auth(token='') {
    const { data } = await api.post('/professoras/auth', {
        token
    })

    return data
}