"use client"

import Link from "next/link";
import s from "../styles/TechStack.module.css"
import d from "../styles/dialog.module.css"
import { useRef, useState } from "react";
import { BiLinkExternal, BiXCircle } from "react-icons/bi";
import Image from "next/image"
import { Stack } from "@/interfaces";

interface TechProps{
    tech: Stack;
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
            <div className={s.inner} onClick={()=>handleOpen()}>
                <Image 
                    src={`https://cms.mrweber.ch/storage/uploads/${tech.image.path}`}
                    alt={tech.brand}
                    fill={true}
                    style={{objectFit: "contain"}}
                    title={tech.brand}
                />
            </div>
            <dialog className={d.container} ref={dialog}>
                <div className={d.inner}>
                    <button className={d.button} onClick={()=>handleClose()}><BiXCircle /></button>
                    <h2 className={d.title}><Link className={d.link} href={tech.url} target="_blank" title={tech.brand}>{tech.brand}</Link><BiLinkExternal style={{margin: "0 0 0 0.5rem"}}/></h2>
                    <div className={d.grid}>
                        <div className={d.imageContainer}>
                            <Image 
                                className={d.image}
                                src={`https://cms.mrweber.ch/storage/uploads/${tech.image.path}`}
                                alt={tech.brand}
                                fill={true}
                                style={{objectFit: "contain"}}
                            >
                            </Image>
                        </div>
                        <div className={d.text} dangerouslySetInnerHTML={{__html: tech.excerpt}}>
                        </div>
                    </div>
                    <p className={d.notice}>Die Beschreibungen wurden mit ChatGPT erstellt.</p>
                </div>
            </dialog>
        </div>
    )
}