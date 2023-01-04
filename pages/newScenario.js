const { redirect } = require("../components/isLogged.js");
import Head from 'next/head';
import NewScenario from '../components/NewScenario';

function NewScenarioPage() {
  redirect();
  return (
    <>
      <Head>
        <title>Nouveau Scenario / EasyLease</title>
      </Head>
      <NewScenario />
    </>
  );
}

export default NewScenarioPage;
