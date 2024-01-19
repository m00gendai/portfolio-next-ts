"use client"

export default function CookieClientWrapper(){
    useEffect(() => {
        const isConsent = getCookieConsentValue("mrwebersYummyCookie");
        if (isConsent === "true") {
          handleAcceptCookie();
        }
      }, []);
    
      const initGA = (id: string) => {
          ReactGA.initialize(id);
      };
    
      const date: Date = new Date()
      const currentYear:number = date.getFullYear()
    
      const handleAcceptCookie = () => {
          initGA(`${process.env.NEXT_PUBLIC_GA}`)
      };
    return(
    <CookieConsent
  location="bottom"
  buttonText="Okay!"
  cookieName="mrwebersYummyCookie"
  style={{background: "black"}}
  containerClasses={c.bar}
  contentClasses={c.inner}
  buttonWrapperClasses={c.buttons}
  buttonClasses={c.accept}
  declineButtonClasses={c.decline}
  enableDeclineButton
  declineButtonText="Nein!"
  onAccept={handleAcceptCookie}
  disableStyles
  disableButtonStyles
>
  Diese Webseite nutzt Cookies! <Link title="Impressum" className={`${s.link} ${s.left}`} href="/impressum">Impressum</Link>
      <Link title="Datenschutzerklärung" className={`${s.link} ${s.right}`} href="/datenschutz">Datenschutzerklärung</Link>{" "}
</CookieConsent>
)
}