import Head from "next/head"

interface HeaderProps{
    title: string;
    content: string;
    url: string;
    image: string;
}

export default function Header({title, content, url, image}:HeaderProps){
    return(
        <Head>
            <title>{title}</title>
            <meta name="description" content={title} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={content} />
            <meta name="twitter:image" content="/sd_mrweber3.png" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={content} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content="/sd_mrweber3.png" />
            <link rel="icon" href="/sd_mrweber3.png" />
        </Head>
    )
}