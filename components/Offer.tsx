"use client"

import s from "../styles/Offer.module.css"
import Link from "next/link"
import {BsChevronCompactDown, BsChevronCompactUp} from "react-icons/bs"
import {useState} from "react"
import { Offer_item } from "@/interfaces";

interface Props{
    offer: Offer_item;
}

export default function Offer({offer}:Props){

  const [open, setOpen] = useState<boolean>(false)

  function handleClick(){
    setOpen(!open)
  }

  return(
    <details className={s.details}>
      <summary 
        className={s.summary}
        onClick={()=>handleClick()}
      >
        <h2 className={s.title}>{offer.title}</h2>
        <h2 className={`${s.price} ${s.mobile}`}>{offer.price}</h2>
        <p className={`${s.tagline} ${s.mobile}`}>{offer.tagline}</p>
        <p className={`${s.tagline} ${s.desktop}`}>{offer.tagline}</p>
        <h2 className={`${s.price} ${s.desktop}`}>{offer.price}</h2>
        <div className={s.chevy}>{open ? <BsChevronCompactUp /> : <BsChevronCompactDown />}</div>
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
      <div className="buttonContainerSingle">
        <div className="buttonBg">
          <Link className="button" href="/kontakt" title="Kontakt">Jetzt anfragen!</Link>
        </div>
      </div>
    </details>
  )
}