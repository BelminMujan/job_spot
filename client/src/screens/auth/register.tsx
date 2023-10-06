import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Input from "@component/input/input";
import Button from "@component/button/button";
import Api from "../../api/api";

interface dataStateTypes {
    email: string,
    password: string,
    passwordconfirm: string
}

const Register: React.FC = () => {
    const [data, setData] = useState<dataStateTypes>({
        email: "",
        password: "",
        passwordconfirm: "",
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

    const fields = ["Email", "Password", "Password confirm"]
    return <div className="auth_wrapper">
        <div className="content">
            {fields.map(field => {
                let key = field.toLowerCase().replaceAll(" ", "")
                return <Input key={key} error={getError(key)} label={field} value={data?.[field as keyof dataStateTypes]} onChange={(v) => handleChange(field, v)} />
            })}
            <Button action={handleRegister}>Register</Button>
            <p className="info">Already have an account? <Link to="/login">Log in</Link></p>
        </div>

    </div>
}

export default Register