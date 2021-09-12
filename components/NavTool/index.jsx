import { Container, LogoJP, ContainerTools, LinkIcons, IconQuery, IconHome } from './style'
import Link from 'next/link'

export default function NavTool() {
    return (
        <Container>
            <LogoJP/>
            <ContainerTools>
                <Link href="query">
                    <LinkIcons spacing="true">
                        <IconQuery/>
                    </LinkIcons>
                </Link>
                <Link href="/professoras">
                    <LinkIcons>
                        <IconHome/>
                    </LinkIcons>
                </Link>
            </ContainerTools>
        </Container>
    )
}