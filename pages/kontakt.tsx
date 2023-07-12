import Input from "@/components/Input";
import Text from "@/components/Textarea"
import { FormEvent, useState } from "react";
import s from "@/styles/Kontakt.module.css"
import { NextRouter, useRouter } from "next/router";
import Header from "@/components/Header";

interface isFocus {
  name: boolean;
  mail: boolean;
  subject: boolean;
  message: boolean;
}

interface isFormValue {
  name: string;
  mail: string;
  subject: string;
  message: string;
}

interface isFormValid {
  name: boolean;
  mail: boolean;
  subject: boolean
  message: boolean;
}

interface isFeedback {
  color: string;
  content: string;
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

interface KontaktProps{
  taglines: tagline[];
}


export default function Kontakt({taglines}:KontaktProps){
    
    
    const [focus, setFocus] = useState<isFocus>({
        name: false,
        mail: false,
        subject: false,
        message: false,
    });

    
    const [formValue, setFormValue] = useState<isFormValue>({
        name: '',
        mail: '',
        subject: '',
        message: '',
    });

    
    const [formValid, setFormValid] = useState<isFormValid>({
        name: false,
        mail: false,
        subject: false,
        message: false,
    });

    
    const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<isFeedback>({
        color: '',
        content: '',
    });

    const [cooldown, setCooldown] = useState<boolean>(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    
    event.preventDefault();
    if(formValue.subject !== ""){
      return
    }
    if(cooldown){
        setFeedbackVisible(true);
        setFeedback({ color: 'red', content: 'Bitte warten SIe 10 Sekunden zwischen dem Senden.' });
    } else {
    if (feedbackVisible) {
      setFeedbackVisible(false);
    }
    setFeedbackVisible(true);
    setFeedback({ color: 'red', content: 'Einen Augenment bitte...' });
    fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValue)
      }).then(async (res) => {
          if (res.status === 200) {
              setFeedback({color: "cyan", content: "Nachricht erfolgreich übermittelt. Sie haben auch eine Kopie erhalten."})
              setCooldown(true)
              setTimeout(function(){
                setCooldown(false)
                setFeedbackVisible(false);
              }, 10000)
          } else {
              const errmsg = await res.json()
              setFeedback({color: "magenta", content: `
                Es ist etwas schiefgegangen. Bitte überprüfen Sie insbesondere Ihre angegebene E-Mail-Adresse. Ansonsten wenden SIe sich an die im Impressum angegebene Kontaktmöglichkeit.
                Fehler: ${res.status} 
                Meldung ${errmsg.err}
              `})
          }
        })
    }}

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
                <h1 className="title">Kontakt</h1>
                <p style={{width: "100%"}}>
                    {`Um mit mir in Kontakt zu treten, einfach unten stehendes Formular ausfüllen mit ein zwei Zeilen, um was es geht
                    (z.B. "Ich interessiere mich für eine WordPress-Webseite für eine Schreinerei in Schaffhausen, bitte kontaktieren Sie mich").`}
                </p>
    <form className={s.form} onSubmit={(event) => handleSubmit(event)}>
      <Input
        tag="name"
        type="text"
        content="Name *"
        pattern={undefined}
        formValue={formValue}
        focus={focus}
        formValid={formValid}
        setFormValid={setFormValid}
        setFormValue={setFormValue}
        setFocus={setFocus}
      />
      <Input
        tag="mail"
        type="email"
        content="E-Mail *"
        pattern={undefined}
        formValue={formValue}
        focus={focus}
        formValid={formValid}
        setFormValid={setFormValid}
        setFormValue={setFormValue}
        setFocus={setFocus}
      /><div style={{position: "absolute", left: "-100000px"}}>
      <Input
        tag="subject"
        type="text"
        content="Betreff"
        pattern={undefined}
        formValue={formValue}
        focus={focus}
        formValid={formValid}
        setFormValid={setFormValid}
        setFormValue={setFormValue}
        setFocus={setFocus}
      /></div>
      <Text
        tag="message"
        content="Nachricht *"
        formValue={formValue}
        focus={focus}
        setFormValue={setFormValue}
        setFocus={setFocus}
      />
      <div className="buttonContainerSingle">
        <div className="buttonBg">
          <input type="submit" className="button" value="Abschicken" />
        </div>
      </div>
      {feedbackVisible ? (
        <p style={{ color: feedback.color, width: "100%", textAlign: "center"}}>{feedback.content}</p>
      ) : null}
    </form>


            </section>
        </main>
        </>
    )
}

export async function getStaticProps(){
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
        taglines
    }, revalidate: 10
  }
  }