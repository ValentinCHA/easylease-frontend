import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import style from '../styles/NewScenario.module.css';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { addId } from '../reducers/scenario';
import Header from './Header';
// import { Line } from 'react-chartjs-2';
import { removeId } from "../reducers/scenario";
import { XYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';



//////// REACT VIS
  const data = [
    { x: 'Jan', y: 100000 },
    { x: 'Feb', y: 85000 },
    { x: 'Mar', y: 73000 },
    { x: 'Apr', y: 63000 },
    { x: 'May', y: 54000 },
    { x: 'Jun', y: 46000 },
    { x: 'Jul', y: 39000 },
    { x: 'Aug', y: 33000 },
    { x: 'Sep', y: 28000 },
    { x: 'Oct', y: 23000 },
    { x: 'Nov', y: 19000 },
    { x: 'Dec', y: 15000 }
  ];
 //const yTickFormat = Format('.4s');
  const options = {
    xType: 'ordinal',
    yType: 'linear',
    xDomain: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yDomain: [15000, 100000]
  };


  //////// CHART JS

  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [
  //     {
  //       label: 'My First dataset',
  //       fill: false,
  //       lineTension: 0.1,
  //       backgroundColor: 'rgba(75,192,192,0.4)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderCapStyle: 'butt',
  //       borderDash: [],
  //       borderDashOffset: 0.0,
  //       borderJoinStyle: 'miter',
  //       pointBorderColor: 'rgba(75,192,192,1)',
  //       pointBackgroundColor: '#fff',
  //       pointBorderWidth: 1,
  //       pointHoverRadius: 5,
  //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //       pointHoverBorderColor: 'rgba(220,220,220,1)',
  //       pointHoverBorderWidth: 2,
  //       pointRadius: 1,
  //       pointHitRadius: 10,
  //       data: [65, 59, 80, 81, 56, 55, 40]
  //     }
  //   ]
  // };
  
  // const options = {
  //   scales: {
  //     yAxes: [{
  //       ticks: {
  //         beginAtZero: true
  //       }
  //     }]
  //   }
  // };
  

function NewScenario() {

  const dispatch = useDispatch();
  const router = useRouter();
  const date = new Date();

  const idScenario = useSelector((state) => state.scenario.value);
  const user = useSelector((state) => state.user.value);

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
  const [modalSaveInterloc, setModalSaveInterloc] = useState(false);
  const [interlocFilter, setInterlocFilter] = useState([]);
  const [modalInterlocError, setModalInterlocError] = useState(false);
  const [addInterlocutorModal, setAddInterlocutorModal] = useState(false);

  const [interlocName, setInterlocName] = useState("");
  const [phoneNumber, setPhoneNumer] = useState("");
  const [interlocFirstName, setInterlocFirstname] = useState("");
  const [interlocMail, setInterlocMail] = useState("");
  const [interlocJob, setInterlocJob] = useState("");

  const [addInterlocutorSucccess, setAddInterlocutorSuccess] = useState(false);
  const [addInterlocutorFailed, setAddInterlocutorFailed] = useState(false);

  console.log(idScenario)
  // Check si le scenario est déja enregistrer en BDD//


  useEffect(() => {
    if (selectionClient) {
      fetch(`${BACKEND_ADDRESS}/client/${selectionClient}`)
      .then(response => response.json())
      .then(data => {
        setOneClient([data.client])
        setSelectClientById(data.client._id);
        setClientNameFromFetch(data.client.name);
        setInterlocFilter([])
      })
    }
   }, [selectionClient, deleteBtn]);

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
          console.log("DATA SCENARIO !!!!!!!!!!!", data);
          if (data.result){
            console.log();
            setOldScenario(data.result);
            fetch(`${BACKEND_ADDRESS}/client/id/${data.scenary.client}`)
            .then(response => response.json())
            .then(data => {
              console.log("DATA 2 EME FETCH", data);
             setClientFromCard(data.client.name);
             setOneClient([data.client])
            })
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
          setSelectionClient("");
        } else {
          console.log("DATA =>", data);
          setModalSaveFailed(true);
        }
      });
  };

  console.log("ID SCENARIO FROM NEW SCENARIO", idScenario);
  console.log("SELECT CLIENT BY ID", selectClientById);
  console.log("SCENARIO NAME +>>>>>>>>>>>>>", scenarioName);
  console.log("SELECTION INTERLOC", selectionInterlocuteur);

  const beforeSubmit = () => {
    setModalSaveInterloc(true);
  };

  const submit = () => {
  if (interlocFilter.length <= 0) {
    setModalInterlocError(true);
    return
  }
    fetch(`${BACKEND_ADDRESS}/contrat/addContrat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: selectClientById,
        name: scenarioName,
        interlocutor: interlocFilter[0]._id,
        type: equipementType,
        duration: locationDuration,
        amount: amountFinance,
        creationDate: creationDate,
        contratStart: startDateLocation,
        contratEnd: endDateLocation,
        residualValue: residualValue,
        links: "TEST",
        marge: margeValue,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA CONTRAT =>>>>", data);
        if (data.result) {
          setModalSaveInterloc(false);
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
          if (idScenario._id) {

            fetch(`${BACKEND_ADDRESS}/scenary/${idScenario._id}`, {
              method: "DELETE",
            })
          }
        } else {
          console.log("DATA ERROR ???", data);
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
    setModalSaveInterloc(false);
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
      setDeleteBtn(!deleteBtn);
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
    for (let clients of oneClient) {
      console.log("ONE CLIENT FOR", clients.interlocutor);
      interlocutorListDeroulante = clients.interlocutor.map((data, i) => {
        return (
          <option key={i}>{data.name}</option>
        )
      })
    }
  };

  const handleCancelModalInterloc = () => {
    setSelectionInterlocuteur("");
    setModalSaveInterloc(false);
  }

  useEffect(() => {
      setInterlocFilter(oneClient[0] ? oneClient[0].interlocutor.filter(e => e.name === selectionInterlocuteur): null);
   },[selectionInterlocuteur])

    console.log("INTERLOC FILTER =>", interlocFilter);

  console.log("creation date", creationDate);
  console.log("Client selectionné =>", selectionClient);

  const addInterlocutor = () => {
    setModalSaveInterloc(false);
    setAddInterlocutorModal(true);
  };

  const interlocutorModal = () => {
    setAddInterlocutorModal(false);
    setModalSaveInterloc(true);
  };
 
  const saveInterlocuteur = () => {
    fetch(`${BACKEND_ADDRESS}/client/addInterlocutor`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client : selectClientById,
        name: interlocName,
        firstname: interlocFirstName,
        phone: phoneNumber,
        poste: interlocJob,
        email: interlocMail,
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        setDeleteBtn(!deleteBtn);
        setAddInterlocutorSuccess(true);
        setAddInterlocutorModal(false);
      } else {
        setAddInterlocutorFailed(true);
      }
    })
  }

  const closeModalInterlocuteurSuccess = () => {
    setModalSaveInterloc(true);
    setAddInterlocutorSuccess(false);
  };

  const closeModalInterlocuteurFailed = () => {
    setModalSaveInterloc(true);
    setAddInterlocutorFailed(false);
  }

  return (
    <>
      <div className={style.mainContainer}>
        <Navbar styleScenario={{backgroundColor: "rgba(0, 217, 255, 0.383)"}}/>
        <Header name ={header}/>
        <div className={style.container}>
          <div className={style.leftSection}>
           {oldScenario && <p className={style.nomClient}>Nom du client : {clientNameFromFetch !== "" ? `${clientNameFromFetch}` :`${clientFromCard}`}</p>}
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
            {/* <XYPlot width={750} height={500} yType="ordinal" {...options}>
                  <LineMarkSeries
                    data={dataGraph}
                    xType="time"
                    yType="linear"
                    size={4}
                    color="#007bff"
                  />
                  <XAxis title="Mois" />
                  <YAxis title="Montant" />
                </XYPlot> */}
                {/* <canvas id="myChart" width="400" height="400"></canvas> */}
                {/* <Line data={data} options={options} /> */}
                <XYPlot width={700} height={500}  {...options}>
                  <LineMarkSeries data={data} />
                  <XAxis title="Mois"/>
                  <YAxis title="Montant"/>
                </XYPlot>
            </div>
            <div className={style.buttonBottom}>
              <button
                className={style.button + " " + style.bottomBtn}
                onClick={() => beforeSubmit()}
              >
                Valider ce scénario en contrat
              </button>
            </div>
          </div>
          <Modal onCancel={() => handleSaveScenario()} open={modalSaveSuccess} footer={null} className={style.modalSuccess}>
            <p style={{fontSize: 22, textAlign: 'center'}} className={style.modalSave}>✅ Scenario eneregistré ! ✅</p>
            <div className={style.divSaveBtnModal}>
              <button className={style.button + ' ' + style.scenarioBtnModal} onClick={() => returnScenario()}>Retourner sur la page scenarios</button>
            </div>
          </Modal>
          <Modal onCancel={() => handleCancelModalInterloc()} open={modalSaveInterloc} footer={null} className={style.modalSuccess}>
          <p style={{fontSize: 18, textAlign: 'center'}}>Merci de choisir un interlocuteur pour ce scénario :</p>
            <select
              className={style.input + ' ' + style.inputModalInterlocuteur}
              onChange={(e) => setSelectionInterlocuteur(e.target.value)}
              value={selectionInterlocuteur}
              defaultValue
            >
              <option value="" selected hidden>Choisisez un interlocuteur</option>
              {interlocutorListDeroulante}
            </select>
            <p style={{fontSize: 17, textAlign: 'center'}} className={style.interlocModal}>L'interlocuteur n'est pas dans la liste ? </p>
            <div className={style.divSaveBtnModal}>
              <button className={style.button + ' ' + style.scenarioBtnModal} onClick={() => addInterlocutor()}>Ajout interlocuteur</button>
              <button className={style.button + ' ' + style.scenarioBtnModal} onClick={() => submit()}>Valider le scenario !</button>
              </div>
          </Modal>
          <Modal
            onCancel={() => interlocutorModal(false)}
            open={addInterlocutorModal}
            footer={null}
          >
            <div className={style.modalInterContainer}>
            <span className={style.textInterModal}>Nouvel Interlocuteur contrat : </span>
              <br />
              <div className={style.InputNewInterlocutorContainer}>
                <input
                  className={style.input + ' ' + style.inputInterloc}
                  placeholder="Nom"
                  type="text"
                  onChange={(e) => setInterlocName(e.target.value)}
                  value={interlocName}
                ></input>
                <br />
                <input
                  className={style.input + ' ' + style.inputInterloc}
                  placeholder="Prénom"
                  type="text"
                  onChange={(e) => setInterlocFirstname(e.target.value)}
                  value={interlocFirstName}
                ></input>
                <br />
                <input
                  className={style.input + ' ' + style.inputInterloc}
                  placeholder="Poste"
                  type="text"
                  onChange={(e) => setInterlocJob(e.target.value)}
                  value={interlocJob}
                ></input>
                <br />
                <input
                  className={style.input + ' ' + style.inputInterloc}
                  placeholder="Numéro de téléphone"
                  type="text"
                  onChange={(e) => setPhoneNumer(e.target.value)}
                  value={phoneNumber}
                ></input>
                <br />
                <input
                  className={style.input + ' ' + style.inputInterloc}
                  placeholder="Email"
                  type="text"
                  onChange={(e) => setInterlocMail(e.target.value)}
                  value={interlocMail}
                ></input>
                <br />
                <div>
                  <button
                    className={style.button + ' ' + style.btnInterModal}
                    onClick={() => saveInterlocuteur()}
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
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
          <Modal
            onCancel={() => setModalInterlocError(false)}
            open={modalInterlocError}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ Vous n'avez pas choisi d'interlocuteur ! ❌
            </p>
          </Modal>
          <Modal
            onCancel={() => closeModalInterlocuteurFailed(false)}
            open={addInterlocutorFailed}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ L'ajout à échoué ! ❌
            </p>
          </Modal>
          <Modal
            onCancel={() => closeModalInterlocuteurSuccess()}
            open={addInterlocutorSucccess}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
            ✅ Interlocuteur ajouté ! ✅
            </p>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default NewScenario;
