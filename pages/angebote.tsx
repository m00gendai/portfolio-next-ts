import * as React from 'react';
import Offer from '@/components/Offer';


interface Offer_part{
  title: string;
  description: string;
  content: string;
}

interface Offer_item{
  title: string;
  tagline: string;
  price: string;
  intro: string;
  parts: Offer_part[];
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

interface OfferProps{
  offers: Offer_item[];
  isMobile: boolean;
}

export default function Angebote({offers, isMobile}:OfferProps) {
  return (
    <main className="main">
      <section className="section">
      <h1 className="title">Angebote</h1>
      {offers.map(offer=>{
        return <Offer offer={offer} key={offer._id} isMobile={isMobile}/>
      })}
      </section>
    </main>
  );
}

export async function getStaticProps(){

  // the key is read-only so don't bother
  const getOffers: Response = await fetch(
    'https://cms.mrweber.ch/api/content/items/offer?populate=100',
    {
      headers: {
        'api-key': 'API-773e67ee0ba102d8b93a74751560d8bdd07bd2cb',
      },
    }
  )
  
  const offers:Offer_item[] = await getOffers.json()


return{
  props:{
      offers
  }, revalidate: 10
}
}