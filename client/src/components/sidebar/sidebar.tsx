import React from "react";
import { NavLink } from "react-router-dom";

interface sidebarProps {
    items: Array<{ title: string, to: string }>
}

const Sidebar: React.FC<sidebarProps> = ({ items }) => {
    return <div className="sidebar_wrapper">
        {items && items.map(item => {
            return <NavLink key={item.to} to={item.to}>{item.title}</NavLink>
        })}
    </div>
}

export default Sidebar