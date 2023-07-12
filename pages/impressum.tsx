import Header from "@/components/Header";
import s from "@/styles/Impressum.module.css"
import Link from "next/link"
import { NextRouter, useRouter } from "next/router";

interface Imprint_tile{
    title: string;
    address: string;
    url: string;
    _model: string;
    _id: string;
}

interface Imprint_field{
    title: string;
    content: string;
}

interface Imprint{
    tiles: Imprint_tile[];
    field: Imprint_field[];
    _modified: number;
    _mby: string;
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

interface ImprintProps{
    imprint:Imprint[];
    taglines: tagline[];
}

export default function Impressum({imprint, taglines}:ImprintProps){
    const router: NextRouter = useRouter()
  const path:string = `https://www.mrweber.ch${router.pathname}`
  const page: string = router.asPath.replace("/", "").toUpperCase() === "" ? "HOME" : router.asPath.replace("/", "").toUpperCase()

  const tag = taglines.filter(tagline=>{
    return tagline.page.toUpperCase() === page
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
        </>
    )
}

export async function getStaticProps(){

    // the key is read-only so don't bother
    const getProjects: Response = await fetch(
      'https://cms.mrweber.ch/api/content/items/imprint?populate=100',
      {
        headers: {
          'api-key': `${process.env.COCKPIT}`,
        },
      }
    )
    
    const imprint:Imprint[] = await getProjects.json()

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
        imprint, taglines
    }, revalidate: 10
}
}