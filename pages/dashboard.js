const { redirect } = require("../components/isLogged.js");
import Head from 'next/head';
import Dashboard from '../components/Dashboard';

function DashboardPage() {
redirect();
  return (
    <>
      <Head>
        <title>Dashboard / EasyLease</title>
      </Head>
      <Dashboard />
    </>
  );
}

export default DashboardPage;