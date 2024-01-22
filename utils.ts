import { Metadata } from "./interfaces"

export function urlReplacer(string:string){
    return string
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("/", "-")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(",", "")
        .replaceAll(":", "")
}

export function stringReplacer(string:string){

    const removeLinks = new RegExp("(<a|</a)\.*?>", "g")
    const removeEmphasis = new RegExp("(<em|</em)\.*?>", "g")

    return string
        .replaceAll("&uuml;", "ü")
        .replaceAll("&auml;", "ä")
        .replaceAll("&ouml;", "ö")
        .replaceAll("&Uuml;", "Ü")
        .replaceAll("&Auml;", "Ä")
        .replaceAll("&Ouml;", "Ö")
        .replaceAll("&ndash;", "-")
        .replaceAll("&hellip;", "...")
        .replaceAll("&amp;", "&")
        .replaceAll("<p>", "")
        .replaceAll("</p>", "")
        .replaceAll("<blockquote>", "\"")
        .replaceAll("</blockquote>", "\"")
        .replaceAll("<br>", "\n\r")
        .replaceAll("<ul>", "")
        .replaceAll("</ul>", "")
        .replaceAll("<li>", "| ")
        .replaceAll("</li>", " |")
        .replaceAll("&nbsp;", " ")
        .replaceAll(removeLinks, "")
        .replaceAll(removeEmphasis, "")
}

export async function pageMetadata(pageName:string){
    const getMetadata: Response = await fetch(
        `https://cms.mrweber.ch/api/content/item/taglines?filter=%7Bpage%3A%22${pageName}%22%7D&populate=1`,
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
                    url: metadata.image ? `https://cms.mrweber.ch/storage/uploads/${metadata.image.path}` : "./sd_mrweber3.jpg",
                }
            ],
            locale: 'de_CH',
            type: 'website',
        },
        icons: {
            icon: '/sd_mrweber3.png',
            shortcut: '/sd_mrweber3.png',
            apple: '/sd_mrweber3.png',
            other: {
                rel: 'apple-touch-icon-precomposed',
                url: '/sd_mrweber3.png',
            },
        },
    }
}