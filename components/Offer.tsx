import s from "../styles/Offer.module.css"

export default function Offer(){
    return(
        <details className={s.details}>
          <summary className={s.summary}>
            <h2>WordPress Webseite</h2>
            <p>Schnell erstellt fürs kleine Budget</p>
            <div className={s.price}>ab CHF 500</div>
          </summary>
          <article className={s.description}>
            WordPress Webseiten sind eine gute Lösung für kleinere Webseiten, die schnell erstellt sind und auch von Laien 
            gewartet, angepasst und unterhalten werden können.
            <h4>WordPress Webseite einrichten</h4>
            <ul>
                <li>WordPress auf der gewünschten Umgebung installieren</li>
                <li>Systemeinstellungen vornehmen</li>
                <li>Notwendige Plugins installieren & konfigurieren</li>
                <li>Sicherheit der Webseite gewährleisten</li>
            </ul>
            <h4>Inhalte erstellen</h4>
            <ul>
                <li>Gewünschte Unterseiten erstellen</li>
                <li>Texte einbinden (oder neu erstellen)</li>
                <li>Bilder einbinden (oder via Bilderanbieter zusammensuchen)</li>
            </ul>
            <h4>Suchmaschinenoptimierung</h4>
            <p>
                Damit die Webseite bei Google und Konsorten in den Suchergebnissen vorne mit dabei ist, müssen einige Tricks und 
                Kniffe angewandt werden. Viele erledigen das mit Plugins für WordPress - diese sind aber oftmals aufgeblasen und funktional eingeschränkt -
                genau das, was man braucht, erfordert dann Premium-Versionen, die zeitweise sehr viel kosten können.
                Ich erledige die Optimierung von Hand, nach neuesten Standards. Dazu gehört auch die korrekte Darstellung von Vorschaulinks zB auf sozialen Medien.
            </p>
            <ul>
                <li>Sitemap erstellen</li>
                <li>Webseite bei Suchmaschinen indexieren</li>
                <li>Korrekte Semantik implementieren</li>
                <li>Korrekte Vorschaulinks für soziale Medien prüfen</li>
                <li>Für Barrierefreiheit sorgen</li>
                <li>Webseitenchecks (Lighthouse) durchführen</li>
                <li>Analytik & Statistik einbinden</li>
            </ul>
            <h4>Sicherheit</h4>
            <p>
                Dies ist ein Bereich, wo ich das Abdecken via Plugin empfehle. 
                Es gibt viele gute Sicherheitsplugins, von gratis bis günstig.
            </p>
            <ul>
                <li>Installieren & konfigurieren von Sicherheitsplugins</li>
                <li>Zusätzliche Sicherheitsmassnahmen seitens Hoster vornehmen</li>
            </ul>
            <h4>Responsives Design</h4>
            <p>
                Die meisten Webseitenaufrufe kommen heutzutage von Mobilgeräten, dem muss man gerecht werden.
                WordPress bietet dies in der Regel von Haus aus, allerdings müssen vor allem bei individuellen Elementen
                die Einstellungen von Hand vorgenommen werden
            </p>
            <ul>
                <li>Prüfen der Responsivität</li>
                <li>Wo nötig Anpassungen vornehmen</li>
            </ul>
            <h4>Datenschutz</h4>
            <p>
                Die Umsetzung der europäischen Datenschutz Grundverordnung wird eingehalten - dies beinhaltet (leider) auch die nervigen Cookie-Meldungen. 
                Diese werden von mir so wenig störend wie möglich implementiert.
            </p>
            <ul>
                <li>EU-DSGVO umsetzen</li>
                <li>Cookie-Meldung implementieren</li>
                <li>Cookie-Handhabung implementieren</li>
                <li>Datenschutzdeklaration erstellen</li>
                <li>Impressum erstellen</li>
            </ul>
            <h4>Preis</h4>
            <p>
                Sofern Hosting und Domain bereits vorhanden sind, gilt der Preis von CHF500. 
                Ansonsten kommt das Hosting und die Domain noch dazu. 
                Der Gesamtpreis ist dann abhängig vom gewählten Anbieter.
            </p>
            <p>
                In diesem Preis nicht inbegriffen sind etwaige kostenpflichtige Funktionen und Plugins.
            </p>
          </article>
        </details>
    )
}