import React, { useEffect, useState } from "react";
import style from "../styles/AllScenario.module.css";
import Navbar from "./Navbar";
import Scenario from "./Scenario";
import { removeId } from "../reducers/scenario";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

function AllScenario() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [dataScenario, setDataScenario] = useState([]);
  const user = useSelector((state) => state.user.value);

  const afficheNewScenarioPage = () => {
    dispatch(removeId());
    router.push("/newScenario");
  };

  useEffect(() => {
    fetch(`http://localhost:3000/scenary/token/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("data find", data);
          const scenario = data.userInfos.scenary.map((data, i) => {
            return {
              _id: data._id,
              client: data.client.name,
              name: data.name,
              type: data.type,
              durée: data.duration,
              montant: data.amount,
              creationDate: data.creationDate,
              date_de_début: data.contratStart,
              date_de_fin: data.contratEnd,
              valeur_résiduel: data.residualValue,
            };
          });
          setDataScenario(scenario);
        }
      });
  }, []);
  console.log("le data", dataScenario);
  const infoContrat = dataScenario
    .filter((data) => {
      if (inputValue == "") {
        return data;
      } else if (
        data.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
      ) {
        return data;
      }
    })
    .map((data, i) => {
      return <Scenario key={i} {...data} id={data._id} />;
    });

  return (
    <>
      {/* {/* navbar et header /} */}
      <div className={style.main}>
        <Navbar styleScenario={{ backgroundColor: "" }} />
        <Header name="Scenarios" />
        <div className={style.container}>
          {/* {/ mon input de recherche /} */}
          <div className={style.search}>
            <input
              className={style.input}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="  Search scenario....."
              value={inputValue}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />

            <button
              className={style.nouveauContrat}
              onClick={() => afficheNewScenarioPage()}
            >
              Nouveau scenario
            </button>
          </div>
          {/* {/ div qui contiendra tout mes coponents contrat Card /} */}
          <div className={style.containerScenarioCard}>{infoContrat}</div>
        </div>
        {/* span voir plus */}
        {/* <span
          style={{display: "flex", justifyContent: "center", alignItems: "center", color: "rgb(101,94,255)" ,cursor: "pointer" ,marginTop: -40,}}>voir plus...</span> */}
      </div>
    </>
  );
}

export default AllScenario;
