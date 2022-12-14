import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import style from '../styles/NewScenario.module.css';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  MarkSeries
} from 'react-vis';


  // return (
  //   <XYPlot width={300} height={300}>
  //     <VerticalGridLines />
  //     <HorizontalGridLines />
  //     <XAxis />
  //     <YAxis />
  //     <LineSeries data={data} />
  //   </XYPlot>
  // );
  // const data = [
  //   {month: "Janvier", sales: 3500},
  //   {month: "Février", sales: 3000},
  //   {month: "Mars", sales: 2500},
  //   {month: "Avril", sales: 2000},
  //   {month: "Mai", sales: 1500},
  //   {month: "Juin", sales: 1000},
  //   {month: "Juillet", sales: 500},
  //   {month: "Août", sales: 100}]
  const dataGraph = [
    {x: 1, y: 89, student: "Étudiant 1"},
    {x: 2, y: 75, student: "Étudiant 2"},
    {x: 3, y: 64, student: "Étudiant 3"},
    {x: 4, y: 77, student: "Étudiant 4"},
    {x: 5, y: 82, student: "Étudiant 5"},
    {x: 6, y: 91, student: "Étudiant 6"},
    {x: 7, y: 55, student: "Étudiant 7"},
    {x: 8, y: 70, student: "Étudiant 8"},
    {x: 9, y: 40, student: "Étudiant 9"},
    {x: 10, y: 65, student: "Étudiant 10"},
  ];


