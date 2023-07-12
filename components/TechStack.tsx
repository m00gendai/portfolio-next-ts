import Link from "next/link";
import s from "../styles/TechStack.module.css"
import d from "../styles/dialog.module.css"
import { useRef, useState } from "react";
import { BiLinkExternal, BiXCircle } from "react-icons/bi";
import Image from "next/image"

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

interface TechProps{
    tech: TechStack;
}

export default function TechStack({tech}:TechProps){

    const dialog = useRef<HTMLDialogElement>(null);

    function handleOpen(){
        dialog.current?.showModal()
    }

    function handleClose(){
        dialog.current?.close()
    }

    const imageStyle:React.CSSProperties = {
        objectFit: "contain"
    }
      
    return(
        <div className={s.card}>
            <div 
                className={s.inner} 
                style={{backgroundImage: `url("https://cms.mrweber.ch/storage/uploads/${tech.image.path}")`,}}
                onClick={()=>handleOpen()}
            >
            </div>
            <dialog className={d.container} ref={dialog}>
                <div className={d.inner}>
                    <button className={d.button} onClick={()=>handleClose()}><BiXCircle /></button>
                    <h2 className={d.title}><Link className={d.link} href={tech.url} target="_blank" title={tech.brand}>{tech.brand}</Link><BiLinkExternal style={{margin: "0 0 0 0.5rem"}}/></h2>
                    <div className={d.grid}>
                        <Image 
                            className={d.image}
                            src={`https://cms.mrweber.ch/storage/uploads/${tech.image.path}`}
                            alt={tech.brand}
                            width={tech.image.width === null ? 240 : tech.image.width}
                            height={tech.image.height === null ? 240 : tech.image.height}
                            style={imageStyle}
                        >
                        </Image>
                        <div dangerouslySetInnerHTML={{__html: tech.excerpt}}>
                        </div>
                    </div>
                    <p className={d.notice}>Die Beschreibungen wurden mit ChatGPT erstellt.</p>
                </div>
            </dialog>
        </div>
    )
}