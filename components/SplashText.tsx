"use client"

import s from "../styles/Home.module.css"
import {useState, useEffect} from "react"
import TextTransition, { presets } from 'react-text-transition';
import Link from "next/link"

export default function SplashText(){
    const prefixes:string[] = [
        "Vereins", 
        "Portfolio", 
        "Club", 
        "Betriebs", 
        "Info", 
        "Geschäfts", 
        "Hobby", 
        "Projekt",
        "Blog",
        "Unternehmens",
        "Veranstaltungs",
        "Medien",
        "WordPress",
        "Foto",
        "ClubDesk",
        "Video",
        "Musik",
      ]
      
      const [index, setIndex] = useState<number>(0)
    
      useEffect(() => {
        const intervalId = setInterval(
          () => setIndex((index) => Math.floor(Math.random() * (prefixes.length-1 - 0 + 1) + 0)),
          3000, // every 3 seconds
        );
        return () => clearTimeout(intervalId);
      }, []);
    return(
    <div className={s.splashText}>
            <h1 className={s.title}>
              <span className={s.span}>{`Ihre neue `}</span>
              <span className={`${s.spanL} ${s.span}` }>
                <TextTransition 
                  inline 
                  springConfig={presets.slow} 
                  direction="up"
                  className={s.transition}
                >{prefixes[index % prefixes.length]}</TextTransition>
              </span>
              <span className={`${s.spanR} ${s.span}`}>{`webseite?`}</span>
            </h1>
            <div className="buttonContainerDuo">
            <Link href="/angebote" className="buttonBg" title="Angebote">
              <div className="button">
                Angebote
              </div>
            </Link>
            <Link href="/portfolio" className="buttonBg" title="Portfolio">
              <div className="button">
                Portfolio
              </div>
            </Link>
          </div>
          </div>
    )
}