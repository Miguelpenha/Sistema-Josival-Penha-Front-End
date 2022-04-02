import { memo, useState } from 'react'
import { useRouter }  from 'next/router'
import { get } from '../../../../hooks'
import Head from 'next/head'
import { FormContainer, FormAccess, InputFormFinanceiro, ButtonFormFinanceiro, Container, ContainerIconBack, IconBack } from '../../../../styles/pages/administrativo/financeiro/date'
import Link from 'next/link'
import ResumeFinanceiro from '../../../../components/ResumeFinanceiro'
import api from '../../../../services/api/base'
import { IconButton, InputAdornment, Alert } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon, Lock as LockIcon } from '@material-ui/icons'
import { useForm } from 'react-hook-form'

export default function Date() {
    const [veri, setVeri] = useState(false)
    const { register, handleSubmit } = useForm()
    const { date: dateBruta } = useRouter().query
    const date = dateBruta && dateBruta.replace(/-/g, '/')
    const { data: receitasDespesas, mutate: mutateReceitasDespesas } = get(`/financeiro/date/${dateBruta}`)

    function Verification({ children }) {
        const [error, setError] = useState(false)

        async function submit(data, ev) {
            const { senha } = data
            ev.preventDefault()
            const authorized = (await api.post('financeiro/verify', {
                password: senha
            })).data.authorized
            
            if (authorized) {
                setError(false)
                setVeri(true)
            } else {
                setError(true)
            }
        }
        
        if (veri) {
            return children
        } else {
            return (
                <FormContainer>
                    <Link href="/administrativo/alunos">
                        <IconButton component="a" sx={{justifySelf: 'flex-start', width: 'fit-content', margin: '1%'}}>
                            <ArrowBackIcon sx={{color: '#0872FC', fontSize: '3vw'}}/>
                        </IconButton>
                    </Link>
                    <FormAccess onSubmit={handleSubmit(submit)}>
                        <InputFormFinanceiro
                            autoFocus
                            required
                            id="senha"
                            {...register('senha')}
                            name="senha"
                            type="password"
                            error={error}
                            variant="standard"
                            placeholder="Senha de acesso financeiro"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{color: error ? '#F06360' : '#0872FC'}} fontSize="large"/>
                                    </InputAdornment>
                                )
                                }}
                        />
                        {error && <Alert variant="standard" severity="error" sx={{fontSize: '1vw', width: 'fit-content', borderRadius: '10px', alignSelf: 'flex-start', marginLeft: '15%'}}>Senha incorreta</Alert>}
                        <ButtonFormFinanceiro type="submit" variant="contained">Entrar</ButtonFormFinanceiro>
                    </FormAccess>
                </FormContainer>
            )
        }
    }
    
    const VerificationMemo = memo(Verification)
    
    return (
        <VerificationMemo>
            <Head>
                <title>Financeiro do dia {date}</title>
            </Head>
            <Container>
                <Link href="/administrativo/financeiro" passHref>
                    <ContainerIconBack title="Voltar para a página do financeiro">
                        <IconBack xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </IconBack>
                    </ContainerIconBack>
                </Link>
                {receitasDespesas && receitasDespesas.receitas && receitasDespesas.despesas && (
                    <ResumeFinanceiro
                        resume
                        receitas={receitasDespesas.receitas}
                        despesas={receitasDespesas.despesas}
                        saldo={receitasDespesas.totals.saldo.total}
                        saldoReceitas={receitasDespesas.totals.receitas.total}
                        saldoDespesas={receitasDespesas.totals.despesas.total}
                        onDeleteReceita={id => (
                            api.delete(`/financeiro/receitas/${id}`).then(() => {
                                mutateReceitasDespesas(`/financeiro/date/${dateBruta && dateBruta}`)
                            })
                        )}
                        onDeleteDespesa={id => (
                            api.delete(`/financeiro/despesas/${id}`).then(() => {
                                mutateReceitasDespesas(`/financeiro/date/${dateBruta && dateBruta}`)
                            })
                        )}
                    />
                )}
            </Container>
        </VerificationMemo>
    )
}