import s from "@/styles/Impressum.module.css"

interface Imprint_tile{
    title: string;
    address: string;
    _model: string;
    _id: string;
}

interface Imprint_field{
    title: string;
    content: string;
}

interface Imprint{
    tiles: Imprint_tile[];
    field: Imprint_field[];
    _modified: number;
    _mby: string;
    _created: number;
    _state: number;
    _cby: string;
    _id: string;
}

interface ImprintProps{
    imprint:Imprint[];
}

export default function Impressum({imprint}:ImprintProps){
    return(
        <main className="main">
            <section className="section">
                <h1 className="title">Impressum</h1>
                <div className={s.tileContainer}> 
                    {imprint[0].tiles.map(tile=>{
                        return (
                            <div className={s.tile} key={tile._id}>
                            <h3>{tile.title}</h3>
                            <div dangerouslySetInnerHTML={{__html:tile.address}}></div>
                            </div>
                        )
                    })}
                </div>
                <div className={s.contentContainer}>
                    {imprint[0].field.map(fld =>{
                        return (
                            <div className={s.field} key={fld.title}>
                                <h3 className={s.title}>{fld.title}</h3>
                                <div className={s.text} dangerouslySetInnerHTML={{__html: fld.content}}></div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}

export async function getStaticProps(){

    // the key is read-only so don't bother
    const getProjects: Response = await fetch(
      'https://cms.mrweber.ch/api/content/items/imprint?populate=100',
      {
        headers: {
          'api-key': 'API-773e67ee0ba102d8b93a74751560d8bdd07bd2cb',
        },
      }
    )
    
    const imprint:Imprint[] = await getProjects.json()
  

return{
    props:{
        imprint
    }, revalidate: 10
}
}