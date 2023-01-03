import Head from 'next/head';
import Dashboard from '../components/Dashboard';
import { redirect } from "../components/isLogged.js"

function DashboardPage() {

  redirect("dashboard");
  
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