import Input from "@/components/Input";
import Text from "@/components/Textarea"
import { FormEvent, useState } from "react";
import s from "@/styles/Kontakt.module.css"

export default function Kontakt(){
    
    interface isFocus {
        name: boolean;
        mail: boolean;
        message: boolean;
     }
    const [focus, setFocus] = useState<isFocus>({
        name: false,
        mail: false,
        message: false,
    });

    interface isFormValue {
        name: string;
        mail: string;
        message: string;
    }
    const [formValue, setFormValue] = useState<isFormValue>({
        name: '',
        mail: '',
        message: '',
    });

    interface isFormValid {
        name: boolean;
        mail: boolean;
        message: boolean;
    }
    const [formValid, setFormValid] = useState<isFormValid>({
        name: false,
        mail: false,
        message: false,
    });

    interface isFeedback {
        color: string;
        content: string;
    }
    const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<isFeedback>({
        color: '',
        content: '',
    });

    const [cooldown, setCooldown] = useState<boolean>(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    
    event.preventDefault();
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

    return(
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
      />
      <Text
        tag="message"
        content="Nachricht *"
        formValue={formValue}
        focus={focus}
        setFormValue={setFormValue}
        setFocus={setFocus}
      />
      <div className="buttonContainer">
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
    )
}