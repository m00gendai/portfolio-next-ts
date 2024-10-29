
import SplashText from "@/components/SplashText";
import s from "../styles/Home.module.css"
import { pageMetadata } from "@/utils";
  
export async function generateMetadata(){
    return pageMetadata("Home")
}

export default async function Home(){
    const background:React.CSSProperties = {
        backgroundImage: `url("/laptop-ga99e6e23c_1920.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    }
    
    const ctaText: string = `Überzeugen Sie sich von meinem <a href="/portfolio" title="zum Portfolio">Portfolio</a> und <a href="/kontakt" title="zum Kontaktformular">kontaktieren</a> Sie mich!`
    
    return(
        <main className="homeMain">
            <section className="homeSection" style={background}>
                <SplashText />
            </section>
        </main>
    )
}