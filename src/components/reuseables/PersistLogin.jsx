import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, isLogged } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // isLogged added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && isLogged ? verifyRefreshToken() : setIsLoading(false);
    // !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  // useEffect(() => {
  //     console.log(`isLoading: ${isLoading}`)
  //     console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
  // }, [isLoading])
  return (
    <>{!isLogged ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
