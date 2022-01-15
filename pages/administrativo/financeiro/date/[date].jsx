import { useRouter }  from 'next/router'

export default function Date() {
    const { date: dateBruta } = useRouter().query
    const date = dateBruta && dateBruta.replaceAll('-', '/')

    return <h1>Data: {date}</h1>
}