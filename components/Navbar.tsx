import s from "../styles/Navbar.module.css"
import Link from "next/link"

export default function Navbar(){
    return(
        <nav className={s.nav}>
            <div className={s.inner}>
                <Link className={s.link} href= "/" title="Home">Home</Link>
                <Link className={s.link} href= "/portfolio" title="Portfolio">Portfolio</Link>
                <Link className={s.link} href= "/angebote" title="Angebote">Angebote</Link>
                <Link className={s.link} href= "/informationen" title="Informationen">Informationen</Link>
                <Link className={s.link} href= "/kontakt" title="Kontakt">Kontakt</Link>
            </div>
        </nav>
    )
}