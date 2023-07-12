import * as React from 'react';
import Offer from '@/components/Offer';
import { NextRouter, useRouter } from 'next/router';
import Header from '@/components/Header';


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

interface OfferProps{
  offers: Offer_item[];
  isMobile: boolean;
  taglines: tagline[]
}

export default function Angebote({offers, isMobile, taglines}:OfferProps) {
  const router: NextRouter = useRouter()
  const path:string = `https://www.mrweber.ch${router.pathname}`
  const page: string = router.asPath.replace("/", "").toUpperCase() === "" ? "HOME" : router.asPath.replace("/", "").toUpperCase()

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
      <h1 className="title">Angebote</h1>
      {offers.map(offer=>{
        return <Offer offer={offer} key={offer._id} isMobile={isMobile}/>
      })}
      </section>
    </main>
    </>
  );
}

export async function getStaticProps(){

  // the key is read-only so don't bother
  const getOffers: Response = await fetch(
    'https://cms.mrweber.ch/api/content/items/offer?populate=100',
    {
      headers: {
        'api-key': `${process.env.COCKPIT}`,
      },
    }
  )
  
  const offers:Offer_item[] = await getOffers.json()

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
      offers, taglines
  }, revalidate: 10
}
}