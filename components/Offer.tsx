import s from "../styles/Offer.module.css"

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
    offer: Offer_item;
  }

export default function Offer({offer}:OfferProps){
    console.log
    return(
        <details className={s.details}>
          <summary className={s.summary}>
            <h2>{offer.title}</h2>
            <p>{offer.tagline}</p>
            <div className={s.price}>{offer.price}</div>
          </summary>
          <article className={s.description}>
            <div dangerouslySetInnerHTML={{__html: offer.intro}} />
            {offer.parts.map(part=>{
                return(
                    <div className={s.part}>
                        <h4>{part.title}</h4>
                        <div dangerouslySetInnerHTML={{__html: part.description}} />
                        <div dangerouslySetInnerHTML={{__html: part.content}} />
                    </div>
                )
            })}
          </article>
        </details>
    )
}