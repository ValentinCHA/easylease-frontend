import Head from 'next/head';
import NewScenario from '../components/NewScenario';

function NewScenarioPage() {
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