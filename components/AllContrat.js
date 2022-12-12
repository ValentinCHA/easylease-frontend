import React from 'react'
import style from '../styles/AllContratPage.module.css'
import Navbar from './Navbar';
import ContratCard from './ContratCard'
import { faMountainCity } from '@fortawesome/free-solid-svg-icons';

function Contrat() {
// tableau d'essaie
  const array = [
    {name:'Macbook air Apple', type:'Ordinateurs', durée:'24 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/24' ,montant:'100.000€', valeur_résiduel: '10%'},
    {name:'Bureau Ikea', type:'Meubles', durée:'34 Mois',date_de_début:'10/09/23' ,date_de_fin:'10/09/26' ,montant:'200.000€', valeur_résiduel: '20%'},
    {name:'Mercedes cla200', type:'Voitures', durée:'12 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/23' ,montant:'400.000€', valeur_résiduel: '20%'},
    {name:'Bmw x6', type:'voitures', durée:'12 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/23' ,montant:'450.000€', valeur_résiduel: '10%'},
    {name:'Aspirateur', type:'Machine', durée:'48 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/26' ,montant:'50.000€', valeur_résiduel: '10%'},
    {name:'Bouteille Oasis', type:'Boissons', durée:'6 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/03/23' ,montant:'50.000€', valeur_résiduel: '10%'},
    {name:'Tv samsung', type:'télévision', durée:'24 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/24' ,montant:'100.000€', valeur_résiduel: '10%'},
    {name:'Chaise ', type:'Meubles', durée:'24 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/24' ,montant:'100.000€', valeur_résiduel: '10%'},
  ]
// map tableau d'essaie
  const infoContrat = array.map((data,i)=>{
    return <ContratCard {...data}/>
  })

  return (
    <>
    {/* navbar et header */}
    <div className={style.main}>
      <Navbar/>
      <div className={style.header}>
        <h1 className={style.head} >Contrat</h1>
      </div>
      <div className={style.container}>
        {/* mes 2 inputs de recherche */}
          <div className={style.search}>
            <select className={style.select}>
              <option className={style.select}>Select contrat.....</option>
            </select>
            <input className={style.input} type='text' placeholder='🔎 Search contrat.....'/>
          </div>
          {/* span qui affiche le nom du client */}
          <span style={{paddingLeft:120,borderBottom:'2px solid rgb(235,239,242)', width:'150%'}}>Contrats de l’entreprise “Nom du client” :</span>
          {/* div qui contiendra tout mes coponents contrat Card */}
          <div className={style.containerContratCard}>
            {infoContrat}
          </div>
      </div>
      {/* span voir plus */}
      <span style={{display:'flex',justifyContent:'center',alignItems:'center', color:'rgb(101,94,255)',cursor:'pointer',marginTop:-40}}>voir plus...</span>
    </div>
    </>
  )
}

export default Contrat
