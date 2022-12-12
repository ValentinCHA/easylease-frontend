import React, {useState} from 'react';
import Navbar from './Navbar';
import style from '../styles/NewScenario.module.css';

function NewScenario() {

  const [selectionClient, setSelectionClient] = useState("");
  const [scenarioName, setScenarioName] = useState("");
  const [equipementType, setEquipementType] = useState("");
  const [locationDuration, setLocationDuration] = useState("");
  const [startDateLocation, setStartDateLocation] = useState("");
  const [endDateLocation, setEndDateLocation] = useState("");
  const [amountFinance, setAmountFinance] = useState("");
  const [residualValue, setResidualValue] = useState("");

  console.log("START DATE =>", startDateLocation);
  console.log("CLIENT SELECTION =>", selectionClient);

  const modification = () => {
    console.log("Click modification");
  };

  const deletion = () => {
    console.log("Click delete");
  };

  const save = () => {
    console.log("Click enregistrer");
  };

  const submit = () => {
    console.log("Click validation");
  }

  // const current = new Date();
  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <>
    <div className={style.mainContainer}>
    <Navbar/>
    <div className={style.header}>
      <h1 className={style.head} >Nouveau Scenario</h1>
    </div>
      <div className={style.container}>
          <div className={style.leftSection}>
            <select className={style.input} onChange={(e) => setSelectionClient(e.target.value)} value={selectionClient}>
              <option>
                CLIENT 1
              </option>
              <option>
                CLIENT 2
              </option>
            </select>
          <input type="text" className={style.input} onChange={(e) => setScenarioName(e.target.value)} value={scenarioName} placeholder="Nom du scénario" />
          <input type="text" className={style.input} onChange={(e) => setEquipementType(e.target.value)} value={equipementType} placeholder="Type d'équipement" />
          <select className={style.input} onChange={(e) => setLocationDuration(e.target.value)} value={locationDuration}>
              <option>
                12 mois
              </option>
              <option>
                24 mois
              </option>
            </select>
          <input type="text" className={style.input} onChange={(e) => setAmountFinance(e.target.value)} value={amountFinance} placeholder="Montant financé" />
          <input className={style.input} type="date" onChange={(e) => setStartDateLocation(e.target.value)} value={startDateLocation}/>
          <input className={style.input} type="date"onChange={(e) => setEndDateLocation(e.target.value)} value={endDateLocation} />
          <select className={style.input} onChange={(e) => setResidualValue(e.target.value)} value={residualValue}>
              <option>
                5%
              </option>
              <option>
                10%
              </option>
            </select>
          </div>
          <div className={style.rightSection}>
            <div className={style.buttonsTop}>
            <button className={style.button} onClick={() => modification()}>Modifier</button>
            <button className={style.button} onClick={() => deletion()}>Supprimer</button>
            <button className={style.button} onClick={() => save()}>Enregistrer</button>
            </div>
            <div className={style.graphic}>
            <img
              className={style.img}
              src="/graphic.png"
              alt="Graphique temporaire"
            />
            </div>
            <div className={style.buttonBottom}>
            <button className={style.button + ' ' + style.bottomBtn} onClick={() => submit()}>Valider ce scénario en contrat</button>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default NewScenario