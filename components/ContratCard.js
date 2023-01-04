/* eslint-disable react/prop-types */
/* eslint-disable no-dupe-keys */
import React from "react";
import style from "../styles/ContratCard.module.css";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addId } from "../reducers/contrat";

function ContratCard(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  // console.log(("JE SUIS LES PROPS =>", props));

  const affichePageContrat = () => {
    dispatch(addId(props));
    router.push("/contrat");
  };

  return (
    // contenue de ma card contrat
    <div className={style.card} onClick={() => affichePageContrat()}>
      {/* icon de contrat /}
      <FontAwesomeIcon icon={faFileSignature} className={style.userIcon} />
      {/ info du contrat */}
      <div className={style.infoContrat}>
        <span
          style={{
            fontSize: 23,
            color: "white",
            fontSize: "1.4em",
            fontWeight: "bold",
          }}
        >
          {/* {props.client.substring(0, 10)} */}
          {props.client.name}
        </span>
        <span
          style={{
            fontSize: 23,
            color: "white",
            fontSize: "1.4em",
            fontWeight: "bold",
          }}
        >
          {props.name}
          {/* {JSON.stringify(props.name).replace(/\"/g, "")} */}
        </span>
        <span style={{ fontSize: 23, color: "white", fontSize: "1.0em" }}>
          {props.type}
          {/* {JSON.stringify(props.type).replace(/\"/g, "")} */}
        </span>
        <span style={{ fontSize: 23, color: "white", fontSize: "1.0em" }}>
          {/* {props.creationDate.substring(0, 10)} */}
        </span>
      </div>
    </div>
  );
}

export default ContratCard;
