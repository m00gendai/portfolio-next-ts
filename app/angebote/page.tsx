import Offer from '@/components/Offer';
import { Info, Metadata, Offer_item, Project } from "@/interfaces";
  
interface Props{
    params:{
        slug: string
    }
}

export async function generateMetadata({params}:Props){
    const pageName:string = params.slug
    const getMetadata: Response = await fetch(
        `https://cms.mrweber.ch/api/content/item/taglines?filter=%7Bpage%3A%22${"Angebote"}%22%7D&populate=1`,
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

async function getOffers(){
    const getOffers: Response = await fetch(
        'https://cms.mrweber.ch/api/content/items/offer?populate=100',
        {
            headers: {
                'api-key': `${process.env.COCKPIT}`,
            },
        }
    )
      
    const offers:Offer_item[] = await getOffers.json()
    return offers
}

export default async function Angebote(){

    const offers:Offer_item[] = await getOffers()

    return(
        <main className="main">
            <section className="section">
                <h1 className="title">Angebote</h1>
                {offers.map(offer=>{
                    return <Offer offer={offer} key={offer._id} />
                })}
            </section>
        </main>
    )
}