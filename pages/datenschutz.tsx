import Header from "@/components/Header";
import s from "@/styles/Dsgvo.module.css"
import { NextRouter, useRouter } from "next/router";

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

interface DatenschutzProps{
    dsgvo: Dsgvo[];
    taglines: tagline[];
}

export default function Datenschutz({dsgvo, taglines}:DatenschutzProps){
  const router: NextRouter = useRouter()
  const path:string = `https://www.mrweber.ch${router.pathname}`
  const page: string = router.asPath.replace("/", "").toUpperCase() === "" ? "HOME" : router.asPath.replace("/", "").toUpperCase()

  const tag = taglines.filter(tagline=>{
    return tagline.page.toUpperCase() === page
  })
    
    const data: Dsgvo[] = dsgvo.filter(id =>{
      return id._id === "a4a3140f61356473710002e5"
    })

    return (
      <>
      <Header
        title={`${tag[0].title}`}
        content={tag[0].description}
        url={path}
        image={""}
      />
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
        </>
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

    const getTaglines: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/taglines',
        {
          headers: {
            'api-key': `${process.env.COCKPIT}`,
          },
        }
      )
    
      const taglines:tagline[] = await getTaglines.json()
  
return{
    props:{
        dsgvo, taglines
    }, revalidate: 10
}
}
