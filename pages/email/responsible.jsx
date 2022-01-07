import { get } from '../../hooks'
import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
    Container,
    ContainerIconBack,
    IconBack,
    ContainerEmail,
    ContainerAlunoSelect,
    LabelAlunoSelect,
    AlunoSelect,
    TextEmail,
    ContainerLinks,
    TitleLinks,
    ContainerLink,
    InputLink,
    IconAddLink,
    IconRemoveLink,
    ButtonSubmit
} from '../../styles/pages/email/responsible'
import Link from 'next/link'
import { MenuItem } from '@material-ui/core'
import api from '../../services/api/base'
import nookies from 'nookies'

export default function Responsible() {
    const { data: alunos } = get('/alunos')
    const [aluno, setAluno] = useState('')
    const [textEmail, setTextEmail] = useState('')
    let [links, setLinks] = useState([{
        id: uuid(),
        link: '',
        add: true,
        focus: false
    }])
    const router = useRouter()

    useEffect(() => aluno && window.document.getElementById('email').focus(), [aluno])

    useEffect(() => links.map(link => link.focus && window.document.getElementById('link-'+link.id).focus()), [links])

    return (
        <>
            <Head>
                <title>E-mail responsável</title>
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
                <ContainerEmail aluno={aluno}>
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
                            {alunos && alunos.map((aluno, index) => aluno.email && 
                                <MenuItem key={index} value={aluno.id}>{aluno.nome} ({aluno.email})</MenuItem>
                            )}
                        </AlunoSelect>
                    </ContainerAlunoSelect>
                    {aluno && <>
                        <TextEmail
                            rows="7"
                            id="email"
                            spellCheck="true"
                            value={textEmail}
                            autoCorrect="true"
                            autoComplete="true"
                            placeholder="Digite o e-mail"
                            onChange={ev => setTextEmail(ev.target.value)}
                        />
                        <ContainerLinks>
                            <TitleLinks>Links</TitleLinks>
                            {links.map((link, index) => (
                                <ContainerLink key={index}>
                                    <InputLink
                                        id={'link-'+link.id}
                                        type="url"
                                        key={index}
                                        value={link.link}
                                        spellCheck="false"
                                        onChange={ev => 
                                            setLinks(links.map(linkMap => 
                                                linkMap.id === link.id ? {
                                                    ...linkMap,
                                                    link: ev.target.value
                                                } : linkMap
                                            ))
                                        }
                                    />
                                    {link.add ? (
                                        <IconAddLink 
                                            viewBox="0 0 16 16"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => {
                                                let linksNews = links
                                                const idProx = uuid()
                                                linksNews.push({
                                                    id: idProx,
                                                    link: '',
                                                    add: true,
                                                    focus: true
                                                })
                                                
                                                setLinks(links.map(linkMap => linkMap.id === link.id ? {
                                                    ...linkMap,
                                                    add: false,
                                                    focus: false
                                                } : linkMap))
                                            }}
                                        >
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </IconAddLink>
                                    ) : (
                                        <IconRemoveLink
                                            viewBox="0 0 16 16"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => {
                                                let linksNews = []
                                                links.map(linkMap => link.id !== linkMap.id && linksNews.push(linkMap))

                                                setLinks(linksNews.map(link => link))
                                            }}
                                        >
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </IconRemoveLink>
                                    )}
                                </ContainerLink>
                            ))}
                        </ContainerLinks>
                    </>}
                </ContainerEmail>
                {aluno && (
                    <ButtonSubmit
                        disabled={!textEmail && true}
                        onClick={() => {
                            api.post('/emails/responsible', { id: aluno, msg: textEmail, attachments: links.length === 1 && links[0].link === '' ? [] : [...links.map(link => link.link)]}).then()
                            router.push('/administrativo/alunos')
                        }}
                    >
                        Enviar E-mail
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