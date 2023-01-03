const { redirect } = require("../components/isLogged.js");
import Home from '../components/Home';
import Head from 'next/head';

function HomePage() {
  redirect();

  return (
    <>
      <Head>
        <title>Home / EasyLease</title>
      </Head>
      <Home />
    </>
  );
}

export default HomePage;
