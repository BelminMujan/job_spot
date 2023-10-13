import React, { ChangeEvent, KeyboardEventHandler } from "react";

interface InputTypes {
    label: string,
    type?: string,
    value: number | string,
    onChange: (value: string) => void,
    error?: any,
    inputmode?: any,
    name?: string,
    onSubmit?: () => void
}

const Input: React.FC<InputTypes> = ({ label, type, value, onChange, error, inputmode = "text", name, onSubmit }) => {
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (onSubmit && e.keyCode === 13) {
            onSubmit()
        }
    }
    return <label className={`input_wrapper ${error ? "error" : ""}`}>
        {label}
        <input
            className="input_field"
            name={name || ""}
            inputMode={inputmode}
            autoCapitalize={(type === "email" || type === "password") ? "none" : ""}
            type={type || "text"}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={(e) => onChange(e.target.value)} />
        {error && <p className="error_message">{error?.message}</p>}
    </label>
}

export default Input