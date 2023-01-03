import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';




function redirectPage(page) {
  const user = useSelector((state) => state.user.value);
  
const router = useRouter();

    if (!user.token) {
      router.push('/login');
    } 
};

module.exports = {redirectPage};