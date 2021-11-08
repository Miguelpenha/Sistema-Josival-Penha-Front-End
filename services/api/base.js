import axios from 'axios'

const base = axios.create({
    baseURL: process.env.NEXT_STATIC_API_URL,
    headers: {
        'Authorization': `key ${process.env.NEXT_STATIC_API_KEY}`
    }
})

export default base