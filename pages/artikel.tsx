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
    tag: Tag[]
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

  interface Tag{
    tag: string;
    color?: string;
    _state: number;
    _modified: number;
    _mby: string;
    _created: number;
    _cby: string;
    _id: string;
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
          const date = new Date(blog._created*1000).toLocaleDateString()
            return(
                <div className={s.inner} key={blog._id}>
                    <Link className={s.blog} href={{
                        pathname: `/artikel/[slug]`,
                        query: {slug: encodeURIComponent(blog.title.toLocaleLowerCase().replaceAll(" ", "_"))},
                    }}
                    as={`/artikel/${encodeURIComponent(blog.title.toLocaleLowerCase().replaceAll(" ", "_"))}`}
                    
                        >
                        <div className={s.thumb} style={{backgroundImage: `url("https://cms.mrweber.ch/storage/uploads/${blog.hero.path}")`}}></div>
                            

                        <h2 className={s.title}>{blog.title}</h2>
                        
                        <p className={s.date}>{date}</p>
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