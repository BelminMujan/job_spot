import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@component/button/button";

const NotFound: React.FC = () => {
    const navigate = useNavigate()
    return <div className="not_found_wrapper">
        <h1>Oops!</h1>
        <h5>404 - Page not found</h5>
        <p>The page you are looking for might have been removed <br /> had it's name chagnged or is temporarily unavailable</p>
        <Button action={() => navigate("/")}>Go to homepage</Button>
    </div>
}
export default NotFound