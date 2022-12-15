import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import style from '../styles/NewScenario.module.css';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { addId } from '../reducers/scenario';
import Header from './Header';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  MarkSeries
} from 'react-vis';
import { removeId } from "../reducers/scenario";


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
    {x: 0, y: 1000, },
    {x: 12, y: 900, },
    {x: 24, y: 800, },
  ];


function NewScenario() {

  const dispatch = useDispatch();
  const router = useRouter();
  const date = new Date();

  const idScenario = useSelector((state) => state.scenario.value);

  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  let BACKEND_ADDRESS = "http://localhost:3000";
  const [selectionClient, setSelectionClient] = useState("");
  const [clientFromCard, setClientFromCard] = useState("")
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

  const [modalSaveFailed, setModalSaveFailed] = useState(false);
  const [modalDeleteSuccess, setModalDeleteSuccess] = useState(false);
  const [modalDeleteFailed, setModalDeleteFailed] = useState(false);
  const [modalModifierFailed, setModalModifierFailed] = useState(false);
  const [modalModifierSuccess, setModalModifierSuccess] = useState(false);
  const [modalSubmitSuccess, setModalSubmitSuccess] = useState(false);
  const [modalSubmitFailed, setModalSubmitFailed] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [oneClient, setOneClient] = useState([]);
  const [selectionInterlocuteur, setSelectionInterlocuteur] = useState({});
  const [selectClientById, setSelectClientById] = useState("");
  const [clientNameFromFetch, setClientNameFromFetch] = useState("");
  const [deleteBtn, setDeleteBtn] = useState(false);

  console.log(idScenario)
  // Check si le scenario est déja enregistrer en BDD//

  useEffect(() => {
    if (selectionClient) {
      fetch(`${BACKEND_ADDRESS}/client/${selectionClient}`)
      .then(response => response.json())
      .then(data => {
        setOneClient([data.client])
        setSelectClientById(data.client._id)
        setClientNameFromFetch(data.client.name)
      })
    }
   }, [selectionClient]);

  console.log("ONE CLIENT =>", oneClient);

  useEffect(() => {
    if (!idScenario._id) {
      fetch(`${BACKEND_ADDRESS}/client/allClients`)
      .then(response => response.json())
      .then(data => {
        //console.log("Liste des clients", data.clients);
        setClientList(data.clients)
      })
    }
    if (idScenario._id) {

      fetch(`${BACKEND_ADDRESS}/scenary/${idScenario._id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          if (data.result){
            setOldScenario(data.result);
            setClientFromCard(data.scenary.name);
            setSelectClientById(data.scenary.client)
            setCreationDate(data.scenary.creationDate.slice(0, 10));
            setScenarioName(data.scenary.name);
            setEquipementType(data.scenary.type);
            setLocationDuration(data.scenary.duration);
            setAmountFinance(data.scenary.amount);
            setStartDateLocation(data.scenary.contratStart.slice(0, 10));
            setEndDateLocation(data.scenary.contratEnd.slice(0, 10));
            setResidualValue(data.scenary.residualValue);
            setMargeValue(data.scenary.marge)
          }
        });
    }
  }, [deleteBtn]);
  console.log("ID SCENARIO.ID" , idScenario._id);
  console.log("START DATE =>", startDateLocation);
  console.log("CLIENT SELECTION =>", selectionClient);
  console.log("CLIENT LIST", clientList);

  const modification = () => {
    console.log("Click modification");
    fetch(`${BACKEND_ADDRESS}/scenary/update/${idScenario._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: selectClientById,
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
        } else {
          console.log("DATA PUT=>", data);
          setModalModifierFailed(true);
        }
      });
  };

  const deletion = () => {
    console.log("Click delete");
    fetch(`${BACKEND_ADDRESS}/scenary/${idScenario._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setModalDeleteSuccess(true);
          setOldScenario(false);
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
    fetch(`${BACKEND_ADDRESS}/scenary/new/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: selectClientById,
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
          dispatch(addId(data.infosScenario))
          setModalSaveSuccess(true);
          setOldScenario(true);
          setSelectionClient("")
        } else {
          console.log("DATA =>", data);
          setModalSaveFailed(true);
        }
      });
  };

  console.log("ID SCENARIO FROM NEW SCENARIO", idScenario);
  console.log("SELECT CLIENT BY ID", selectClientById);
  console.log("SCENARIO NAME +>>>>>>>>>>>>>", scenarioName);

  const submit = () => {
    
    console.log("Click validation");
    fetch(`${BACKEND_ADDRESS}/contrat/addContrat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: selectClientById,
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
          fetch(`${BACKEND_ADDRESS}/scenary/${idScenario._id}`, {
            method: "DELETE",
          })
        } else {
          setModalSubmitFailed(true);
        }
      });
  };

  const cancelModal = () => {
    setModalSaveSuccess(false);
    setModalSaveFailed(false);
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

  const handleDeleteOk = () => {
       setModalDeleteSuccess(false);
      //  router.push('/allScenario')
      setDeleteBtn(true);
      dispatch(removeId())
  }

  const returnScenario = () => {
    router.push('/allScenario')
  };

let header;
  if (oldScenario) {
    header = `Nom du scénario : ${scenarioName}`
  } else {
    header = "Nouveau Scenario"
  }
  console.log("SECNARIO NAME", scenarioName);
  let clientsListDeroulante;
  if (clientList) {
   clientsListDeroulante =  clientList.map((data, i) => {
      return (
        <option key={i}>{data.name}</option>
      )
    })
  }

  let interlocutorListDeroulante;
  if (oneClient) {
    interlocutorListDeroulante = oneClient.map((data, i) => {
      return (
        <option key={i}>{data.interlocutor.name}</option>
      )
    })
  }

  console.log("creation date", creationDate);
  console.log("Client selectionné =>", selectionClient);
  return (
    <>
      <div className={style.mainContainer}>
        <Navbar styleScenario={{backgroundColor: "rgba(0, 217, 255, 0.383)"}}/>
        <Header name ={header}/>
        <div className={style.container}>
          <div className={style.leftSection}>
           {oldScenario && <p className={style.nomClient}>Nom du client : {`${clientNameFromFetch} ${clientFromCard}`}</p>}
          {!oldScenario && <select
              className={style.input}
              onChange={(e) => setSelectionClient(e.target.value)}
              value={selectionClient}
              defaultValue
            >
              <option value="" disabled selected hidden>Choisisez un client</option>
              {clientsListDeroulante}
            </select>}
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
              <option value="" disabled selected hidden>Choisisez une durée de location</option>
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
              <option value="" disabled selected hidden>Choisisez une valeur résiduelle</option>
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
            <XYPlot width={750} height={500}>
                  <LineMarkSeries
                    data={dataGraph}
                    xType="time"
                    yType="linear"
                    size={3}
                    color="#007bff"
                  />
                  <XAxis title="Mois" />
                  <YAxis title="Montant" />
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
          <Modal onCancel={() => handleSaveScenario()} open={modalSaveSuccess} footer={null} className={style.modalSuccess}>
            <p style={{fontSize: 22, textAlign: 'center'}} className={style.modalSave}>✅ Scenario eneregistré ! ✅</p>
            <p style={{fontSize: 18, textAlign: 'center'}}>Merci de choisir un interlocuteur pour ce scénario :</p>
            <select
              className={style.input + ' ' + style.inputModalInterlocuteur}
              onChange={(e) => setSelectionInterlocuteur(e.target.value)}
              value={selectionInterlocuteur}
              defaultValue
            >
              <option value="" disabled selected hidden>Choisisez un interlocuteur</option>
              {interlocutorListDeroulante}
            </select>
            <div className={style.divSaveBtnModal}>
              <button className={style.button + ' ' + style.scenarioBtnModal} onClick={() => addInterlocutor()}>Ajout interlocuteur</button>
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
            onCancel={() => handleDeleteOk()}
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
