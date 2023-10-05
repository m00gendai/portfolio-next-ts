import React from "react";
import Header from "@/components/Header"
import Link from "next/link";
import s from "@/styles/Artikel.module.css"
import { NextRouter, useRouter } from "next/router";

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

  interface blogProps{
    blogs:Blog[];
    taglines: tagline[]
  }

 export default function Page({blogs, taglines}:blogProps){

  const router: NextRouter = useRouter()
  const path:string = `https://www.mrweber.ch${router.pathname}`
  const page: string = router.pathname.replace("/", "").toUpperCase() === "" ? "HOME" : router.pathname.replace("/", "").toUpperCase()

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

export async function getServerSideProps(){

    const getBlogs: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/blog?populate=100&sort=%7B_created%3A-1%7D',
        {
        headers: {
            'api-key': `${process.env.COCKPIT}`,
        },
        }
    )
  
    const blogs:Blog[] = await getBlogs.json()

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
            blogs, taglines
        }
    }
}