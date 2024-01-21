import Offer from '@/components/Offer';
import { Offer_item } from "@/interfaces";
import { pageMetadata } from '@/utils';
  
export async function generateMetadata(){
    return pageMetadata("Angebote")
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