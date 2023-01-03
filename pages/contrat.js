const { redirect } = require("../components/isLogged.js");
import Head from "next/head";
import Contrat from "../components/Contrat";

function ContratPage() {
  redirect();
  return (
    <>
      <Head>
        <title>Contrat / EasyLease</title>
      </Head>
      <Contrat />
    </>
  );
} 

export default ContratPage;