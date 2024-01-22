import { pageMetadata } from "@/utils";
import { Dsgvo } from "../../interfaces";
import s from "@/styles/Dsgvo.module.css"

export async function generateMetadata(){
    return pageMetadata("Datenschutz")
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