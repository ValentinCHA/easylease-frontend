import React from "react";
import style from "../styles/Dashboard.module.css";
import Navbar from "./Navbar";
import Header from "./Header";

function Dashboard() {
  return (
    <div className={style.maincontainer}>
      <Navbar styleDashboard={{ backgroundColor: "#2A9C90" }} />
      <Header name="Dashboard" />
      <div className={style.container}>
        <div className={style.graphic}>
          <img
            className={style.img}
            src="/graphic.png"
            alt="Graphique temporaire"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
