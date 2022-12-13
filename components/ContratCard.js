import React, { useEffect } from 'react'
import style from '../styles/ContratCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {addId} from '../reducers/contrat'

function ContratCard(props) {

  const router = useRouter();

  const dispatch = useDispatch();
  const idContrat = useSelector((state) => state.contrat.value._id);
   console.log('contratCard',idContrat)


  const affichePageContrat=()=>{

    const contratId = data.contrat.map((data,i)=>{
        return ({_id: data._id,})
        })

        dispatch(addId(contratId))
         console.log('contrat id',idContrat)

    router.push('/contrat')
  }

  return (
    // contenue de ma card contrat
    <div 
    className={style.card}
    onClick={()=>affichePageContrat()}
    >
      {/* icon de contrat */}
      <FontAwesomeIcon icon={faFileSignature} className={style.userIcon} />
      {/* info du contrat */}
      <div className={style.infoContrat}>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.2em'}}>{props.name}</span>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.0em'}}>{props.type}</span>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.0em'}}>{props.durée} Mois</span>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.0em'}}>{props.montant} €</span>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.0em'}}>{props.creationDate.substring(0,10)}</span>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.0em'}}>...</span>
      </div>
    </div>
  )
}

export default ContratCard