import { createContext, useEffect, useState } from 'react'
import api from '../services/api/api'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { get, post } from '../services/api/alunos/alunosQuant'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    let isAuthenticated = user.id ? true : false
    useEffect(() => {
        const { [process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS]:tokenProf } = parseCookies()
        const { [process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO]:tokenAdmin } = parseCookies()
        if (tokenProf) {
            const token = tokenProf
            const { data: newTokenBruto } = post('/professoras/auth', {
                token
            })
            if (newTokenBruto.newToken) {
                setCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS, newTokenBruto.newToken, {
                    path: '/',
                    secure: true,
                    domain: process.env.NEXT_STATIC_DOMAIN,
                    maxAge: 52560000 * 60 * 1 // 100 year
                })
            } else if (newTokenBruto.notExists) {
                destroyCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS)
                isAuthenticated = false
                setUser({})
            }
            const { data: tokenTokenIdBruto } = post('/professoras/tokenId', {
                token
            })
            if (tokenTokenIdBruto.id) {
                setUser({
                    id: tokenTokenIdBruto.id
                })
            }
        } else if (tokenAdmin) {
            const token = tokenAdmin
            const { data: tokenAdminBruto } = post('/administrativo/auth', {
                token
            })
            if (tokenAdminBruto.newToken) {
                setCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO, tokenAdminBruto.newToken, {
                    path: '/',
                    secure: true,
                    domain: process.env.NEXT_STATIC_DOMAIN,
                    maxAge: 52560000 * 60 * 1 // 100 year
                })
            } else if (tokenAdminBruto.notExists) {
                destroyCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO)
                isAuthenticated = false
                setUser({})
            }
            const { data: tokenAdminTokenId } = post('/professoras/tokenId', {
                token
            })
            if (tokenAdminTokenId.id) {
                setUser({
                    id: tokenAdminTokenId.id
                })
            }
        }
    }, [])
    
    async function sigIn(data={}, type='', modelUser=[]) {
        if (type === 'professora') {
            const { login, senha } = data
            const { data: token } = post('/professoras/login', {
                login,
                senha
            }).token
            setUser({
                id: post('/professoras/tokenId', {
                    token
                }).data
            })
            setCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS, token, {
                path: '/',
                secure: true,
                domain: process.env.NEXT_STATIC_DOMAIN,
                maxAge: 52560000 * 60 * 1 // 100 year
            })
        } else if (type === 'administrativo') {
            const { login, senha } = data
            const token = post('/administrativo/login', {
                login,
                senha,
                ult: true,
                modelUser: ult ? modelUser : false
            }).data.token
            setUser({
                id: post('/administrativo/tokenId', {
                    token
                })
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