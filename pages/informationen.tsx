import * as React from 'react';
import s from "../styles/Informationen.module.css"

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

interface InfoProps{
    infos: Information[];
}

export default function Informationen({infos}:InfoProps) {
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
              'api-key': 'API-773e67ee0ba102d8b93a74751560d8bdd07bd2cb',
            },
          }
        )
        
        const infos:Information[] = await getInfos.json()
      
    return{
        props:{
            infos
        }, revalidate: 10
    }
}
