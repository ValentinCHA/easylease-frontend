import Head from 'next/head';
import Dashboard from '../components/Dashboard';
import { redirect } from "../components/isLogged.js"
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function DashboardPage() {

//   const user = useSelector((state) => state.user.value);
  
// const router = useRouter();
  redirect("dashboard");
//   function redirect(page) {

//     if (!user.token) {
//       return router.push('/login');
//     } else {
//       return router.push(`/${page}`)
//     };
// };
// redirect("dashboard")
  
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