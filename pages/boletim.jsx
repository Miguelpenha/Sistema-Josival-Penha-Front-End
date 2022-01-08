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
    TitleTableBoletim,
    TitleTableBoletimOpções,
    IconReloadTitleTableBoletim,
    HeaderTableBoletim,
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
    let [mattersOriginal, setMattersOriginal] = useState('')
    const router = useRouter()
    
    useEffect(() => {
        if (aluno) {
            alunos.map(alunoMap => {
                if (alunoMap.id === aluno) {
                    setMatters(alunoMap.matérias)
                    setMattersOriginal(JSON.stringify(alunoMap.matérias))
                }
            })
        }
    }, [aluno])

    useEffect(() => {
        if (aluno && matters) {
            if (mattersOriginal !== JSON.stringify(matters)) {
                setEdit(true)
            } else {
                setEdit(false)
            }
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
                                    <TitleTableBoletimOpções colSpan="5">
                                        <IconReloadTitleTableBoletim onClick={() => {
                                            let newsMatters = matters
                                            
                                            namesMatters.map(name => 
                                                newsMatters[name.name] = {
                                                    primeira: 0,
                                                    segunda: 0,
                                                    terceira: 0,
                                                    quarta: 0
                                                }
                                            )

                                            setMatters({
                                                ...newsMatters
                                            })
                                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                        </IconReloadTitleTableBoletim>
                                        <IconReloadTitleTableBoletim onClick={() => {
                                            let newsMatters = matters
                                            
                                            namesMatters.map(name => 
                                                newsMatters[name.name] = {
                                                    primeira: 0,
                                                    segunda: 0,
                                                    terceira: 0,
                                                    quarta: 0
                                                }
                                            )

                                            setMatters({
                                                ...newsMatters
                                            })
                                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </IconReloadTitleTableBoletim>
                                    </TitleTableBoletimOpções>
                                </tr>
                                <tr>
                                    <TitleTableBoletim colSpan="5">Boletim</TitleTableBoletim>
                                </tr>
                                <HeaderTableBoletim>
                                    <th id="matters">Matérias</th>
                                    <th>1° unidade</th>
                                    <th>2° unidade</th>
                                    <th>3° unidade</th>
                                    <th>4° unidade</th>
                                </HeaderTableBoletim>
                            </thead>
                            <tbody>
                                {namesMatters.map((matter, index) => (
                                    <tr key={index}>
                                        <th className="matter">{matter.displayName}</th>
                                        <td>
                                            <input
                                                type="text"
                                                value={matters[matter.name] ? Number(matters[matter.name].primeira) ? Number(matters[matter.name].primeira) : 0 : 0}
                                                onChange={ev => {
                                                    if (Number(ev.target.value) <= 10 && Number(ev.target.value) >= 0) {
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
                                                type="text"
                                                value={matters[matter.name] ? Number(matters[matter.name].segunda) ? Number(matters[matter.name].segunda) : 0 : 0}
                                                onChange={ev => {
                                                    if (Number(ev.target.value) <= 10 && Number(ev.target.value) >= 0) {
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
                                                type="text"
                                                value={matters[matter.name] ? Number(matters[matter.name].terceira) ? Number(matters[matter.name].terceira) : 0 : 0}
                                                onChange={ev => {
                                                    if (Number(ev.target.value) <= 10 && Number(ev.target.value) >= 0) {
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
                                                type="text"
                                                value={matters[matter.name] ? Number(matters[matter.name].quarta) ? Number(matters[matter.name].quarta) : 0 : 0}
                                                onChange={ev => {
                                                    if (Number(ev.target.value) <= 10 && Number(ev.target.value) >= 0) {
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