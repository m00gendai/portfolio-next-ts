import s from "../styles/Offer.module.css"
import Link from "next/link"

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
    isMobile: boolean;
  }

export default function Offer({offer, isMobile}:OfferProps){

  return(
        <details className={s.details}>
          <summary className={s.summary} style={isMobile ? {gridTemplateColumns:"1fr"} : {gridTemplateColumns: "2fr 3fr 1fr"}}>
            <h2 className={s.title}>{offer.title}</h2>
            {isMobile ? <h2 className={s.price}>{offer.price}</h2> : <p className={s.tagline}>{offer.tagline}</p>}
            {isMobile ? <p className={s.tagline}>{offer.tagline}</p> : <h2 className={s.price}>{offer.price}</h2>}
          </summary>
          <article className={s.description}>
            <div className={s.intro} dangerouslySetInnerHTML={{__html: offer.intro}} />
            {offer.parts.map(part=>{
                return(
                    <div className={s.part} key={part.title}>
                        <h4>{part.title}</h4>
                        <div dangerouslySetInnerHTML={{__html: part.description}} />
                        <div className={s.part_description} dangerouslySetInnerHTML={{__html: part.content}} />
                    </div>
                )
            })}
          </article>
          <div className="buttonContainer">
            <div className="buttonBg">
              <Link className="button" href="/kontakt">Jetzt anfragen!</Link>
            </div>
          </div>
        </details>
    )
}