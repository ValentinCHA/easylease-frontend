import React from 'react'
import style from '../styles/ContratCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature } from '@fortawesome/free-solid-svg-icons'


function ContratCard(props) {
  return (
    // contenue de ma card contrat
    <div className={style.card}>
      {/* icon de contrat */}
      <FontAwesomeIcon icon={faFileSignature} className={style.userIcon} />
      {/* info du contrat */}
      <div className={style.infoContrat}>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.5em'}}>{props.name}</span>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.0em'}}>{props.type}</span>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.0em'}}>{props.durée}</span>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.0em'}}>{props.date_de_début}</span>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.0em'}}>{props.date_de_fin}</span>
        <span style={{fontSize:23, color:'rgb(51,78,110)',fontSize:'1.0em'}}>...</span>
      </div>
    </div>
  )
}

export default ContratCard