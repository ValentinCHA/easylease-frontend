import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const user = useSelector((state) => state.user.value);
  
const router = useRouter();

function redirect (page) {

    if (!user.token) {
      router.push('/login');
    } else {
      router.push(`/${page}`)
    };
};

module.exports = { redirect };