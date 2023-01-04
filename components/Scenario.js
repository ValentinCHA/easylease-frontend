/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
import React from "react";
import style from "../styles/Scenario.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addId } from "../reducers/scenario";

function Scenario(props) {
  console.log("PROPS FROM ALL SCENARIO", props);
  const idScenario = useSelector((state) => state.scenario.value);

  const router = useRouter();

  const dispatch = useDispatch();

  const affichePageScenario = () => {
    console.log('the props',props)
    dispatch(addId(props));
    //  console.log('valeur reducer scenario',idScenario.id)
    router.push("/newScenario");
  };

  console.log("ID SCENARIO FROM CARD", idScenario);

  return (
    // contenue de ma card contrat
    <div className={style.card} onClick={() => affichePageScenario()}>
      {/* icon de scenario /}
      <FontAwesomeIcon icon={faFileSignature} className={style.userIcon} />
      {/ info du scenario */}
      <div className={style.infoContrat}>
        <span
          style={{
            fontSize: 23,
            color: "white",
            fontSize: "1.4em",
            fontWeight: "bold",
          }}
        >
          {props.client.name}
        </span>
        <span style={{ fontSize: 23, color: "white", fontSize: "1.2em" }}>
          {props.name}
        </span>
        <div style={{ backgroundColor: "white", width: "50%" }}>
          <span
            style={{
              paddingLeft: "2px",
              fontSize: 23,
              color: "#3A3E9C",
              fontSize: "1.0em",
            }}
          >
            {props.amount}€
          </span>
        </div>
        <span
          style={{
            fontSize: 23,
            color: "white",
            fontSize: "1.0em",
            fontWeight: "lighter",
          }}
        >
          {props.creationDate.substring(0, 10)}
        </span>
      </div>
    </div>
  );
}

export default Scenario;
