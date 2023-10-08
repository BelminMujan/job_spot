import Api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { iUser, setUser } from '@slice/userSlice';
import { useAppDispatch } from './useRedux';


const useAuth = () => {
    const navigate = useNavigate()
    const api = new Api()
    const dispatch = useAppDispatch()

    const loadUser = () => {
        api.get("/auth/load_user").then(res => {
            console.log("res");
            console.log(res);
            dispatch(setUser(res as iUser))
        }).catch(e => {
            console.log("Error loading user:");
            console.log(e);
        })
    }

    const login = (data: { email: string, password: string }) => {
        return api.post("/auth/login", data).then(user => {
            dispatch(setUser(user as iUser))
            return navigate("/admin/settings")
        }).catch(e => {
            return e
        })
    };

    const logout = () => {
        api.logout()
    };

    return { login, logout, loadUser };
};

export default useAuth;