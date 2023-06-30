import * as React from 'react';
import s from "../styles/Informationen.module.css"
import t from "../styles/TechStack.module.css"
import TechStack from '@/components/TechStack';

interface Information{
    title: string;
    text: string;
    _modified: number;
    _mby: string;
    _created: number;
    _state: number;
    _cby: string;
    _id: string;
}

interface TechStack_image{
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
interface TechStack{
    brand: string;
    url: string;
    excerpt: string;
    image: TechStack_image;
    Bildquelle: string;
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
}

export default function Informationen({infos, tech}:InfoProps) {

  return (
    <main className="main">
      <section className="section">
        <h1 className="title">Informationen</h1>
        {
            infos.map(info=>{
                return(
                    <div className={s.container} key={info._id}>
                    <h2 className={s.title}>{info.title}</h2>
                    <div className={s.text} dangerouslySetInnerHTML={{__html: info.text}}></div>
                    {info.title === "Die Technik" ? 
                        <div className={t.container}>
                            {tech.map((stack, index)=>{
                                return <TechStack tech={stack} key={stack._id}/>})} 
                        </div> : null}
                    </div>
                )
            })
        }
      </section>
    </main>
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
      
    return{
        props:{
            infos, tech
        }, revalidate: 10
    }
}
