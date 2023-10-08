import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@component/sidebar/sidebar";
import { sidebarItems } from "../../constants/adminSidebar";
import useAuth from "@hook/useAuth";
import Api from "../../api/api";
import { useAppSelector } from "@hook/useRedux";
const Admin: React.FC = () => {
    const auth = useAuth()
    const { user } = useAppSelector(state => state.user)
    useEffect(() => {
        auth.loadUser()
    }, [])

    return < div className="admin_wrapper" >
        {user?.id && <>
            
            <Sidebar items={sidebarItems} />
            <Outlet />
        </>}
    </div >
}

export default Admin