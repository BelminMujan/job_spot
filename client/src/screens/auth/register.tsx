import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Input from "@component/input/input";
import Button from "@component/button/button";
import Api from "../../api/api";

interface dataStateTypes {
    email: string,
    password: string,
    password_confirm: string
}

const Register: React.FC = () => {
    const [data, setData] = useState<dataStateTypes>({
        email: "",
        password: "",
        password_confirm: "",
    })
    const [error, setError] = useState([])
    const api = new Api()
    const navigate = useNavigate()
    const handleChange = (key: string, value: string) => {
        setData(prev => ({ ...prev, [key.toLowerCase().replaceAll(" ", "")]: value }))
    }

    const handleRegister = async () => {
        api.post("/auth/register", data).then(res => {
            console.log(res);
            return navigate("/login")
        }).catch(e => {
            console.log("error");
            console.log(e);
            setError(e)
        })
    }

    const getError = (key: string) => {
        let err = error?.filter((e: { key: string, message: string }) => e.key === key)?.[0]
        return err
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
        },
        {
            key: "password_confirm",
            label: "Password confirm",
            type: "password"
        }
    ]
    return <div className="auth_wrapper">
        <div className="content">
            {fields.map(field => {
                return <Input type={field.type} key={field.key} inputmode={field.inputmode} error={error && getError(field.key)} label={field.label} value={data?.[field.key as keyof dataStateTypes]} onChange={(v) => handleChange(field.key, v)} />
            })}
            <Button action={handleRegister}>Register</Button>
            <p className="info">Already have an account? <Link to="/login">Log in</Link></p>
        </div>

    </div>
}

export default Register