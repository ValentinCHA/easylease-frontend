import Head from 'next/head';
import Dashboard from '../components/Dashboard';
// import { redirect } from "../components/isLogged.js"

function DashboardPage() {

  // redirect("dashboard");
  function redirect(page) {

    if (!user.token) {
      return router.push('/login');
    } else {
      return router.push(`/${page}`)
    };
};
redirect("dashboard")
  
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