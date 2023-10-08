import React from "react";

interface InputTypes {
    label: string,
    type?: string,
    value: number | string,
    onChange: (value: string) => void,
    error?: any,
    inputmode?: any,
    name?:string
}

const Input: React.FC<InputTypes> = ({ label, type, value, onChange, error, inputmode = "text", name }: InputTypes) => {
    return <label className={`input_wrapper ${error ? "error" : ""}`}>
        {label}
        <input name={name || ""} inputMode={inputmode} autoCapitalize={(type === "email" || type === "password") ? "none" : ""} type={type || "text"} value={value} onChange={(e) => onChange(e.target.value)} />
        {error && <p className="error_message">{error?.message}</p>}
    </label>
}

export default Input