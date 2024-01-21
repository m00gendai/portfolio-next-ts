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
