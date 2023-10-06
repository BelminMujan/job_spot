import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Input from "@component/input/input";
import { useAppSelector } from "@hook/useRedux";
import Message from "@component/message/message";
import Chat from "@component/chat/chat";
import ChatUsers from "@component/chatUsers/chatUsers";
const Messages: React.FC = () => {

    return <div className="messages_wrapper">
        <ChatUsers />
        <Chat />
    </div>
}

export default Messages