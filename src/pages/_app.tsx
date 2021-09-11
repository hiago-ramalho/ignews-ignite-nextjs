//_app.js é um component que sempre vai ficar por volta de todas as páginas
//quando acessamos uma página, na verdade estamos acessando o _app.js, e esse componente mostra a página
//o "Component" é a página que estamos acessando
//se quisermos que algo repita e todas as páginas, devemos colocar aqui

//toda vez q o usuário troca de tela, o _app.js é recarregado
import { AppProps } from 'next/app'
import { Header } from '../components/Header'

import '../styles/global.scss'
{
  /*todo estilo global deve estar dentro do _app.js */
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
