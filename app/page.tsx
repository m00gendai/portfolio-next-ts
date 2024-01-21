
import SplashText from "@/components/SplashText";
import s from "../styles/Home.module.css"
import { Metadata } from "@/interfaces";
  
interface Props{
    params:{
        slug: string
    }
}

export async function generateMetadata({params}:Props){
    const pageName:string = params.slug
    const getMetadata: Response = await fetch(
        `https://cms.mrweber.ch/api/content/item/taglines?filter=%7Bpage%3A%22${pageName === undefined ? "Home" : pageName}%22%7D&populate=1`,
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
    )
    const metadata:Metadata = await getMetadata.json()

    return {
        title: metadata.title,
        description: metadata.description,
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            images: [
                {
                    url: `https://cms.mrweber.ch/storage/uploads/${metadata.image.path}`,
                }
            ]
        }
    }
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
            <span className={s.whackyWavingInflatableArmsFlailingTubeMan}>
                <p>{`Ansprechende Webseiten aus regionalem Anbau für Vereine, Organisationen, Persönlichkeiten, KMUs und vieles mehr.`}</p>
                <p>{`mrweber.ch ist nicht nur Webdesign, sondern auch Webentwicklung.` }</p>
                <p>{`Von WordPress über ClubDesk bis zur handgemachten Massarbeit mit JavaScript/TypeScript, React und Next.js.`}</p>
                <p dangerouslySetInnerHTML={{__html: ctaText}}></p>
            </span>
        </main>
    )
}