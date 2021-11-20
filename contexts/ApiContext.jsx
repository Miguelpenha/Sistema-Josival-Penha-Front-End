import { createContext } from 'react'
import { get } from '../hooks'
import Carregando from '../components/Carregando'
import Head from 'next/head'

export const ApiContext = createContext({})

export function ApiProvider({ children }) {
    const { data } = get(`${process.env.NEXT_STATIC_API_URL}/alunos`)
    
    return (
        <ApiContext.Provider>
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