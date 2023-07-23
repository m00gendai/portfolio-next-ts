import Divider from '@/components/Divider'
import Header from '@/components/Header'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
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
    blogs:Blog[];
  }
  
 
export default function Page({blogs}:blogProps) {
  const router:NextRouter = useRouter()
  const path:string = `https://www.mrweber.ch${router.pathname}`

  const blog = blogs.filter(blog=>{
    return blog.title.toLowerCase() === router.query.slug
  })

  return (
    <>
        <Header
        title={`${blog[0].title}`}
        content={`${blog[0].intro}`}
        url={path}
        image={""}
        />

        <main className="main">
        <section className="section">
            <h1 className="title">{blog[0].title}</h1>
            <div style={{width: "100%"}} dangerouslySetInnerHTML={{__html: blog[0].intro}}></div>
            <figure key={`image_${blog[0].hero._id}`}>
                <ParallaxBanner className="parallax">
                <ParallaxBannerLayer image={`https://cms.mrweber.ch/storage/uploads/${blog[0].hero.path}`} speed={-20} />
                </ParallaxBanner>
                <figcaption></figcaption>
            </figure> 
            {
                blog[0].content.map((content, index)=>{
                    return (
                        <React.Fragment key={`content_${index}`}>
                        <div style={{width: "100%"}} dangerouslySetInnerHTML={{__html: content.text}}></div>
                        {
                            content.image ? <ParallaxBanner className="parallax">
                            <ParallaxBannerLayer image={`https://cms.mrweber.ch/storage/uploads/${content.image[0].path}`} speed={-20} />
                            </ParallaxBanner> : null
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

const pathsWithParams = blogs.map((blog) => ({ params: { slug: blog.title } }));

    return {
        paths: pathsWithParams,
        fallback: true, // false or "blocking"
      }
}