import ContactForm from "@/components/ContactForm";
import { pageMetadata } from "@/utils";

export async function generateMetadata(){
    return pageMetadata("Kontakt")
}

export default async function Kontakt(){
    return(
        <main className="main">
            <section className="section">
                <h1 className="title">Kontakt</h1>
                <p style={{width: "100%"}}>
                    {`Um mit mir in Kontakt zu treten, einfach unten stehendes Formular ausfüllen mit ein zwei Zeilen, um was es geht
                    (z.B. "Ich interessiere mich für eine WordPress-Webseite für eine Schreinerei in Schaffhausen, bitte kontaktieren Sie mich").`}
                </p>
                <ContactForm />
            </section>
        </main>
    )
}