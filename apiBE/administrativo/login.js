import api from '../base'

export default async function login(login='', senha='', ult=false, modelUser=[]) {
    const { data } = await api.post('/administrativo/login', {
        login,
        senha,
        ult: ult ? true : false,
        modelUser: ult ? modelUser : false
    })
    
    return data.token
}