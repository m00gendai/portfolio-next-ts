import s from "../../styles/Informationen.module.css"
import t from "../../styles/TechStack.module.css"
import TechStack from '@/components/TechStack';
import Divider from '@/components/Divider';
import { Information, Metadata, Stack } from "@/interfaces";
import React from "react";
import ParallaxImage from "@/components/ParallaxImage";
  
interface Props{
    params:{
        slug: string
    }
}

export async function generateMetadata({params}:Props){
    const pageName:string = params.slug
    const getMetadata: Response = await fetch(
        `https://cms.mrweber.ch/api/content/item/taglines?filter=%7Bpage%3A%22${"Informationen"}%22%7D&populate=1`,
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
                <h1 className="title">Informationen</h1>
                {infos.map((info, index)=>{
                    return(
                        <React.Fragment key={`section_${info._id}`}>
                            <div className={s.container} key={info._id}>
                                <h2 className={s.title} key={`title_${info._id}`}>{info.title}</h2>
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