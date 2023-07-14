import * as React from 'react';
import s from "../styles/Informationen.module.css"
import t from "../styles/TechStack.module.css"
import TechStack from '@/components/TechStack';
import { NextRouter, useRouter } from 'next/router';
import Header from '@/components/Header';
import Image from "next/image"

interface Asset{
  path: string;
  title: string;
  mime: string;
  type: string;
  description: string;
  tags: string[];
  size: number;
  colors: string[];
  width: number;
  height: number;
  _hash: string;
  _created: number;
  _modified: number;
  _cby: string;
  folder: string;
  _id: string;
}

interface Content{
text: string;
asset: Asset[];
}

interface Information{
    title: string;
    text: string;
    content: Content[];
    _modified: number;
    _mby: string;
    _created: number;
    _state: number;
    _cby: string;
    _id: string;
}

interface TechStack{
    brand: string;
    url: string;
    excerpt: string;
    image: Asset;
    Bildquelle: string;
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

interface InfoProps{
    infos: Information[];
    tech: TechStack[];
    taglines: tagline[];
}

export default function Informationen({infos, tech, taglines}:InfoProps) {
  
  const router: NextRouter = useRouter()
  const path:string = `https://www.mrweber.ch${router.pathname}`
  const page: string = router.asPath.replace("/", "").toUpperCase() === "" ? "HOME" : router.asPath.replace("/", "").toUpperCase()

  const techSorted: TechStack[] = tech.sort((a,b)=>{
    const x: string = a.brand.toLowerCase()
    const y: string = b.brand.toLowerCase()
    return x > y ? 1 : x < y ? -1 : 0
  })

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
        <h1 className="title">Informationen</h1>
        {
            infos.map(info=>{
                return(
                    <div className={s.container} key={info._id}>
                    <h2 className={s.title}>{info.title}</h2>
                    {info.content?.map(content=>{
                      return (
                      <>
                        <div className={s.text} dangerouslySetInnerHTML={{__html: content.text}}></div>
                        {content.asset?.map(asset=>{
                          return (
                            <div className="imageSpan"
                              style={{
                                backgroundImage: `url("https://cms.mrweber.ch/storage/uploads/${asset.path}")`
                              }}
                            >
                            </div>
                          )
                        })}
                      </>)
                    })}
                   
                    {info.title === "Die Technik" ? 
                        <div className={t.container}>
                            {techSorted.map((stack, index)=>{
                                return <TechStack tech={stack} key={stack._id}/>})} 
                        </div> : null}
                    </div>
                )
            })
        }
      </section>
    </main>
    </>
  );
}


export async function getStaticProps(){

        // the key is read-only so don't bother
        const getInfos: Response = await fetch(
          'https://cms.mrweber.ch/api/content/items/about?populate=100',
          {
            headers: {
              'api-key': `${process.env.COCKPIT}`,
            },
          }
        )
        
        const infos:Information[] = await getInfos.json()

        const getTech: Response = await fetch(
            'https://cms.mrweber.ch/api/content/items/tech?populate=100',
            {
              headers: {
                'api-key': `${process.env.COCKPIT}`,
              },
            }
          )
          
          const tech:TechStack[] = await getTech.json()

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
            infos, tech, taglines
        }, revalidate: 10
    }
}
