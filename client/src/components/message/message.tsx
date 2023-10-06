import React from "react";

interface iMessage {
    isCurrent: boolean,
    message: string
}

const Message: React.FC<iMessage> = ({ isCurrent, message }) => {
    return <div className={`message_wrapper ${isCurrent ? "right" : "left"}`}>{message}</div>


}
export default Message