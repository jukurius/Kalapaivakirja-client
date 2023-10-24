import { useState, useEffect, useContext } from 'react';
import useAxiosPrivate  from '../hooks/useAxiosPrivate';
import { AppContext } from '../AppContext';

const MyAccount = () => {
  const [user, setUser] = useState({})
  const { auth } = useContext(AppContext);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get(`/user?username=${auth?.user}`)
        setUser(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser();
  }, [])
  console.log(user)
  return (
    <div>MyAccount</div>
  )
}

export default MyAccount