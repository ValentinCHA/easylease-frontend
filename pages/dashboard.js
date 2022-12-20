import Head from 'next/head';
import Dashboard from '../components/Dashboard';

function DashboardPage() {
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