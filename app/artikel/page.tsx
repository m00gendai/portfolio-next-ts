
import s from "../../styles/Artikel.module.css"
import { Metadata, Blog } from "../../interfaces";
import Link from "next/link"
import Image from "next/image"
import { ResolvingMetadata } from "next";
import { urlReplacer } from "@/utils";
  
interface Props{
    params:{
        slug: string
    }
}

export async function generateMetadata({params}:Props){
    const getMetadata: Response = await fetch(
        `https://cms.mrweber.ch/api/content/item/taglines?filter=%7Bpage%3A%22${"Artikel"}%22%7D&populate=1`,
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
    )
    const metadata:Metadata = await getMetadata.json()

    return {
        title: metadata.title,
        description: metadata.description,
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            images: [
                {
                    url: metadata.image ? `https://cms.mrweber.ch/storage/uploads/${metadata.image.path}` : "",
                }
            ]
        }
    }
}

async function getArticles(){
    const getArticles: Response = await fetch(
        `https://cms.mrweber.ch/api/content/items/blog?populate=100&sort=%7B_created%3A-1%7D`,
        {
            headers: {
             'api-key': `${process.env.COCKPIT}`,
            },
        }
    )

    const articles: Blog[] = await getArticles.json()
    return articles
}

export default async function Artikel(){

    const blogs: Blog[] = await getArticles()

    return(
        <main className="main">
            <section className="section">
                <h1 className="title">Artikel</h1>
                <div className={s.container}>
                    {blogs.map(blog =>{
                        const date = new Date(blog._created*1000).toLocaleDateString()
                        return(
                            <div className={s.inner} key={blog._id}>
                                <Link className={s.blog} href={`/artikel/${urlReplacer(encodeURIComponent(blog.title))}`}>
                                    <div className={s.thumb}>
                                        <Image
                                            src={`https://cms.mrweber.ch/storage/uploads/${blog.hero.path}`}
                                            alt={`Flag`}
                                            fill={true}
                                            style={{objectFit: "cover"}}
                                        />
                                    </div>
                                    <h2 className={s.title}>{blog.title}</h2>
                                    <p className={s.date}>{date}</p>
                                </Link>
                            </div>
                        ) 
                    })}
                </div>
            </section>
        </main>
    )
}