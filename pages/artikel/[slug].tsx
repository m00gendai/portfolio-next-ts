import Divider from '@/components/Divider'
import Header from '@/components/Header'
import Image from "next/image"
import { NextRouter, useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax'

export interface Blog {
    title: string
    intro: string
    hero: Hero
    content: Content[]
    _modified: number
    _mby: string
    _created: number
    _state: number
    _cby: string
    _id: string
  }
  
  export interface Hero {
    path: string
    title: string
    mime: string
    type: string
    description: string
    tags: any[]
    size: number
    colors: string[]
    width: number
    height: number
    _hash: string
    _created: number
    _modified: number
    _cby: string
    folder: string
    _id: string
    _mby: string
  }
  
  export interface Content {
    text: string[]
    image?: Image[]
  }
  
  export interface Image {
    path: string
    title: string
    mime: string
    type: string
    description: string
    tags: any[]
    size: number
    colors: string[]
    width: number
    height: number
    _hash: string
    _created: number
    _modified: number
    _cby: string
    folder: string
    _id: string
    _mby: string
  }

  interface blogProps{
    blog:Blog[];
  }
  
 
export default function Page({blog}:blogProps) {
  const router:NextRouter = useRouter()
  const path:string = `https://www.mrweber.ch${router.asPath}`

  return (
    <>
        <Header
        title={`${blog[0].title}`}
        content={`${blog[0].intro}`}
        url={path}
        image={blog[0].hero.path}
        />

        <main className="main">
        <section className="section">
            <h1 className="title">{blog[0].title}</h1>
            <div style={{width: "100%"}} dangerouslySetInnerHTML={{__html: blog[0].intro}}></div>
            <figure key={`image_${blog[0].hero._id}`}>
                <ParallaxBanner className="parallax large">
                <ParallaxBannerLayer image={`https://cms.mrweber.ch/storage/uploads/${blog[0].hero.path}`} speed={-20}/>
                </ParallaxBanner>
                <figcaption></figcaption>
            </figure> 
            {
                blog[0].content.map((content, index)=>{
                    return (
                        <React.Fragment key={`content_${index}`}>
                        <div style={{width: "100%"}} dangerouslySetInnerHTML={{__html: content.text}}></div>
                        {
                            content.image ? 
                            <div className="articleImageGrid">
                              {content.image.map(img =>{
                               return (
                              <div key={img._id}
                              style={{position: "relative", width: "100%", display: "flex", flexWrap: "wrap", alignContent: "flex-start", alignItems: "flex-start", justifyContent: "center", aspectRatio: "16/9"}}>
                                <figure style={{width: "100%", overflow: "hidden", position: "relative", display: "flex", background: "red", margin: " 0 0 0.25rem 0"}}>
                                  <Image
                                    src={`https://cms.mrweber.ch/storage/uploads/${img.path}`}
                                    fill={true}
                                    alt={img.description}
                                    style={{objectFit: "cover"}}
                                  />
                                </figure>
                                <figcaption style={{width: "95%", display: "flex"}} dangerouslySetInnerHTML={{__html: img.description}}></figcaption>
                              </div>
                              )})}
                
                            </div>
                             : null
                        }
                        {index < blog[0].content.length-1 ? <Divider /> : null}
                        </React.Fragment>
                    )
                })
            }
        </section>
          </main>
          </>
  )
}

export async function getStaticPaths(){
    
    const getBlogs: Response = await fetch(
    'https://cms.mrweber.ch/api/content/items/blog?populate=100',
    {
    headers: {
        'api-key': `${process.env.COCKPIT}`,
    },
    }
)

const blogs:Blog[] = await getBlogs.json()

const pathsWithParams = blogs.map((blog) => ({ params: { slug: blog.title.toLocaleLowerCase().replaceAll(" ", "_") } }));
    return {
        paths: pathsWithParams,
        fallback: true, // false or "blocking"
      }
}

export async function getStaticProps(context:any){
    const getBlogs: Response = await fetch(
        `https://cms.mrweber.ch/api/content/items/blog?populate=100`,
        {
        headers: {
            'api-key': `${process.env.COCKPIT}`,
        },
        }
    )
console.log(context.params.slug)
    const blogs:Blog[] = await getBlogs.json()
    const blog = blogs.filter(blog=>{
      return blog.title.toLocaleLowerCase().replaceAll(" ", "_") === decodeURIComponent(context.params.slug)
      
    })
    
    return{
        props:{
            blog
        }, revalidate: 10
    }
}
