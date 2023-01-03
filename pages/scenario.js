const { redirect } = require("../components/isLogged.js");
import Head from 'next/head';
import Scenario from '../components/Scenario';

function ScenarioPage() {
  redirect();
  return (
    <>
      <Head>
        <title>Contrat / EasyLease</title>
      </Head>
      <Scenario />
    </>
  );
}

export default ScenarioPage;