import { useState, useEffect } from 'react';
import Api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { removeUser, setUser } from '@slice/userSlice';
import { useAppDispatch, useAppSelector } from './useRedux';


const useAuth = () => {
    const navigate = useNavigate()
    const api = new Api()
    const dispatch = useAppDispatch()

    const loadUser = () => {
        api.get("/auth/load_user").then(res => {
            console.log("res");
            console.log(res);
            dispatch(setUser(res as {}))
        }).catch(e => {
            console.log("e");
            console.log(e);
            return e
        })
    }

    const login = (data: { email: string, password: string }) => {
        return api.post("/auth/login", data).then(user => {
            dispatch(setUser(user as {}))
            return navigate("/admin/settings")
        }).catch(e => {
            return e
        })
    };

    const logout = () => {
        api.logout()
    };

    // useEffect(() => {
    //     const checkAuthentication = () => {
    //         if (!user?.id || !user?.email) {
    //             dispatch(removeUser())
    //             setIsAuthenticated(false)
    //             logout();
    //         } else {
    //             setIsAuthenticated(true)
    //         }
    //     };

    //     checkAuthentication();
    // }, []);

    return { login, logout, loadUser };
};

export default useAuth;