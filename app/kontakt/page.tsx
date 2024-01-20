import ContactForm from "@/components/ContactForm";
import { Metadata } from "../../interfaces";

interface Props{
    params:{
        slug: string
    }
}

export async function generateMetadata({params}:Props){
    const pageName:string = params.slug
    const getMetadata: Response = await fetch(
        `https://cms.mrweber.ch/api/content/item/taglines?filter=%7Bpage%3A%22${"Kontakt"}%22%7D&populate=1`,
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