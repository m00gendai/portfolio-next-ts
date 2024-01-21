import { Imprint, Metadata } from "../../interfaces";
import s from "@/styles/Impressum.module.css"
import Link from "next/link"

interface Props{
    params:{
        slug: string
    }
}

export async function generateMetadata({params}:Props){
    const pageName:string = params.slug
    const getMetadata: Response = await fetch(
        `https://cms.mrweber.ch/api/content/item/taglines?filter=%7Bpage%3A%22${"Impressum"}%22%7D&populate=1`,
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

async function getImprintTiles(){
    const getImprintTiles: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/imprint?populate=100',
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
      )
      
      const imprint:Imprint[] = await getImprintTiles.json()
      return imprint
}

export default async function Kontakt(){

    const imprint: Imprint[] = await getImprintTiles()

    return(
        <main className="main">
            <section className="section">
                <h1 className="title">Impressum</h1>
                <div className={s.tileContainer}> 
                    {imprint[0].tiles.map(tile=>{
                        return (
                            <div className={s.tile} key={tile._id}>
                                <h3 className={s.title}>{tile.title}</h3>
                                <div className={s.text} dangerouslySetInnerHTML={{__html:tile.address}}></div>
                                <Link className={s.link} href={tile.url} target="_blank">{tile.url}</Link>
                            </div>
                        )
                    })}
                </div>
                <div className={s.contentContainer}>
                    {imprint[0].field.map(fld =>{
                        return (
                            <div className={s.field} key={fld.title}>
                                <h3 className={s.title}>{fld.title}</h3>
                                <div className={s.text} dangerouslySetInnerHTML={{__html: fld.content}}></div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}