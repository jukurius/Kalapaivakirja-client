import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                user: response.data.user,
                accessToken: response.data.token,
                img: response.data.img
            }
        });
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;