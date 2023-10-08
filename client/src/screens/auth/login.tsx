import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Input from "@component/input/input";
import Button from "@component/button/button";
import Api from "../../api/api";
import useAuth from "@hook/useAuth";

interface dataStateTypes {
    email: string,
    password: string
}


const Login: React.FC = () => {
    const [data, setData] = useState<dataStateTypes>({
        email: "",
        password: ""
    })
    const [error, setError] = useState<any>(null)
    useEffect(() => {
        setError(null)
    }, [data])
    const api = new Api()
    const navigate = useNavigate()
    const handleChange = (key: string, value: string) => {
        setData(prev => ({ ...prev, [key.toLowerCase()]: value }))
    }
    const auth = useAuth()
    const handleLogin = async () => {
        console.log("logging");
        let err = await auth.login(data)
        setError(err)
    }

    const fields = [
        {
            key: "email",
            label: "Email",
            type: "email",
            inputmode: "email"
        },
        {
            key: "password",
            label: "Password",
            type: "password"
        }
    ]
    
    return <div className="auth_wrapper">
        <div className="content">
            {fields.map(field => {
                let err = (data?.[field.key] === "" && error) ? { error: true } : null
                return <Input type={field.type} key={field.key} inputmode={field.inputmode} error={err} label={field.label} value={data?.[field.key as keyof dataStateTypes]} onChange={(v) => handleChange(field.key, v)} />
            })}
            <p className="error_message">{error?.message}</p>
            <Button action={handleLogin}>Login</Button>
            <Link to="/reset_password">Reset password</Link>
            <p className="info">Don't have an account? <Link to="/register">Register</Link></p>
        </div>

    </div>
}

export default Login