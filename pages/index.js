/* eslint-disable react/react-in-jsx-scope */
import Home from '../components/Home';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function HomePage() {
  
  const user = useSelector((state) => state.user.value);
  
  const router = useRouter();

  if (!user.token) {
    router.push('/login');
  } else {
    router.push('/dashboard')
  }

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
