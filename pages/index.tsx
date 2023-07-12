import {useState, useEffect} from "react"
import s from "@/styles/Home.module.css"
import Link from "next/link"
import TextTransition, { presets } from 'react-text-transition';
import Header from "@/components/Header";
import { NextRouter, useRouter } from "next/router";

interface tagline{
  page: string;
  title: string;
  description: string;
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

interface IndexProps{
  taglines: tagline[];
}

export default function Home({taglines}:IndexProps) {

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

  const router: NextRouter = useRouter()
  const path:string = `https://www.mrweber.ch${router.pathname}`
  const page: string = router.asPath.replace("/", "").toUpperCase() === "" ? "HOME" : router.asPath.replace("/", "").toUpperCase()

  const tag = taglines.filter(tagline=>{
    return tagline.page.toUpperCase() === page
  })

  return (
    <>
    <Header
      title={`${tag[0].title}`}
      content={tag[0].description}
      url={path}
      image={""}
    />
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

export async function getStaticProps(){
const getTaglines: Response = await fetch(
  'https://cms.mrweber.ch/api/content/items/taglines',
  {
    headers: {
      'api-key': `${process.env.COCKPIT}`,
    },
  }
)

const taglines:tagline[] = await getTaglines.json()

return{
  props:{
      taglines
  }, revalidate: 10
}
}
