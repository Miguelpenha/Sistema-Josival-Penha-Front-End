import { get } from '../hooks'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
    Container,
    ContainerIconBack,
    IconBack,
    ContainerBoletim,
    ContainerAlunoSelect,
    LabelAlunoSelect,
    AlunoSelect,
    TableBoletim,
    ButtonSubmit
} from '../styles/pages/boletim'
import Link from 'next/link'
import { MenuItem } from '@material-ui/core'
import namesMatters from '../namesMatters.json'
import api from '../services/api/base'
import nookies from 'nookies'

export default function Responsible() {
    const { data: alunos } = get('/alunos')
    const [aluno, setAluno] = useState('')
    const [edit, setEdit] = useState(false)
    const [matters, setMatters] = useState({})
    const router = useRouter()

    useEffect(() => aluno && setMatters(alunos.map(alunoMap => alunoMap.id === aluno && { ...alunoMap.matérias })[0]), [aluno])

    useEffect(() => {
        if (aluno && matters) {
            alunos.map(alunoMap => alunoMap.id === aluno && JSON.stringify(alunoMap.matérias) !== JSON.stringify(matters) ? setEdit(true) : setEdit(false))
        }
    }, [matters])

    return (
        <>
            <Head>
                <title>Boletim do aluno</title>
            </Head>
            <Container>
                <Link href="/administrativo/alunos" passHref>
                    <ContainerIconBack title="Voltar">
                        <IconBack xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </IconBack>
                    </ContainerIconBack>
                </Link>
                <ContainerBoletim aluno={aluno}>
                    <ContainerAlunoSelect>
                        {!aluno && (
                            <LabelAlunoSelect htmlFor="Selecione um aluno">
                                Selecione um aluno
                            </LabelAlunoSelect>
                        )}
                        <AlunoSelect
                            value={aluno}
                            autoFocus={true}
                            fullWidth={aluno ? true : false}
                            onChange={ev => setAluno(ev.target.value)}
                        >
                            {alunos && alunos.map((aluno, index) => <MenuItem key={index} value={aluno.id}>{aluno.nome}</MenuItem>)}
                        </AlunoSelect>
                    </ContainerAlunoSelect>
                    {aluno && <>
                        <TableBoletim>
                            <thead>
                                <tr>
                                    <th colSpan="5">Boletim</th>
                                </tr>
                            </thead>
                            <tbody>
                                {namesMatters.map((matter, index) => (
                                    <tr key={index}>
                                        <td>{matter.displayName}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={matters[matter.name] ? Number(matters[matter.name].primeira) ? Number(matters[matter.name].primeira) : 0 : 0}
                                                onChange={ev => {
                                                    if (0 <= Number(ev.target.value) <= 10) {
                                                        let newsMatters = matters

                                                        if (!newsMatters[matter.name]) {
                                                            newsMatters[matter.name] = {
                                                                primeira: Number(ev.target.value)
                                                            }
                                                            setMatters({
                                                                ...newsMatters
                                                            })
                                                        } else {
                                                            newsMatters[matter.name] = {
                                                                ...newsMatters[matter.name],
                                                                primeira: Number(ev.target.value)
                                                            }
                                                            setMatters({
                                                                ...newsMatters
                                                            })
                                                        }
                                                    }
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={matters[matter.name] ? Number(matters[matter.name].segunda) ? Number(matters[matter.name].segunda) : 0 : 0}
                                                onChange={ev => {
                                                    if (0 <= Number(ev.target.value) <= 10) {
                                                        let newsMatters = matters

                                                        if (!newsMatters[matter.name]) {
                                                            newsMatters[matter.name] = {
                                                                segunda: Number(ev.target.value)
                                                            }
                                                            setMatters({
                                                                ...newsMatters
                                                            })
                                                        } else {
                                                            newsMatters[matter.name] = {
                                                                ...newsMatters[matter.name],
                                                                segunda: Number(ev.target.value)
                                                            }
                                                            setMatters({
                                                                ...newsMatters
                                                            })
                                                        }
                                                    }
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={matters[matter.name] ? Number(matters[matter.name].terceira) ? Number(matters[matter.name].terceira) : 0 : 0}
                                                onChange={ev => {
                                                    if (0 <= Number(ev.target.value) <= 10) {
                                                        let newsMatters = matters

                                                        if (!newsMatters[matter.name]) {
                                                            newsMatters[matter.name] = {
                                                                terceira: Number(ev.target.value)
                                                            }
                                                            setMatters({
                                                                ...newsMatters
                                                            })
                                                        } else {
                                                            newsMatters[matter.name] = {
                                                                ...newsMatters[matter.name],
                                                                terceira: Number(ev.target.value)
                                                            }
                                                            setMatters({
                                                                ...newsMatters
                                                            })
                                                        }
                                                    }
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={matters[matter.name] ? Number(matters[matter.name].quarta) ? Number(matters[matter.name].quarta) : 0 : 0}
                                                onChange={ev => {
                                                    if (0 <= Number(ev.target.value) <= 10) {
                                                        let newsMatters = matters

                                                        if (!newsMatters[matter.name]) {
                                                            newsMatters[matter.name] = {
                                                                quarta: Number(ev.target.value)
                                                            }
                                                            setMatters({
                                                                ...newsMatters
                                                            })
                                                        } else {
                                                            newsMatters[matter.name] = {
                                                                ...newsMatters[matter.name],
                                                                quarta: Number(ev.target.value)
                                                            }
                                                            setMatters({
                                                                ...newsMatters
                                                            })
                                                        }
                                                    }
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableBoletim>
                    </>}
                </ContainerBoletim>
                {aluno && (
                    <ButtonSubmit
                        disabled={!edit && true}
                        onClick={() => {
                            api.post('/alunos/matters', {
                                id: aluno,
                                matters
                            }).then()
                            router.push('/administrativo/alunos')
                        }}
                    >
                        Editar boletim
                    </ButtonSubmit>
                )}
            </Container>
        </>
    )
}

export const getServerSideProps = async ctx => {
    const { [process.env.NEXT_STATIC_NAME_COOKIE_PROFESSORAS]:tokenProf } = nookies.get(ctx)
    const { [process.env.NEXT_STATIC_NAME_COOKIE_ADMINISTRATIVO]:tokenAdmin } = nookies.get(ctx)

    if (tokenAdmin || tokenAdmin) {
      return {
        props: {}
      }
    } else if (!tokenAdmin && !tokenProf) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
}