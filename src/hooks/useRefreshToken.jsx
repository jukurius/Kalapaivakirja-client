import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log("moi", response.data);
            return {
                ...prev,
                user: response.data.user,
                accessToken: response.data.token 
            }
        });
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;