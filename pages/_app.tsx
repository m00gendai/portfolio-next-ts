import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import s from "@/styles/footer.module.css"
import c from "@/styles/Cookie.module.css"
import type { AppProps } from 'next/app'
import { useMediaQuery } from '@react-hook/media-query'
import Link from "next/link"
import {SiGithub, SiStackblitz, SiLinkedin, SiSololearn} from "react-icons/si"
import React from 'react'
import Navbar_Mobile from '@/components/Navbar_Mobile'
import { NextRouter, useRouter } from 'next/router'
import Header from '@/components/Header'
import {CookieConsent, getCookieConsentValue} from "react-cookie-consent";
import { useState, useEffect} from "react"
import * as ReactGA from "react-ga";


interface content{
  page: string;
  line: string;
}

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      handleAcceptCookie();
    }
  }, []);

  const initGA = (id: string) => {
      ReactGA.initialize(id);
  };
  

  const isMobile:boolean = useMediaQuery('only screen and (max-aspect-ratio: 13/9)')
  const date: Date = new Date()
  const currentYear:number = date.getFullYear()

  const handleAcceptCookie = () => {
      initGA(`${process.env.NEXT_PUBLIC_GA}`)
  };

  const iconStyle: React.CSSProperties = {
    background: "white",
    fontSize: "2rem",
    padding: "0.5rem",
    borderRadius: "1rem",
    color: "black",
    margin: "0 0.5rem"
  }

  const router: NextRouter = useRouter()
  const path:string = `https://www.mrweber.ch${router.pathname}`
  const page: string = router.asPath.replace("/", "").toUpperCase() === "" ? "HOME" : router.asPath.replace("/", "").toUpperCase()

  const contentBag:content[] = [
    {
      page: "HOME",
      line: "Ihre neue Webseite aus dem Schaffhauser Klettgau"
    },
    {
      page: "PORTFOLIO",
      line: "Eine Übersicht meiner Projekte"
    },
    {
      page: "ANGEBOTE",
      line: "Meine Webseiten-Angebote"
    },
    {
      page: "INFORMATIONEN",
      line: "Über mich, meine Fähigkeiten und die Technik"
    },
    {
      page: "KONTAKT",
      line: "Kontaktieren Sie mich unverbindlich!"
    },
    {
      page: "IMPRESSUM",
      line: "Impressum"
    },
    {
      page: "DATENSCHUTZ",
      line: "Datenschutzerklärung"
    },
    {
      page: "404",
      line: "ERROR ERROR ERROR"
    },
  ]

  const tag:content[] = contentBag.filter(entry=>{
    return entry.page === page
  })

  return (
  <>
  <Header
      title={`mrweber ${page}`}
      content={tag[0] ? tag[0].line : "Error"}
      url={path}
      image={""}
    />
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
    <nav className={s.nav}>
      <Link className={`${s.link} ${s.left}`} href="/impressum">Impressum</Link>
      <Link className={`${s.link} ${s.right}`} href="/datenschutz">Datenschutzerklärung</Link>
    </nav>
  </footer>
  <CookieConsent
  location="bottom"
  buttonText="Okay!"
  cookieName="mrwebersYummyCookie"
  style={{background: "black"}}
  containerClasses={c.bar}
  contentClasses={c.inner}
  buttonWrapperClasses={c.buttons}
  buttonClasses={c.accept}
  declineButtonClasses={c.decline}
  enableDeclineButton
  declineButtonText="Nein!"
  onAccept={handleAcceptCookie}
  disableStyles
  disableButtonStyles
>
  Diese Webseite nutzt Cookies! <Link className={`${s.link} ${s.left}`} href="/impressum">Impressum</Link>
      <Link className={`${s.link} ${s.right}`} href="/datenschutz">Datenschutzerklärung</Link>{" "}
</CookieConsent>
  </>
  )
}
