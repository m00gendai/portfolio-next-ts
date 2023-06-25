import Link from "next/link"
import s from "@/styles/Navbar_Mobile.module.css"
import {GiHamburger, GiKnifeFork} from "react-icons/gi"
import {useState} from "react"

export default function Navbar_Mobile(){

    const [open, setOpen] = useState<boolean>(false)

    function handleClick(){
        setOpen(!open)
    }

    return (
        <nav className={s.nav}>
            {open ? <GiKnifeFork
                style={{margin: "0 1rem 0 0", fontSize: "2rem", color: "cyan"}}
                onClick={()=>handleClick()}/>
            :
            <GiHamburger 
                style={{margin: "0 1rem 0 0", fontSize: "2rem", color: "deeppink"}}
                onClick={()=>handleClick()}/>
            }
            {open ? <div className={s.inner}>
                <Link className={s.link} href= "/">Home</Link>
                <Link className={s.link} href= "/portfolio">Portfolio</Link>
                <Link className={s.link} href= "/angebote">Angebote</Link>
                <Link className={s.link} href= "/informationen">Informationen</Link>
                <Link className={s.link} href= "/kontakt">Kontakt</Link>
            </div>
            :
            null}
        </nav>
    )
}