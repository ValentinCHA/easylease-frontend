import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import style from '../styles/NewScenario.module.css';
import { Modal } from 'antd';

function NewScenario() {

  const date = new Date();
  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  let BACKEND_ADDRESS = "http://localhost:3000"
  const [selectionClient, setSelectionClient] = useState("");
  const [creationDate, setCreationDate] = useState(date.toISOString().substring(0, 10));
  const [scenarioName, setScenarioName] = useState("");
  const [equipementType, setEquipementType] = useState("");
  const [locationDuration, setLocationDuration] = useState("");
  const [amountFinance, setAmountFinance] = useState("");
  const [startDateLocation, setStartDateLocation] = useState("");
  const [endDateLocation, setEndDateLocation] = useState("");
  const [residualValue, setResidualValue] = useState("");

  const [oldScenario, setOldScenario] = useState(false);
  const [modalSaveSuccess, setModalSaveSuccess] = useState(false);
  const [scenaryName, setScenaryName] = useState("");
  const [modalSaveFailed, setModalSaveFailed] = useState(false);
  const [modalDeleteSuccess, setModalDeleteSuccess] = useState(false);

  // Check si le scenario est déja enregistrer en BDD//
  useEffect(() => {
    if (scenaryName === "") return
    fetch(`${BACKEND_ADDRESS}/scenary/${scenaryName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.scenary);
        if (data.result) {
          setOldScenario(data.result);
          setSelectionClient(data.scenary.client);
          setCreationDate(data.scenary.creationDate.slice(0,10));
          setScenarioName(data.scenary.name);
          setEquipementType(data.scenary.type);
          setLocationDuration(data.scenary.duration);
          setAmountFinance(data.scenary.amount);
          setStartDateLocation(data.scenary.contratStart.slice(0,10));
          setEndDateLocation(data.scenary.contratEnd.slice(0,10));
          setResidualValue(data.scenary.residualValue);
        }
      });
  }, [scenaryName]);

  console.log("START DATE =>", startDateLocation);
  console.log("CLIENT SELECTION =>", selectionClient);

  const modification = () => {
    console.log("Click modification");
  };

  const deletion = () => {
    console.log("Click delete");
    fetch(`${BACKEND_ADDRESS}/scenary/${scenaryName}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        setModalDeleteSuccess(true);
        setSelectionClient("");
        setCreationDate(date.toISOString().substring(0, 10));
        setScenarioName("");
        setEquipementType("");
        setLocationDuration("");
        setAmountFinance("");
        setStartDateLocation("");
        setEndDateLocation("");
        setResidualValue("");
      }
      console.log(data);
    })
  };

  const save = () => {
    console.log("Click enregistrer");
    fetch(`${BACKEND_ADDRESS}/scenary/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        client: selectionClient,
        name: scenarioName,
        type: equipementType,
        duration: locationDuration,
        amount : amountFinance,
        creationDate: creationDate,
        contratStart: startDateLocation,
        contratEnd: endDateLocation,
        residualValue: residualValue,
        links: "TEST",
      })
    }).then(response => response.json()).then(data => {
      if (data.result) {
        setModalSaveSuccess(true);
        setScenaryName(data.name);
      } else {
        console.log("DATA =>", data);
        setModalSaveFailed(true);
      }
    })
  };

  const submit = () => {
    console.log("Click validation");
  };

  const cancelModal = () => {
    setModalSaveSuccess(false);
    setModalSaveFailed(false);
    setModalDeleteSuccess(false);
  }


  let header;
  if (oldScenario) {
    header = <h1 className={style.head} >Scenario : {selectionClient}</h1>
  } else {
    header = <h1 className={style.head} >Nouveau Scenario</h1>
  };
console.log("creation date", creationDate);
  return (
    <>
    <div className={style.mainContainer}>
    <Navbar/>
    <div className={style.header}>
      {header}
    </div>
      <div className={style.container}>
          <div className={style.leftSection}>
            <select className={style.input} onChange={(e) => setSelectionClient(e.target.value)} value={selectionClient}>
              <option>Client 1</option>
              <option>Client 2</option>
              <option>6396041f066842463b1fa74a</option>
            </select>
            <p className={style.para}>Date de création :</p>
          <input className={style.input} type="date"onChange={(e) => setCreationDate(e.target.value)} value={creationDate} />
          <input type="text" className={style.input} onChange={(e) => setScenarioName(e.target.value)} value={scenarioName} placeholder="Nom du scénario" />
          <input type="text" className={style.input} onChange={(e) => setEquipementType(e.target.value)} value={equipementType} placeholder="Type d'équipement" />
          <p className={style.para + ' ' + style.trois}>Durée (mois) :</p>
          <select className={style.input} onChange={(e) => setLocationDuration(e.target.value)} value={locationDuration}>
              <option>6</option>
              <option>12</option>
              <option>24</option>
            </select>
          <input type="text" className={style.input} onChange={(e) => setAmountFinance(e.target.value)} value={amountFinance} placeholder="Montant financé" />
          <p className={style.para + ' ' + style.un}>Date de début :</p>
          <input className={style.input} type="date" onChange={(e) => setStartDateLocation(e.target.value)} value={startDateLocation}/>
          <p className={style.para + ' ' + style.de}>Date de fin :</p>
          <input className={style.input} type="date"onChange={(e) => setEndDateLocation(e.target.value)} value={endDateLocation} />
          <p className={style.para}>Valeur résiduelle :</p>
          <select className={style.input} onChange={(e) => setResidualValue(e.target.value)} value={residualValue}>
              <option>0..05</option>
              <option>0.10</option>
              <option>0.15</option>
              <option>0.20</option>
              <option>0.25</option>
              <option>0.30</option>
            </select>
          </div>
          <div className={style.rightSection}>
            <div className={style.buttonsTop}>
            {oldScenario && <button className={style.button} onClick={() => modification()}>Modifier</button>}
            {oldScenario && <button className={style.button} onClick={() => deletion()}>Supprimer</button>}
            {!oldScenario && <button className={style.button} onClick={() => save()}>Enregistrer</button>}
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
          <Modal onCancel={() => cancelModal()} open={modalSaveSuccess} footer={null}>
            <p style={{fontSize: 18, textAlign: 'center'}}>✅ Scenario eneregistrer ! ✅</p>
          </Modal>
          <Modal onCancel={() => cancelModal()} open={modalSaveFailed} footer={null}>
            <p style={{fontSize: 18, textAlign: 'center'}}>❌ Merci de remplir tous les champs ! ❌</p>
          </Modal>
          <Modal onCancel={() => cancelModal()} open={modalDeleteSuccess} footer={null}>
            <p style={{fontSize: 18, textAlign: 'center'}}>✅ Scenario supprimé ! ✅</p>
          </Modal>
      </div>
    </div>
    </>
  )
}

export default NewScenario