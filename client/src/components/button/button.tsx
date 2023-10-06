import React, { ReactNode } from "react";

interface buttonTypes {
    action: () => void,
    children: ReactNode
}

const Button: React.FC<buttonTypes> = ({ action, children }) => {
    return <button className={`button`} type="button" onClick={action}>{children}</button>
}

export default Button