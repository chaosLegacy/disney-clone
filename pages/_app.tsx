import '../styles/globals.scss'
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
