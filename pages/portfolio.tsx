import * as React from 'react';
import dynamic from "next/dynamic"
import Header from '@/components/Header';
import { NextRouter, useRouter } from 'next/router'

interface Stack_image {
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
interface Stack_entry {
  brand: string;
  url: string;
  excerpt: string;
  image: Stack_image;
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
  Bildquelle: string;
  _model: string;
}
interface Stack {
  stack: Stack_entry;
}
interface Project_image{
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

interface Project {
  name: string;
  url: string;
  description: string;
  details: string;
  image: Project_image;
  tech: Stack[];
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

interface tagline{
  page: string;
  line: string;
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

interface Props{
    projects: Project[];
    taglines: tagline[];
}

const DynamicReel = dynamic(()=>import('../components/Reel'),{
ssr: false,})

export default function Portfolio({projects, taglines}:Props) {
  
  const router: NextRouter = useRouter()
  const path:string = `https://www.mrweber.ch${router.pathname}`
  const page: string = router.asPath.replace("/", "").toUpperCase() === "" ? "HOME" : router.asPath.replace("/", "").toUpperCase()

  const tag = taglines.filter(tagline=>{
    return tagline.page.toUpperCase() === page
  })

  return (
    <>
    <Header
      title={`mrweber ${page}`}
      content={tag[0].line}
      url={path}
      image={""}
    />
    
    <main className="main">
      <section className="section">
        <h1 className="title">Portfolio</h1>
        <DynamicReel projects={projects} />
      </section>
    </main>
    </>
  );
}

export async function getStaticProps(){

        // the key is read-only so don't bother
        const getProjects: Response = await fetch(
          'https://cms.mrweber.ch/api/content/items/projects?populate=100',
          {
            headers: {
              'api-key': `${process.env.COCKPIT}`,
            },
          }
        )
        
        const projects:Project[] = await getProjects.json()

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
            projects, taglines
        }, revalidate: 10
    }
}
