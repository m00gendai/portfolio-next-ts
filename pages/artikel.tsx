import React from "react";
import Header from "@/components/Header"
import Link from "next/link";
import s from "@/styles/Artikel.module.css"
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

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
    blogs:Blog[];
  }

 export default function Page({blogs}:blogProps){
 
 return (
    <>
    
    <main className="main">
      <section className="section">
        <h1 className="title">Artikel</h1>
        <div className={s.container}>
        {blogs.map(blog =>{
            return(
                <div className={s.inner}>
                    <Link className={s.blog} href={`/artikel/${blog.title.toLowerCase()}`}>
                        <ParallaxBanner className="parallax">
                            <ParallaxBannerLayer image={`https://cms.mrweber.ch/storage/uploads/${blog.hero.path}`} speed={-20} />
                        </ParallaxBanner>
                        <h2 className={s.title}>{blog.title}</h2>
                        <p className={s.excerpt} dangerouslySetInnerHTML={{__html:blog.intro}}></p>
                    </Link>
                </div>
            ) 
        })}
        </div>
      </section>
    </main>
    </> 
 )
  }

export async function getStaticProps(){

    const getBlogs: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/blog?populate=100',
        {
        headers: {
            'api-key': `${process.env.COCKPIT}`,
        },
        }
    )
  
    const blogs:Blog[] = await getBlogs.json()

    return{
        props:{
            blogs
        }, revalidate: 10
    }
}