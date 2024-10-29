import s from "../../styles/Informationen.module.css"
import t from "../../styles/TechStack.module.css"
import TechStack from '@/components/TechStack';
import Divider from '@/components/Divider';
import { Information, Metadata, Stack } from "@/interfaces";
import React from "react";
import ParallaxImage from "@/components/ParallaxImage";
import { pageMetadata } from "@/utils";
  
export async function generateMetadata(){
    return pageMetadata("Informationen")
}

async function getInfos(){
    const getInfos: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/about?populate=100',
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
    )
      
    const infos:Information[] = await getInfos.json()
    return infos
}

async function getTech(){
    const getTech: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/tech?populate=100',
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
    )
      
    const tech:Stack[] = await getTech.json()
    return tech
}

export default async function Angebote(){

    const infos:Information[] = await getInfos()
    const tech:Stack[] = await getTech()

    const techSorted: Stack[] = tech.sort((a,b)=>{
        const x: string = a.brand.toLowerCase()
        const y: string = b.brand.toLowerCase()
        return x > y ? 1 : x < y ? -1 : 0
    })

    return(
        <main className="main">
            <section className="section">
                <h1 className="title">Über mich</h1>
                <div className={t.container}>
                                        {techSorted.map((stack, index)=>{
                                            return <TechStack tech={stack} key={stack._id}/>
                                        })} 
                                    </div>
                {infos.map((info, index)=>{
                    return(
                        <React.Fragment key={`section_${info._id}`}>
                            <div className={s.container} key={info._id}>
                       
                                {info.content?.map((content, index)=>{
                                    return (
                                        <React.Fragment key={`text_${index}`}>
                                            <div className={s.text} dangerouslySetInnerHTML={{__html: content.text}}></div>
                                            {content.asset?.map(asset=>{
                                                return (
                                                    <figure key={`image_${asset._id}`}>
                                                        <ParallaxImage path={asset.path} />
                                                        <figcaption dangerouslySetInnerHTML={{__html: asset.description}}></figcaption>
                                                    </figure> 
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                })} 
                                {info.title === "Die Technik" ? 
                                    <div className={t.container}>
                                        {techSorted.map((stack, index)=>{
                                            return <TechStack tech={stack} key={stack._id}/>
                                        })} 
                                    </div>
                                :
                                    null
                                }
                            </div>
                            {index+1 < infos.length ? 
                                <Divider key={`divider_${info._id}`}/> 
                            : 
                                null
                            }
                        </React.Fragment>
                    )
                })}
            </section>
        </main>
    )
}