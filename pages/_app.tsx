import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import s from "@/styles/footer.module.css"
import type { AppProps } from 'next/app'
import { useMediaQuery } from '@react-hook/media-query'
import Link from "next/link"
import {SiGithub, SiStackblitz, SiLinkedin, SiSololearn} from "react-icons/si"
import React from 'react'
import Navbar_Mobile from '@/components/Navbar_Mobile'

export default function App({ Component, pageProps }: AppProps) {

  const isMobile:boolean = useMediaQuery('only screen and (max-aspect-ratio: 13/9)')
  const date: Date = new Date()
  const currentYear:number = date.getFullYear()

  const iconStyle: React.CSSProperties = {
    background: "white",
    fontSize: "2rem",
    padding: "0.5rem",
    borderRadius: "1rem",
    color: "black",
    margin: "0 0.5rem"
  }

  return (
  <>
  {isMobile ? <Navbar_Mobile /> : <Navbar />}
  <Component {...pageProps} isMobile={isMobile}/>
  <footer className={s.footer}>
    <div className={s.inner}>
      {`© mrweber.ch 2023${currentYear > 2023 ? `-${currentYear}` : ""}`}
    </div>
    <div className={s.links}>
      <Link href="https://www.github.com/m00gendai" target="_blank"><SiGithub style={iconStyle}/></Link>
      <Link href="https://www.stackblitz.com/@m00gendai" target="_blank"><SiStackblitz style={iconStyle}/></Link>
      <Link href="https://www.linkedin.com/in/marcel-weber-3a05a61bb" target="_blank"><SiLinkedin style={iconStyle}/></Link>
      <Link href="https://www.sololearn.com/Profile/19722744" target="_blank"><SiSololearn style={iconStyle}/></Link>
    </div>
  </footer>
  </>
  )
}
