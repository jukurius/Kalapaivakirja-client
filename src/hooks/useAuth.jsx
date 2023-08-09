import { useContext, useDebugValue } from "react";
import { AppContext } from "../AppContext";

const useAuth = () => {
    const { auth } = useContext(AppContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AppContext);
}

export default useAuth;