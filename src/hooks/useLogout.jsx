import axios from "../api/axios";
import useAuth from "./useAuth";
import { notify } from "../components/reuseables/NotificationService";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            await axios('/logout', {
                withCredentials: true
            });
            notify('Toivottavasti nähdään pian 🫡', 'success');
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;