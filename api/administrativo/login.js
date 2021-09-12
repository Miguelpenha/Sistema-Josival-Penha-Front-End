import api from '../base'

export default async function login(login='', senha='', ult=false, platform='') {
    const { data } = await api.post(`/administrativo/login${ult ? `?ult=true&ip=${'asd'}` : ''}`, {
        login,
        senha
    })
    
    return data.token
}