import { useRouter } from "next/router"

export default function PagamentosAluno({  }) {
    const { aluno } = useRouter().query

    return <h1>{aluno && aluno}</h1>
}