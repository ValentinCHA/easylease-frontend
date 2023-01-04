import React, { useEffect, useState } from "react";
import style from "../styles/AllContratPage.module.css";
import Navbar from "./Navbar";
import ContratCard from "./ContratCard";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function AllContrat() {
  let BACKEND_ADDRESS = "https://easylease-backend.vercel.app";
  const user = useSelector((state) => state.user.value);
  const [inputValue, setInputValue] = useState("");
  // const [nameClient, setNameClient] = useState("");
  const [dataContrat, setDataContrat] = useState([]);

  console.log("Console log de l'état", dataContrat);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/contrat/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("dataaaaa", data);
          setDataContrat(data.userInfos.contrats);
        }
      });
  }, []);

  const infoContrat = dataContrat
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
      return <ContratCard key={i} {...data} />;
    });

  return (
    <>
      {/* {/* navbar et header /} */}
      <div className={style.main}>
        <Navbar styleAllContrats={{ backgroundColor: "#2A9C90" }} />
        <Header name="Contrats" />
        <div className={style.container}>
          {/* {/ mon input de recherche /} */}
          <div className={style.search}>
            <input
              className={style.input}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="  Chercher un contrat....."
              value={inputValue}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />
          </div>
          {/* {/ div qui contiendra tout mes coponents contrat Card /} */}
          <div className={style.containerContratCard}>{infoContrat}</div>
        </div>
        {/* span voir plus */}
        {/* <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "rgb(101,94,255)",
            cursor: "pointer",
            marginTop: -40,
          }}
        >
          voir plus...
        </span> */}
      </div>
    </>
  );
}

export default AllContrat;
