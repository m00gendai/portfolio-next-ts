import { Imprint } from "../../interfaces";
import s from "@/styles/Impressum.module.css"
import { pageMetadata } from "@/utils";
import Link from "next/link"

export async function generateMetadata(){
    return pageMetadata("Impressum")
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