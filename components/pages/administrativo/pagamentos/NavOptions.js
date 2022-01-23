import {
    NavOptions as Container,
    LogoJPNome,
    Funções,
    Função,
    LinkFunção,
    IconAlunos,
    IconFinanceiro,
    IconPagamentosSele,
    IconAcadêmico,
    IconDashBoard,
    IconMarketing,
    IconColaboradores,
    TextFunção
} from '../../../NavTool'
import Link from 'next/link'

export default function NavOptions() {
    return (
        <Container>
            <LogoJPNome/>
            <Funções>
                <Função>
                <Link href="/administrativo/alunos" passHref>
                    <LinkFunção>
                        <IconAlunos/>
                        <TextFunção>Alunos</TextFunção>
                    </LinkFunção>
                </Link>
                </Função>
                <Função>
                <Link href="/administrativo/academico" passHref>
                    <LinkFunção>
                    <IconAcadêmico/>
                    <TextFunção>Acadêmico</TextFunção>
                    </LinkFunção>
                </Link>
                </Função>
                <Função>
                <Link href="/administrativo/dashboard" passHref>
                    <LinkFunção>
                    <IconDashBoard/>
                    <TextFunção>Dashboard</TextFunção>
                    </LinkFunção>
                </Link>
                </Função>
                <Função>
                <Link href="/administrativo/marketing" passHref>
                    <LinkFunção>
                    <IconMarketing/>
                    <TextFunção>Marketing</TextFunção>
                    </LinkFunção>
                </Link>
                </Função>
                <Função selected={true}>
                    <IconPagamentosSele/>
                    <TextFunção>Pagamentos</TextFunção>
                </Função>
                <Função>
                <Link href="/administrativo/financeiro" passHref>
                    <LinkFunção>
                    <IconFinanceiro/>
                    <TextFunção>Financeiro</TextFunção>
                    </LinkFunção>
                </Link>
                </Função>
                <Função>
                <Link href="/administrativo/colaboradores" passHref>
                    <LinkFunção>
                    <IconColaboradores/>
                    <TextFunção>Colaboradores</TextFunção>
                    </LinkFunção>
                </Link>
                </Função>
            </Funções>
        </Container>
    )
}