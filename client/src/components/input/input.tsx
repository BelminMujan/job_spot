import React from "react";

interface InputTypes {
    label: string,
    type?: string,
    value: number | string,
    onChange: (value: string) => void,
    error?: any
}

const Input: React.FC<InputTypes> = ({ label, type, value, onChange, error }: InputTypes) => {
    return <label className={`input_wrapper ${error ? "error" : ""}`}>
        {label}
        <input type={type || "text"} value={value} onChange={(e) => onChange(e.target.value)} />
        {error && <p className="error_message">{error?.message}</p>}
    </label>
}

export default Input