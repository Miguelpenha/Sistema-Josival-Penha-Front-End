import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import api from '../services/api/base'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => sheet.collectStyles(<App {...props}/>)
            })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        } finally {
            sheet.seal()
        }
    }
    
    render () {
        return (
            <Html lang="pt-br">
                <Head>
                    <meta charSet="utf-8"/>
                    {/* Google Font */}
                    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet"/>
                    {/* Favicons */}
                    <link rel="shortcut icon" href="/Favicons/favicon.png" type="image/x-icon"/>
                    <link rel="icon" href="/Favicons/favicon_32.png" sizes="32x32"/>
                    <link rel="icon" href="/Favicons/favicon_48.ico" sizes="48x48"/>
                    <link rel="icon" href="/Favicons/favicon_96.png" sizes="96x96"/>
                    <link rel="icon" href="/Favicons/favicon_144.png" sizes="144x144"/>
                    {/* Google Material Icons */}
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}