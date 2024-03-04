"use client"

import setThatCookie from "@/app/actions/cookieSet"
import s from "./CookieBanner.module.css"
import Link from "next/link"

interface Props{
    analyticsCookie:string
}

function accept(analyticsCookie:string){
    setThatCookie("analyticsAllowed", "true")
}

function refuse(analyticsCookie:string){
    setThatCookie("analyticsAllowed", "false")
}

export default function CookieBanner({analyticsCookie}:Props){
    return(
        <aside className={s.banner}>
            <div className={s.inner}>
                <div className={s.text}>
                    <p>{`Wir nutzen Cookies zur Analyse von Nutzerverhalten. Erst durch Akzeptieren werden diese gesetzt. Akzeptierte Cookies können jederzeit widerrufen werden. Details im Datenschutzbereich.`}</p>
                </div>
                <div className={s.action}>
                    <button title="Cookies ablehnen" className={`${s.button} ${s.reject}`} onClick={()=>refuse(analyticsCookie)}>Ablehnen</button>
                    <Link title="Datenschutzbereich" className={`${s.button} ${s.dsgvo}`} href="/datenschutz">Datenschutz</Link>
                    <button title="Cookies akzeptieren" className={`${s.button} ${s.accept}`} onClick={()=>accept(analyticsCookie)}>Akzeptieren</button>
                </div>
            </div>
        </aside>
    )
}