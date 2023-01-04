import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';


function redirect() {
  const user = useSelector((state) => state.user.value);
  
const router = useRouter();

    if (!user.token) {
      router.push('/login');
    } 
}

// eslint-disable-next-line no-undef
module.exports = {redirect};