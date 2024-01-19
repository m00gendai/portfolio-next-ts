
import SplashText from "@/components/SplashText";
import s from "../styles/Home.module.css"

interface tagline{
    page: string;
    title: string;
    description: string;
    _modified: number;
    _mby: string;
    _created: number;
    _state: number;
    _cby: string;
    _id: string;
  }
  
interface Props{
   params:{
    slug: string
   }
}

  export async function generateMetadata({params}:Props){
    const page:string = params.slug
      const getTaglines: Response = await fetch(
            `https://cms.mrweber.ch/api/content/item/taglines?filter=%7Bpage%3A%22${page === "" ? "Home" : page}%22%7D&populate=1`,
            {
              headers: {
                'api-key': `${process.env.COCKPIT}`,
              },
            }
          )
          
          const taglines:tagline = await getTaglines.json()
          return {
            title: taglines.title,
            description: taglines.description,
            openGraph: {
                title: taglines.title,
                description: taglines.description,
                images: [
                    {
                        url: taglines.page,
                    }
                ]
            }
          }
        }

export default async function Home({params}:Props){

       
    
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