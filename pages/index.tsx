import {useState, useEffect} from "react"
import s from "@/styles/Home.module.css"
import Link from "next/link"

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
  
  const [prefix, setPrefix] = useState<String>("Vereins")
  const [prefixIndex, setPrefixIndex] = useState<number>(1)

  useEffect(() => {
    const interval:NodeJS.Timer = setInterval(function(){
      if(prefixIndex === prefixes.length-1){
        setPrefixIndex(0)
      } else {
        setPrefixIndex(prefixIndex+1)
      }
      setPrefix(prefixes[prefixIndex])
    },5000)
    return () => clearTimeout(interval);
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
              <span className={`${s.spanL} ${s.span} ${s.animate }` }>{prefix}</span>
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
