import s from "@/styles/Dsgvo.module.css"

interface Dsgvo_chapter{
    title: string;
    content: string;
}

interface Dsgvo{
    imprint: string;
    chapter: Dsgvo_chapter[];
    source: string;
    modified: number;
    _mby: string
    _created: number;
    _state: number;
    _cby: string;
    _id: string;
}

interface DatenschutzProps{
    dsgvo: Dsgvo[]
}

export default function Datenschutz({dsgvo}:DatenschutzProps){
    return(
        <main className="main">
            <section className="section">
                <h1 className="title">Datenschutzerklärung</h1>
                <div className={s.container}>
                    {dsgvo[0].chapter.map((item, index) =>{
                        return(
                            <div className={s.item} key={`${item.title}_${index}`}>
                                <h3>{item.title}</h3>
                                <div className={s.text} dangerouslySetInnerHTML={{__html: item.content}}></div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}

export async function getStaticProps(){

    // the key is read-only so don't bother
    const getInfos: Response = await fetch(
      'https://cms.mrweber.ch/api/content/items/dsgvo?populate=100',
      {
        headers: {
          'api-key': `${process.env.COCKPIT}`,
        },
      }
    )
    
    const dsgvo:Dsgvo[] = await getInfos.json()
  
return{
    props:{
        dsgvo
    }, revalidate: 10
}
}
