import { Dsgvo, Imprint, Metadata } from "../../interfaces";
import s from "@/styles/Dsgvo.module.css"

interface Props{
    params:{
        slug: string
    }
}

export async function generateMetadata({params}:Props){
    const pageName:string = params.slug
    const getMetadata: Response = await fetch(
        `https://cms.mrweber.ch/api/content/item/taglines?filter=%7Bpage%3A%22${"Datenschutz"}%22%7D&populate=1`,
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
                    url: metadata.image ? `https://cms.mrweber.ch/storage/uploads/${metadata.image.path}` : "",
                }
            ]
        }
    }
}

async function getDsgvo(){
    const getDsgvo: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/dsgvo?populate=100',
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
      )
      
      const dsgvo:Dsgvo[] = await getDsgvo.json()
      return dsgvo
}

export default async function Datenschutz(){

    const dsgvo = await getDsgvo()

    const data: Dsgvo[] = dsgvo.filter(id =>{
        return id._id === "a4a3140f61356473710002e5"
      })
      
    return (
        <main className="main">
            <section className="section">
                <h1 className="title">Daten<wbr/>schutz<wbr/>erklärung</h1>
                <div className={s.container}>
                    {data[0].chapter.map((item, index) =>{
                        return(
                            <div className={s.item} key={`${item.title}_${index}`}>
                                <h3 style={{wordBreak: "break-all"}}>{item.title}</h3>
                                <div className={s.text} dangerouslySetInnerHTML={{__html: item.content}}></div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}