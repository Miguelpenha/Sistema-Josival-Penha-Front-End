import useSWR from 'swr'
import axios from 'axios'

const base = axios.create({
    baseURL: process.env.NEXT_STATIC_API_URL
})

export default function api(url='', config={}) {
    const { data, error } = useSWR(url, async url => {
        const response = await base(url, config)
        const data = await response.data

        return data
    })

    return { data, error }
}

export function get(url='', config={}) {
    const { data, error, mutate } = useSWR(url, async url => {
        const response = await base.get(url, config)
        const data = await response.data

        return data
    })
    
    return { data, error, mutate }
}

export function post(url='', dataParams={}, config={}) {
    const { data, error } = useSWR(url, async url => {
        const response = await base.post(url, dataParams, config)
        const data = await response.data

        return data
    })
    
    return { data, error }
}