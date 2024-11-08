"use client"

import s from "../styles/Home.module.css"
import {useState, useEffect} from "react"
import TextTransition, { presets } from 'react-text-transition';
import Link from "next/link"

export default function SplashText(){
    const prefixes:string[] = [
        "kreiere Webseiten",
        "entwickle Mobile Apps",
        "erstelle Webapplikationen",
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
Webseiten, Web-Applikationen & Mobile Apps aus regionalem Anbau
            </h1>
            <div className="buttonContainerDuo">
            <Link href="/portfolio" className="buttonBg" title="Angebote">
              <div className="button">
                Portfolio
              </div>
            </Link>
            <Link href="/kontakt" className="buttonBg" title="Portfolio">
              <div className="button">
                Kontakt
              </div>
            </Link>
          </div>
          </div>
    )
}