"use client"

import Link from "next/link"
import s from "@/styles/Navbar_Mobile.module.css"
import {GiHamburger, GiKnifeFork} from "react-icons/gi"
import {useState} from "react"

export default function Navbar_Mobile(){

    const [open, setOpen] = useState<boolean>(false)

    function handleClick(){
        setOpen(!open)
    }

    function handleLink(){
            setOpen(!open)

    }

    return (
        <nav className={s.nav}>
            <div className={s.container}>
                <span className={s.tagline}>mrweber Webdesign</span>
                <div className={s.togglor}>
                    {open ? <GiKnifeFork
                        style={{fontSize: "2rem", color: "cyan"}}
                        onClick={()=>handleClick()}
                        className={s.icon}/>
                    :
                    <GiHamburger 
                        style={{fontSize: "2rem", color: "magenta"}}
                        onClick={()=>handleClick()}
                        className={s.icon}/>
                    }
                </div>
            </div>
            {open ? <div className={s.inner}>
                <Link className={s.link} onClick={()=>handleLink()} href= "/">Home</Link>
                <Link className={s.link} onClick={()=>handleLink()} href= "/portfolio">Portfolio</Link>
                <Link className={s.link} onClick={()=>handleLink()} href= "/angebote">Angebote</Link>
                <Link className={s.link} onClick={()=>handleLink()} href= "/informationen">Informationen</Link>
                <Link className={s.link} onClick={()=>handleLink()} href= "/artikel">Artikel</Link>
                <Link className={s.link} onClick={()=>handleLink()} href= "/kontakt">Kontakt</Link>
            </div>
            :
            null}
        </nav>
    )
}