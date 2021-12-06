import { createContext, useEffect, useState } from 'react'
import { get } from '../hooks'
import Carregando from '../components/Carregando'
import Head from 'next/head'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export const ApiContext = createContext({})

export function ApiProvider({ children }) {
    const { data } = get(`${process.env.NEXT_STATIC_API_URL}/alunos`)
    const [desktop, setDesktop] = useState(false)

    const { [process.env.NEXT_STATIC_NAME_COOKIE_DESKTOP]:tokenDesktop } = parseCookies()

    useEffect(() => {
        if (!tokenDesktop) {
            if (window.desktop) {
                setCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_DESKTOP, true, {
                    path: '/',
                    secure: true,
                    domain: process.env.NEXT_STATIC_DOMAIN,
                    maxAge: 52560000 * 60 * 1 // 100 year
                })
    
                setDesktop(true)
            } else {
                destroyCookie(undefined, process.env.NEXT_STATIC_NAME_COOKIE_DESKTOP)

                setDesktop(false)
            }
        } else {
            setDesktop(true)
        }
    }, [])
    
    return (
        <ApiContext.Provider value={{desktop}}>
            {data ? children : <>
                <Head>
                    <title>Buscando dados</title>
                </Head>
                <Carregando/>
                <div style={{font: '400 100% Roboto, sans-serif', margin: 0, padding: 0, boxSizing: 'border-box', transitionTimingFunction: 'linear', transitionDuration: '0.2s', textAlign: 'center', marginTop: '28%', color: '#0872FC', fontSize: '1.5vw'}}>Buscando dados...</div>
            </>}
        </ApiContext.Provider>
    )
}