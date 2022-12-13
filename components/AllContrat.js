import React, { useEffect, useState } from 'react'
import style from '../styles/AllContratPage.module.css'
import Navbar from './Navbar';
import ContratCard from './ContratCard'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


function AllContrat() {

  const [inputValue, setInputValue] = useState('')
  const [dataScenary, setDataScenary] = useState([])

// tableau d'essaie
  let array = [
    {name:'Macbook air Apple', type:'Ordinateurs', durée:'24 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/24' ,date_de_fin:'100.000€', valeur_résiduel: '10%'},
    {name:'Bureau Ikea', type:'Meubles', durée:'34 Mois',date_de_début:'10/09/23' ,date_de_fin:'10/09/26' ,montant:'200.000€', valeur_résiduel: '20%'},
    {name:'Mercedes cla200', type:'Voitures', durée:'12 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/23' ,montant:'400.000€', valeur_résiduel: '20%'},
    {name:'Bmw x6', type:'voitures', durée:'12 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/23' ,montant:'450.000€', valeur_résiduel: '10%'},
    {name:'Aspirateur', type:'Machine', durée:'48 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/26' ,montant:'50.000€', valeur_résiduel: '10%'},
    {name:'Bouteille Oasis', type:'Boissons', durée:'6 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/03/23' ,montant:'50.000€', valeur_résiduel: '10%'},
    {name:'Tv samsung', type:'télévision', durée:'24 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/24' ,montant:'100.000€', valeur_résiduel: '10%'},
    {name:'Chaise ', type:'Meubles', durée:'24 Mois',date_de_début:'10/09/22' ,date_de_fin:'10/09/24' ,montant:'100.000€', valeur_résiduel: '10%'},
  ]
// map tableau d'essaie
  const infoContrat = dataScenary.filter((data)=>{
    if(inputValue == ""){
      return data
    }else if(data.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())){
      return data
    }
  }).map((data,i)=>{
    return <ContratCard {...data} />
  })

  useEffect(()=>{
    fetch('http://localhost:3000/scenary/all')
    .then(response=>response.json())
    .then(data=>{
      if(data){
        console.log('data find',data)
        const scenary = data.scenaries.map((data,i)=>{
          return ({
            name: data.name,
            type: data.type,
            durée: data.duration,
            montant: data.amount,
            creationDate: data.creationDate,
            date_de_début: data.contratStart,
            date_de_fin: data.contratEnd,
            valeur_résiduel: data.residualValue
          })
        })
        setDataScenary(scenary)
      }
    })
  },[])


  console.log(inputValue)
  return (
    <>
    {/* navbar et header */}
    <div className={style.main}>
      <Navbar/>
      <div className={style.header}>
        <h1 className={style.head} >Contrat</h1>
      </div>
      <div className={style.container}>
        {/* mon input de recherche */}
          <div className={style.search}>
            <input className={style.input} onChange={(e)=>setInputValue(e.target.value)} type='text' placeholder='  📄 Search contrat.....' value={inputValue}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon}/>
          </div>
          {/* span qui affiche le nom du client */}
          <span style={{paddingLeft:120,borderBottom:'2px solid rgb(235,239,242)'}}>Contrats de l’entreprise “Nom du client” :</span>
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

export default AllContrat