function NewScenario() {
  const router = useRouter();
  const date = new Date();
  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  let BACKEND_ADDRESS = "http://localhost:3000";
  const [selectionClient, setSelectionClient] = useState("");
  const [creationDate, setCreationDate] = useState(
    date.toISOString().substring(0, 10)
  );
  const [scenarioName, setScenarioName] = useState("");
  const [equipementType, setEquipementType] = useState("");
  const [locationDuration, setLocationDuration] = useState("");
  const [amountFinance, setAmountFinance] = useState("");
  const [startDateLocation, setStartDateLocation] = useState("");
  const [endDateLocation, setEndDateLocation] = useState("");
  const [residualValue, setResidualValue] = useState("");
  const [margeValue, setMargeValue] = useState("");

  const [oldScenario, setOldScenario] = useState(false);
  const [modalSaveSuccess, setModalSaveSuccess] = useState(false);
  const [scenaryName, setScenaryName] = useState("");
  const [modalSaveFailed, setModalSaveFailed] = useState(false);
  const [modalDeleteSuccess, setModalDeleteSuccess] = useState(false);
  const [modalDeleteFailed, setModalDeleteFailed] = useState(false);
  const [modalModifierFailed, setModalModifierFailed] = useState(false);
  const [modalModifierSuccess, setModalModifierSuccess] = useState(false);
  const [modalSubmitSuccess, setModalSubmitSuccess] = useState(false);
  const [modalSubmitFailed, setModalSubmitFailed] = useState(false);

  // Check si le scenario est déja enregistrer en BDD//
  useEffect(() => {
    if (scenaryName === "") return;
    fetch(`${BACKEND_ADDRESS}/scenary/${scenaryName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.scenary);
        if (data.result) {
          setOldScenario(data.result);
          setSelectionClient(data.scenary.client);
          setCreationDate(data.scenary.creationDate.slice(0, 10));
          setScenarioName(data.scenary.name);
          setEquipementType(data.scenary.type);
          setLocationDuration(data.scenary.duration);
          setAmountFinance(data.scenary.amount);
          setStartDateLocation(data.scenary.contratStart.slice(0, 10));
          setEndDateLocation(data.scenary.contratEnd.slice(0, 10));
          setResidualValue(data.scenary.residualValue);
        }
      });
  }, [scenaryName]);

  console.log("START DATE =>", startDateLocation);
  console.log("CLIENT SELECTION =>", selectionClient);

  const modification = () => {
    console.log("Click modification");
    fetch(`${BACKEND_ADDRESS}/scenary/update/${scenaryName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: selectionClient,
        name: scenarioName,
        type: equipementType,
        duration: locationDuration,
        amount: amountFinance,
        creationDate: creationDate,
        contratStart: startDateLocation,
        contratEnd: endDateLocation,
        residualValue: residualValue,
        links: "TEST",
        marge: margeValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setModalModifierSuccess(true);
          setScenaryName(data.name);
        } else {
          console.log("DATA PUT=>", data);
          setModalModifierFailed(true);
        }
      });
  };

  const deletion = () => {
    console.log("Click delete");
    fetch(`${BACKEND_ADDRESS}/scenary/${scenaryName}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setModalDeleteSuccess(true);
          setOldScenario(false);
          setSelectionClient("");
          setCreationDate(date.toISOString().substring(0, 10));
          setScenarioName("");
          setEquipementType("");
          setLocationDuration("");
          setAmountFinance("");
          setStartDateLocation("");
          setEndDateLocation("");
          setResidualValue("");
          setMargeValue("");
        } else {
          setModalDeleteFailed(true);
        }
        console.log(data);
      });
  };

  const save = () => {
    console.log("Click enregistrer");
    fetch(`${BACKEND_ADDRESS}/scenary/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: selectionClient,
        name: scenarioName,
        type: equipementType,
        duration: locationDuration,
        amount: amountFinance,
        creationDate: creationDate,
        contratStart: startDateLocation,
        contratEnd: endDateLocation,
        residualValue: residualValue,
        links: "TEST",
        marge: margeValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setModalSaveSuccess(true);
          setScenaryName(data.name);
        } else {
          console.log("DATA =>", data);
          setModalSaveFailed(true);
        }
      });
  };

  const submit = () => {
    console.log("Click validation");
    fetch(`${BACKEND_ADDRESS}/contrat/addContrat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: selectionClient,
        name: scenarioName,
        type: equipementType,
        duration: locationDuration,
        amount: amountFinance,
        creationDate: creationDate,
        contratStart: startDateLocation,
        contratEnd: endDateLocation,
        residualValue: residualValue,
        links: "TEST",
        marge: margeValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA CONTRAT =>", data);
        if (data.result) {
          setModalSubmitSuccess(true);
          setOldScenario(false);
          setSelectionClient("");
          setCreationDate(date.toISOString().substring(0, 10));
          setScenarioName("");
          setEquipementType("");
          setLocationDuration("");
          setAmountFinance("");
          setStartDateLocation("");
          setEndDateLocation("");
          setResidualValue("");
          setMargeValue("");
          //   setTimeout(function(){
          //     router.push('/scenario')
          // },1000);
        } else {
          setModalSubmitFailed(true);
        }
      });
  };

  const cancelModal = () => {
    setModalSaveSuccess(false);
    setModalSaveFailed(false);
    setModalDeleteSuccess(false);
    setModalDeleteFailed(false);
    setModalModifierFailed(false);
    setModalModifierSuccess(false);
    setModalSubmitFailed(false);
  };

  const handleOkContrat = () => {
    setModalSubmitSuccess(false);
    router.push('/allContrat')
  };

  const handleSaveScenario = () => {
    setModalSaveSuccess(false);
  };

  const returnScenario = () => {
    router.push('/scenario')
  };

  let header;
  if (oldScenario) {
    header = <h1 className={style.head}>Scenario : {selectionClient}</h1>;
  } else {
    header = <h1 className={style.head}>Nouveau Scenario</h1>;
  }

  console.log("creation date", creationDate);
  return (
    <>
      <div className={style.mainContainer}>
        <Navbar />
        <div className={style.header}>{header}</div>
        <div className={style.container}>
          <div className={style.leftSection}>
            <select
              className={style.input}
              onChange={(e) => setSelectionClient(e.target.value)}
              value={selectionClient}
            >
              <option>Client 1</option>
              <option>Client 2</option>
              <option>6396041f066842463b1fa74a</option>
            </select>
            <p className={style.para}>Date de création :</p>
            <input
              className={style.input}
              type="date"
              onChange={(e) => setCreationDate(e.target.value)}
              value={creationDate}
            />
            <input
              type="text"
              className={style.input}
              onChange={(e) => setScenarioName(e.target.value)}
              value={scenarioName}
              placeholder="Nom du scénario"
            />
            <input
              type="text"
              className={style.input}
              onChange={(e) => setEquipementType(e.target.value)}
              value={equipementType}
              placeholder="Type d'équipement"
            />
            <p className={style.para + " " + style.trois}>Durée (mois) :</p>
            <select
              className={style.input}
              onChange={(e) => setLocationDuration(e.target.value)}
              value={locationDuration}
            >
              <option>6</option>
              <option>12</option>
              <option>24</option>
            </select>
            <input
              type="text"
              className={style.input}
              onChange={(e) => setAmountFinance(e.target.value)}
              value={amountFinance}
              placeholder="Montant financé (€)"
            />
            <input
              type="text"
              className={style.input}
              onChange={(e) => setMargeValue(e.target.value)}
              value={margeValue}
              placeholder="Marge (%)"
            />
            <p className={style.para + " " + style.un}>Date de début :</p>
            <input
              className={style.input}
              type="date"
              onChange={(e) => setStartDateLocation(e.target.value)}
              value={startDateLocation}
            />
            <p className={style.para + " " + style.de}>Date de fin :</p>
            <input
              className={style.input}
              type="date"
              onChange={(e) => setEndDateLocation(e.target.value)}
              value={endDateLocation}
            />
            <p className={style.para}>Valeur résiduelle :</p>
            <select
              className={style.input}
              onChange={(e) => setResidualValue(e.target.value)}
              value={residualValue}
            >
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
              {oldScenario && (
                <button className={style.button} onClick={() => modification()}>
                  Modifier
                </button>
              )}
              {oldScenario && (
                <button className={style.button} onClick={() => deletion()}>
                  Supprimer
                </button>
              )}
              {!oldScenario && (
                <button className={style.button} onClick={() => save()}>
                  Enregistrer
                </button>
              )}
            </div>
            <div className={style.graphic}>
            {/* <img
              className={style.img}
              src="/graphic.png"
              alt="Graphique temporaire"
            /> */}
              <XYPlot width={700} height={450}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <MarkSeries data={dataGraph} />
              </XYPlot>
            </div>
            <div className={style.buttonBottom}>
              <button
                className={style.button + " " + style.bottomBtn}
                onClick={() => submit()}
              >
                Valider ce scénario en contrat
              </button>
            </div>
          </div>
          <Modal onCancel={() => handleSaveScenario()} open={modalSaveSuccess} footer={null}>
            <p style={{fontSize: 18, textAlign: 'center'}} className={style.modalSave}>✅ Scenario eneregistré ! ✅</p>
            <div className={style.divSaveBtnModal}>
              <button className={style.button + ' ' + style.scenarioBtnModal} onClick={() => returnScenario()}>Retourner sur la page scenarios</button>
            </div>
          </Modal>
          <Modal
            onCancel={() => cancelModal()}
            open={modalSaveFailed}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ Merci de remplir tous les champs ! ❌
            </p>
          </Modal>
          <Modal
            onCancel={() => cancelModal()}
            open={modalDeleteSuccess}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ✅ Scenario supprimé ! ✅
            </p>
          </Modal>
          <Modal
            onCancel={() => cancelModal()}
            open={modalDeleteFailed}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ Scenario non supprimé ! ❌
            </p>
          </Modal>
          <Modal
            onCancel={() => cancelModal()}
            open={modalModifierSuccess}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ✅ Scenario modifié ! ✅
            </p>
          </Modal>
          <Modal
            onCancel={() => cancelModal()}
            open={modalModifierFailed}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ Scenario non modifié ! ❌
            </p>
          </Modal>
          <Modal
            onCancel={() => handleOkContrat()}
            open={modalSubmitSuccess}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ✅ Scenario validé et transformer en contrat ! ✅
            </p>
          </Modal>
          <Modal
            onCancel={() => cancelModal()}
            open={modalSubmitFailed}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ Echec de la transformation en contrat ! ❌
            </p>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default NewScenario;
