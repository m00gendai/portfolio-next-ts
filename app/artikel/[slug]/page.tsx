import Divider from '@/components/Divider'
import { Blog, Metadata } from '@/interfaces'
import Image from "next/image"
import React from 'react'
import { stringReplacer, urlReplacer } from '@/utils'
import ParallaxImage from '@/components/ParallaxImage'

interface Props{
    params:{
        slug: string
    }
}

export async function generateMetadata({params}:Props){
    const data:Blog = await getBlog(params.slug)
    console.log(params.slug)
    if(urlReplacer(data.title) !== decodeURIComponent(params.slug)){
        return{
            title: "Inhalt nicht gefunden"
        }
    }

    return {
        title: data.title,
        description: stringReplacer(data.intro),
        openGraph: {
            title: data.title,
            description: stringReplacer(data.intro),
            images: [
                {
                    url: data.hero ? `https://cms.mrweber.ch/storage/uploads/${data.hero.path}` : "",
                }
            ],
            locale: 'de_CH',
            type: 'website',
        },
        icons: {
            icon: '/sd_mrweber3.png',
            shortcut: '/sd_mrweber3.png',
            apple: '/sd_mrweber3.png',
            other: {
                rel: 'apple-touch-icon-precomposed',
                url: '/sd_mrweber3.png',
            },
        },
    }
}

async function getBlog(slug:string){
    const getBlogs: Response = await fetch(
        `https://cms.mrweber.ch/api/content/items/blog?populate=100`,
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
    )

    const decodedSlug: string = decodeURIComponent(urlReplacer(slug))

    const blogs:Blog[] = await getBlogs.json()
    const blog:Blog[] = blogs.filter(blog=>{
        return urlReplacer(blog.title) === decodedSlug
    })
    return blog[0]
}  
 
export default async function Page({params}:Props) {

    const blog:Blog = await getBlog(params.slug)

    return (
        <main className="main">
            <section className="section">
                <h1 className="title">{blog.title}</h1>
                <div style={{width: "100%"}} dangerouslySetInnerHTML={{__html: blog.intro}}></div>
                <figure key={`image_${blog.hero._id}`}>
                    <ParallaxImage path={blog.hero.path} />
                    <figcaption></figcaption>
                </figure> 
                {blog.content.map((content, index)=>{
                    return (
                        <React.Fragment key={`content_${index}`}>
                        <div style={{width: "100%"}} dangerouslySetInnerHTML={{__html: content.text}}></div>
                        {content.image ? 
                            <div className="articleImageGrid">
                                {content.image.map(img =>{
                                    return (
                                        <div 
                                            key={img._id}
                                            style={{position: "relative", width: "100%", display: "flex", flexWrap: "wrap", alignContent: "flex-start", alignItems: "flex-start", justifyContent: "center", aspectRatio: "16/9"}}
                                        >
                                            <figure style={{width: "100%", overflow: "hidden", position: "relative", display: "flex", background: "red", margin: " 0 0 0.25rem 0"}}>
                                                <Image
                                                    src={`https://cms.mrweber.ch/storage/uploads/${img.path}`}
                                                    fill={true}
                                                    alt={img.description}
                                                    style={{objectFit: "cover"}}
                                                />
                                            </figure>
                                            <figcaption style={{width: "95%", display: "inline"}} dangerouslySetInnerHTML={{__html: img.description}}></figcaption>
                                        </div>
                                    )
                                })}
                            </div>
                        : 
                            null
                        }
                        {index < blog.content.length-1 ? 
                            <Divider /> 
                        : 
                            null
                        }
                        </React.Fragment>
                    )
                })}
            </section>
        </main>
    )
}
