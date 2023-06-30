import * as React from 'react';
import dynamic from "next/dynamic"

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

interface Props{
    projects: Project[];
}

const DynamicReel = dynamic(()=>import('../components/Reel'),{
ssr: false,})

export default function Portfolio({projects}:Props) {
  

  return (
    <main className="main">
      <section className="section">
        <h1 className="title">Portfolio</h1>
        <DynamicReel projects={projects} />
      </section>
    </main>
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
      

    return{
        props:{
            projects
        }, revalidate: 10
    }
}
