import React, { useEffect, useState } from "react";
import style from "../styles/AllClients.module.css";
import Navbar from "./Navbar";
import ClientCard from "./ClientCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Header from "./Header";
import { useRouter } from "next/router";

function AllClient() {
  let BACKEND_ADDRESS = "https://easylease-backend.vercel.app";
  const [inputValue, setInputValue] = useState("");
  const [dataClient, setDataClient] = useState([]);
  const router = useRouter();

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/client/test/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // console.log('data find',data.contrat)
          setDataClient(data.clientsInfos.clients);
        } else {
          console.log("DATA ELSE", data);
        }
      });
  }, []);
  console.log(dataClient);
  const infoClient = dataClient
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
      return <ClientCard key={i} {...data} id={data._id} />;
    });

  return (
    <>
      {/* {/* navbar et header /} */}
      <div className={style.main}>
        <Navbar styleAllClients={{ backgroundColor: "#2A9C90" }} />
        <Header name="Clients" />
        <div className={style.container}>
          {/* {/ mon input de recherche /} */}
          <div className={style.search}>
            <input
              className={style.input}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="  Chercher un client....."
              value={inputValue}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />
            <button
              className={style.nouveauClient}
              onClick={() => router.push("/newClient")}
            >
              Nouveau client
            </button>
          </div>
          {/* {/ span qui affiche le nom du client /} */}
          <span
            style={{
              paddingLeft: 120,
              borderBottom: "2px solid rgb(235,239,242)",
            }}
          ></span>
          {/* {/ div qui contiendra tout mes coponents contrat Card /} */}
          <div className={style.containerClientCard}>{infoClient}</div>
        </div>
        {/* span voir plus */}
        {/* <span
          style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "rgb(101,94,255)", cursor: "pointer", marginTop: -40, }}>voir plus...</span> */}
      </div>
    </>
  );
}

export default AllClient;
