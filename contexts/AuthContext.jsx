import { createContext, useEffect, useState } from 'react'
import api from '../services/api/api'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState({})

    let isAuthenticated = user.id ? true : false
    useEffect(() => {
        const { [process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS]:tokenProf } = parseCookies()
        const { [process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO]:tokenAdmin } = parseCookies()
        if (tokenProf) {
            const token = tokenProf
            api.professoras.auth(token).then(response => {
                if (response.newToken) {
                    setCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS, response.newToken, {
                        path: '/',
                        secure: true,
                        domain: process.env.NEXT_STATIC_DOMAIN,
                        maxAge: 52560000 * 60 * 1 // 100 year
                    })
                } else if (response.notExists) {
                    destroyCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS)
                    isAuthenticated = false
                    setUser({})
                }
            })
            api.professoras.tokenId(token).then(response => {
                if (response.id) {
                    setUser({
                        id: response.id
                    })
                }
            })
        } else if (tokenAdmin) {
            const token = tokenAdmin
            api.administrativo.auth(token).then(response => {
                if (response.newToken) {
                    setCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO, response.newToken, {
                        path: '/',
                        secure: true,
                        domain: process.env.NEXT_STATIC_DOMAIN,
                        maxAge: 52560000 * 60 * 1 // 100 year
                    })
                } else if (response.notExists) {
                    destroyCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO)
                    isAuthenticated = false
                    setUser({})
                }
            })
            api.administrativo.tokenId(token).then(response => {
                if (response.id) {
                    setUser({
                        id: response.id
                    })
                }
            })
        }
    }, [])
    
    async function sigIn(data={}, type='', modelUser=[]) {
        if (type === 'professora') {
            const { login, senha } = data
            const token = await api.professoras.login(login, senha)
            setUser({
                id: await api.professoras.tokenId(token)
            })
            setCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS, token, {
                path: '/',
                secure: true,
                domain: process.env.NEXT_STATIC_DOMAIN,
                maxAge: 52560000 * 60 * 1 // 100 year
            })
        } else if (type === 'administrativo') {
            const { login, senha } = data
            const token = await api.administrativo.login(login, senha, true, modelUser)
            setUser({
                id: await api.administrativo.tokenId(token)
            })
            setCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO, token, {
                path: '/',
                secure: true,
                domain: process.env.NEXT_STATIC_DOMAIN,
                maxAge: 52560000 * 60 * 1 // 100 year
            })
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, sigIn }}>
            {children}
        </AuthContext.Provider>
    )
}