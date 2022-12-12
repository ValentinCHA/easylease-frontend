import React from "react";
import style from "../styles/AllContrat.module.css";
import Navbar from "./Navbar";
import ContratCard from "./ContratCard";

function AllContrat() {
  return (
    <>
      <Navbar />
      <div className={style.header}>
        <h1 className={style.head}>AllContrat</h1>
      </div>
      <div className={style.container}></div>
    </>
  );
}

export default AllContrat;
