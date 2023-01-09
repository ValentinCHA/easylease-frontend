/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from "next/router";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // URL de redirection pour les conditions d'utilisations //
  const url = "https://google.com";
  // Adresse du backend
  const BACKEND_ADDRESS = "https://easylease-backend.vercel.app";

  // Récuperation du login et MDP pour la connexion (user déja créer) //
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Récuperation du login et MDP pour l'inscription //
  const [firstPassword, setFirstPassword] = useState("");
  const [firstLogin, setFirstLogin] = useState("");
  // States des differentes modales //
  const [firstLoginModal, setFirstLoginModal] = useState(false);
  const [firstLoginModalUser, setFirstLoginModalUser] = useState(false);
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [emailErrorMain, setEmailErrorMain] = useState(false);
  const [emailErrorModal, setEmailErrorModal] = useState(false);
  const [userInnexistant, setUserInnexistant] = useState(false);
  const [modalCreationSuccess, setModalCreationSuccess] = useState(false);
  const [modalLoginSuccess, setModalLoginSuccess] = useState(false);
  //

  // Check si l'email est valide //
  const EMAIL_REGEX =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Savoir si l'user a le droit de cliquer sur "Première connexion" //
  let isAdmin = true;

  // Pour les tests //
  console.log("USERNAME =>", username);
  console.log("PASSWORD =>", password);

  // Redirection dynamique vers la page contrat pour le moment, elle redirigera vers la page dashboard a terme //
  const router = useRouter();
  if (user.token) {
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  }

  // Click sur "Première connexion", la modale s'ouvre //
  const handleFirstLogin = () => {
    console.log("Click Première connexion");
    if (isAdmin) {
      setFirstLoginModal(true);
      console.log("MODAL ?", firstLoginModal);
      return;
    }
    setFirstLoginModalUser(true);
  };

  // Clic en dehors ou sur la croix de la modale //
  const handleCancelFirstLogin = () => {
    setFirstLoginModal(false);
    setFirstLoginModalUser(false);
  };

  const handleCancelForgetPassword = () => {
    setForgetPasswordModal(false);
    setUserInnexistant(false);
  };

  const handleForgotPassword = () => {
    console.log("Click mdp oublié");
    setForgetPasswordModal(true);
  };

  const handleClick = () => {
    window.open('/Conditions.pdf', '_blank');
  };

  const handleSubmit = () => {
    console.log("Sign in submit");
    if (EMAIL_REGEX.test(username)) {
      fetch(`${BACKEND_ADDRESS}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          data.result && setModalLoginSuccess(true);
          dispatch(
            login({
              token: data.token,
              email: data.email,
              poste: data.poste,
              isAdmin: data.isAdmin,
            })
          );
          console.log("CONNECTE");
          if (!data.result) {
            console.log("DATAS DE SUBMIT =>", data);
            setUserInnexistant(true);
          }
        });
    } else {
      setEmailErrorMain(true);
    }
  };

  console.log("FIRST LOGIN", firstLogin);
  console.log("FIRST PASSWORD", firstPassword);

  const handleSignUpSubmit = () => {
    console.log("Sign Up Submit");
    if (EMAIL_REGEX.test(firstLogin)) {
      fetch(`${BACKEND_ADDRESS}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: firstLogin, password: firstPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          data.result && setModalCreationSuccess(true);
          dispatch(
            login({
              token: data.token,
              email: data.email,
              poste: data.poste,
              isAdmin: data.isAdmin,
            })
          );
          console.log("CONNECTE");
        });
    } else {
      setEmailErrorModal(true);
    }
  };

  console.log("USER =>", user);
  return (
    <>
      <div className={styles.mainSection}>
        <img
          className={styles.imgLeft}
          src="/gaucheaccueil.png"
          alt="Logo gauche"
        />
        <div className={styles.loginContainer}>
          <img className={styles.logo} src="/E.png" alt="Logo EasyLease" />
          <div className={styles.loginBox}>
            <h2 className={styles.title}>Connectez vous à votre espace</h2>
            <span className={styles.desc}>Identifiant / e-mail :</span>
            <input
              type="text"
              className={styles.input}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="E-mail"
            />
            {emailErrorMain && (
              <p className={styles.error}>Adresse mail invalide</p>
            )}
            <span
              className={styles.links + " " + styles.first}
              onClick={() => handleFirstLogin()}
            >
              Première connexion ?
            </span>
            <span className={styles.desc + " " + styles.mdp}>
              Mot de passe :
            </span>
            <input
              type="password"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Mot de passe"
            />
            <span
              className={styles.links}
              onClick={() => handleForgotPassword()}
            >
              Mot de passe oublié ?
            </span>
            <button className={styles.button} onClick={() => handleSubmit()}>
              Connexion
            </button>
          </div>
          <a href="#" className={styles.textContent} rel="noreferrer" onClick={handleClick}>
            Conditions d'utilisation
          </a>
        </div>
        <img
          className={styles.imgRight}
          src="/droiteaccueil.png"
          alt="Logo droite"
        />

        <Modal
          onCancel={() => handleCancelFirstLogin()}
          open={firstLoginModal}
          footer={null}
        >
          <div className={styles.loginBoxModal}>
            <h2 className={styles.title}>Bienvenue chez EasyLease</h2>
            <span className={styles.desc + " " + styles.descModal}>
              Nouvel identifiant / e-mail :
            </span>
            <input
              type="text"
              className={styles.input + " " + styles.inputModal}
              onChange={(e) => setFirstLogin(e.target.value)}
              value={firstLogin}
              placeholder="E-mail"
            />
            {emailErrorModal && (
              <p className={styles.error}>Adresse mail invalide</p>
            )}
            <span
              className={
                styles.desc + " " + styles.mdpModal + " " + styles.descModal
              }
            >
              Nouveau mot de passe :
            </span>
            <input
              type="password"
              className={styles.input}
              onChange={(e) => setFirstPassword(e.target.value)}
              value={firstPassword}
              placeholder="Mot de passe"
            />
            <button
              className={styles.button + " " + styles.modalBtn}
              onClick={() => handleSignUpSubmit()}
            >
              Création de compte
            </button>
          </div>
        </Modal>

        <Modal
          onCancel={() => handleCancelFirstLogin()}
          open={firstLoginModalUser}
          footer={null}
        >
          <p style={{ fontSize: 18, textAlign: "center" }}>
            ❌ Vous n'êtes pas l'administrateur vous ne pouvez pas vous créer de
            compte. Veuillez contacter l'administrateur ! ❌
          </p>
        </Modal>

        <Modal
          onCancel={() => handleCancelForgetPassword()}
          open={forgetPasswordModal}
          footer={null}
        >
          <p style={{ fontSize: 18, textAlign: "center" }}>
            Merci de contacter l'administrateur en charge de votre compte !
          </p>
        </Modal>
        <Modal
          onCancel={() => handleCancelForgetPassword()}
          open={userInnexistant}
          footer={null}
        >
          <p style={{ fontSize: 18, textAlign: "center" }}>
            ❌ Utilisateur ou mot de passe incorrect ! ❌
          </p>
        </Modal>
        <Modal
          onCancel={() => setModalCreationSuccess(false)}
          open={modalCreationSuccess}
          footer={null}
        >
          <p style={{ fontSize: 18, textAlign: "center" }}>
            ✅ Utilisateur créer et connecté ! ✅
          </p>
          <p style={{ fontSize: 18, textAlign: "center" }}>
            Redirection en cours ....
          </p>
        </Modal>
        <Modal
          onCancel={() => setModalLoginSuccess(false)}
          open={modalLoginSuccess}
          footer={null}
        >
          <p style={{ fontSize: 18, textAlign: "center" }}>
            ✅ Utilisateur connecté ! ✅
          </p>
          <p style={{ fontSize: 18, textAlign: "center" }}>
            Redirection en cours ....
          </p>
        </Modal>
      </div>
    </>
  );
}

export default Login;
