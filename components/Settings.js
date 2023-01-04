import React, { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import style from "../styles/Settings.module.css";
import { useSelector } from "react-redux";
import { Modal } from "antd";

const Settings = () => {
  const BACKEND_ADDRESS = "https://easylease-backend.vercel.app";
  const user = useSelector((state) => state.user.value);
  const [emailSettings, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordModified, setPasswordModified] = useState(false);

  const handleChangeClient = () => {
    fetch(`${BACKEND_ADDRESS}/users/updateMdp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailSettings,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmedPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Error fetching data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          console.log("Mot de passe modifié!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmedPassword("");
          setPasswordModified(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={style.main}>
      <Navbar styleSettings={{ backgroundColor: "#2A9C90" }} />
      <Header name="Options" />

      <div className={style.container}>
        <div className={style.form}>
          <label>Adresse email</label>
          <input
            className={style.input + " " + style.disabled}
            type="email"
            name="email"
            id="email"
            value={emailSettings}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label>Mot de passe actuel</label>
          <input
            className={style.input}
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          ></input>

          <label>Nouveau mot de passe</label>
          <input
            className={style.input}
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>

          <label>Confirmer le nouveau mot de passe</label>
          <input
            className={style.input}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          ></input>

          <button
            className={style.button}
            type="submit"
            onClick={() => handleChangeClient()}
          >
            Enregistrer les modifications
          </button>
          {passwordModified && (
            <div className={style.modal}>
              <Modal closable={false} footer={null} open={passwordModified}>
                <div className={style.modalContainer}>
                  <span>Mot de passe modifié !</span>
                  <button
                    className={style.button}
                    onClick={() => setPasswordModified(false)}
                  >
                    Ok
                  </button>
                </div>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
