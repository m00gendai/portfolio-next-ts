import {useState, useEffect} from "react"
import s from "@/styles/Home.module.css"
import Link from "next/link"
import TextTransition, { presets } from 'react-text-transition';

export default function Home() {

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
    "Foto",
    "Video",
    "Musik",
  ]
  
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  

  const background:React.CSSProperties = {
    backgroundImage: `url("/laptop-ga99e6e23c_1920.jpg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }

  return (
    <>
      <main className="main">
        <section className="section" style={background}>
          <div className={s.splashText}>
            <span className={s.span}>{`Ihre neue `}</span>
            <div className={s.wrapper}>
              <span className={`${s.spanL} ${s.span}` }>
            <TextTransition 
              inline 
              springConfig={presets.slow} 
              direction="up"
              className={s.transition}
            >{prefixes[index % prefixes.length]}</TextTransition></span>
              <span className={`${s.spanR} ${s.span}`}>{`webseite?`}</span>
            </div>
            <div className="buttonContainerDuo">
            <Link href="/angebote" className="buttonBg">
              <div className="button">
                Angebote
              </div>
            </Link>
            <Link href="/portfolio" className="buttonBg">
              <div className="button">
                Portfolio
              </div>
            </Link>
          </div>
          </div>
        </section>
      </main>
    </>
  )
}
