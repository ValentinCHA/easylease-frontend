const { redirect } = require("../components/isLogged.js");
import Head from 'next/head';
import AllScenario from '../components/AllScenario';

function AllScenarioPage() {
  redirect();
  return (
    <>
      <Head>
        <title>AllScenario / EasyLease</title>
      </Head>
      <AllScenario />
    </>
  );
}

export default AllScenarioPage;
