import * as React from 'react';
import s from "../styles/Informationen.module.css"
import t from "../styles/TechStack.module.css"
import TechStack from '@/components/TechStack';
import { NextRouter, useRouter } from 'next/router';
import Header from '@/components/Header';
import Divider from '@/components/Divider';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

interface Asset{
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

interface Content{
  text: string;
  asset: Asset[];
}

interface Information{
  title: string;
  text: string;
  content: Content[];
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

interface Stack{
  brand: string;
  url: string;
  excerpt: string;
  image: Asset;
  Bildquelle: string;
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

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

interface InfoProps{
  infos: Information[];
  tech: TechStack[];
  taglines: tagline[];
}

export default function Informationen({infos, tech, taglines}:InfoProps) {
  
  const router: NextRouter = useRouter()
  const path:string = `https://www.mrweber.ch${router.pathname}`
  const page: string = router.pathname.replace("/", "").toUpperCase() === "" ? "HOME" : router.pathname.replace("/", "").toUpperCase()
  const techSorted: TechStack[] = tech.sort((a,b)=>{
    const x: string = a.brand.toLowerCase()
    const y: string = b.brand.toLowerCase()
    return x > y ? 1 : x < y ? -1 : 0
  })

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
      <section className="section">
        <h1 className="title">Informationen</h1>
        {
          infos.map((info, index)=>{
            return(
              <React.Fragment key={`section_${info._id}`}>
              <div className={s.container} key={info._id}>
                <h2 className={s.title} key={`title_${info._id}`}>{info.title}</h2>
                {info.content?.map((content, index)=>{
                  return (
                    <React.Fragment key={`text_${index}`}>
                    <div  className={s.text} dangerouslySetInnerHTML={{__html: content.text}}></div>
                    {content.asset?.map(asset=>{
                      return (
                        <figure key={`image_${asset._id}`}>
                          <ParallaxBanner className="parallax">
                            <ParallaxBannerLayer image={`https://cms.mrweber.ch/storage/uploads/${asset.path}`} speed={-20} />
                          </ParallaxBanner>
                          <figcaption dangerouslySetInnerHTML={{__html: asset.description}}></figcaption>
                        </figure> 
                      )
                    })}
                    </React.Fragment>
                  )
                })}
                {
                  info.title === "Die Technik" ? 
                    <div className={t.container}>
                      {
                        techSorted.map((stack, index)=>{
                          return <TechStack tech={stack} key={stack._id}/>
                        })
                      } 
                    </div>
                  :
                    null
                }
              </div>
              {
                index+1 < infos.length ? 
                  <Divider key={`divider_${info._id}`}/> 
                : 
                  null
              }
              </React.Fragment>
            )
          })
        }
      </section>
    </main>
    </>
  );
}


export async function getStaticProps(){

        // the key is read-only so don't bother
        const getInfos: Response = await fetch(
          'https://cms.mrweber.ch/api/content/items/about?populate=100',
          {
            headers: {
              'api-key': `${process.env.COCKPIT}`,
            },
          }
        )
        
        const infos:Information[] = await getInfos.json()

        const getTech: Response = await fetch(
            'https://cms.mrweber.ch/api/content/items/tech?populate=100',
            {
              headers: {
                'api-key': `${process.env.COCKPIT}`,
              },
            }
          )
          
          const tech:TechStack[] = await getTech.json()

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
            infos, tech, taglines
        }, revalidate: 10
    }
}
