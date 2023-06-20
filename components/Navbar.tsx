import s from "../styles/Navbar.module.css"
import Link from "next/link"

export default function Navbar(){
    return(
        <nav className={s.nav}>
            <div className={s.inner}>
                <Link className={s.link} href= "/">Home</Link>
                <Link className={s.link} href= "/portfolio">Portfolio</Link>
                <Link className={s.link} href= "/angebote">Angebote</Link>
                <Link className={s.link} href= "/informationen">Informationen</Link>
                <Link className={s.link} href= "/kontakt">Kontakt</Link>
            </div>
        </nav>
    )
}