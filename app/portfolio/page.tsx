import Reel from "@/components/Reel";
import ReelPortrait from "@/components/Reel_portrait";
import { Info, Project } from "@/interfaces";
import { pageMetadata } from "@/utils";

export async function generateMetadata(){
    return pageMetadata("Portfolio")
}

async function getProjects(){
    const getProjects: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/projects?populate=100',
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
    )
      
    const projects:Project[] = await getProjects.json()
    return projects
}

async function getDemos(){
    const getDemos: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/demos?populate=100',
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
    )
      
    const demos:Project[] = await getDemos.json()
    return demos
}

async function getInfos(){
    const getInfo: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/projectInfos?populate=100',
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
    )
      
    const info:Info[] = await getInfo.json()
    return info
}

async function getApps(){
    const getApps: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/ProjekteMobile?populate=100',
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
    )
      
    const apps:Project[] = await getApps.json()
    return apps
}

export default async function Home(){

    const projects:Project[] = await getProjects()
    const demos:Project[] = await getDemos()
    const apps:Project[] = await getApps()
    const info:Info[] = await getInfos()

    return(
        <main className="main">
            <section className="section">
                <h1 className="title">Portfolio</h1>
                <div className="description" dangerouslySetInnerHTML={{__html: info[0].intro}}></div>
                <h2>Webseiten</h2>
                <div className="description" dangerouslySetInnerHTML={{__html: info[0].projects}}></div>
                <Reel projects={projects} id={`live`}/>
                <div className="divider"></div>
                <h2>Demos & Beispiele</h2>
                <div className="description" dangerouslySetInnerHTML={{__html: info[0].demos}}></div>
                <Reel projects={demos} id={`demo`}/>
                <div className="divider"></div>
                <h2>Webapplikationen</h2>
                <div className="description" dangerouslySetInnerHTML={{__html: info[0].apps}}></div>
                <ReelPortrait projects={apps} id={`apps`}/>
            </section>
        </main>
    )
}