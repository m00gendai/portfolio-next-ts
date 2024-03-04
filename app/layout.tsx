import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import s from "@/styles/footer.module.css"
import Link from "next/link"
import { SiGithub, SiStackblitz, SiLinkedin, SiSololearn, SiFacebook } from "react-icons/si"
import React from 'react'
import Navbar_Mobile from '@/components/Navbar_Mobile'
import { Providers } from './providers'
import CookieBanner from '@/components/Cookies/CookieBanner'
import { GoogleAnalytics } from "@next/third-parties/google"
import { cookies } from "next/headers"



export default function RootLayout({children}:{children: React.ReactNode}){

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

    const analyticsAllowed:string | undefined = cookies().get(`${process.env.COOKIE_ANALYTICS}`)?.value

    return(
        <html lang="de">
            <body>
  
  <Navbar_Mobile /> 
  <Navbar />
  <Providers>{children}</Providers>
  <footer className={s.footer}>
    <div className={s.inner}>
      {`© mrweber.ch 2023${currentYear > 2023 ? `-${currentYear}` : ""}`}
    </div>
    <div className={s.links}>
      <Link title="Github" href="https://www.github.com/m00gendai" target="_blank"><SiGithub style={iconStyle}/></Link>
      <Link title="Stackblitz" href="https://www.stackblitz.com/@m00gendai" target="_blank"><SiStackblitz style={iconStyle}/></Link>
      <Link title="LinkedIn" href="https://www.linkedin.com/in/marcel-weber-3a05a61bb" target="_blank"><SiLinkedin style={iconStyle}/></Link>
      <Link title="Facebook" href="https://www.facebook.com/profile.php?id=100094533625419" target="_blank"><SiFacebook style={iconStyle}/></Link>
      <Link title="Sololearn" href="https://www.sololearn.com/Profile/19722744" target="_blank"><SiSololearn style={iconStyle}/></Link>
    </div>
    <nav className={s.nav}>
      <Link title="Impressum" className={`${s.link} ${s.left}`} href="/impressum">Impressum</Link>
      <Link title="Datenschutzerklärung" className={`${s.link} ${s.right}`} href="/datenschutz">Datenschutzerklärung</Link>
    </nav>
  </footer>
  {analyticsAllowed === undefined ? <CookieBanner analyticsCookie={process.env.COOKIE_ANALYTICS ? process.env.COOKIE_ANALYTICS : ""}/> : null}
  {analyticsAllowed === "true" ? <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GA}`} /> : null}
  </body>
        </html>
    )
}