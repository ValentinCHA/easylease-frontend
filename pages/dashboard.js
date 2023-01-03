import Head from 'next/head';
import Dashboard from '../components/Dashboard';
// import { redirect } from "../components/isLogged.js"
const { redirect } = require("../components/isLogged.js");


function DashboardPage() {

//   const user = useSelector((state) => state.user.value);
  
// const router = useRouter();
redirect();
  
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