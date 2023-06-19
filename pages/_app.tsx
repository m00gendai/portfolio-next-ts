import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useMediaQuery } from '@react-hook/media-query'

export default function App({ Component, pageProps }: AppProps) {

  const isMobile:boolean = useMediaQuery('only screen and (max-aspect-ratio: 13/9)')

  return (
  <>
  <Navbar />
  <Component {...pageProps} isMobile={isMobile}/>
  </>
  )
}
