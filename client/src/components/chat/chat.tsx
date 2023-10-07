import React, { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@hook/useRedux";
import io from "socket.io-client"
import Message from "@component/message/message";
import sendImg from "../../assets/send.png"
let socket: any

const Chat: React.FC = () => {
    const [mvalue, setMvalue] = useState("")
    const { user } = useAppSelector(state => state.user)
    const [messages, setMessages] = useState<any>([])
    const messagesRef = useRef<null | HTMLDivElement>()
    useEffect(() => {
        socket = io({ path: "/socket" })

        socket.on("connect", () => {
            console.log("Connected to server");
        });
        socket.on("connect_error", (e: Error)=>{
            console.log("Error connecting on sockets: ", e)
        })

        socket.on("message", (data: any) => {
            console.log("Received message:", data);
            if (data?.length > 0) {
                setMessages(data)
            } else {
                setMessages(prev => [...prev, data])
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight + 100
        }
    }, [messages])



    const handleMessage = (val: number) => {
        if (val === 13) {
            let msg = { from_user: user.id, message: mvalue, createdAt: new Date().toISOString() }
            setMessages(prev => [...prev, msg])
            socket.emit("message", mvalue)
            setMvalue("")
        }
    }

    return <div className="chat_wrapper">
        <div className="messages" ref={messagesRef}>
            {messages && messages.length !== 0 && messages.map((m: any, i: number) => {
                return <Message key={"message_u_"+m?.from_user + "_" + i} isCurrent={m?.from_user === user.id} message={m?.message} />
            })}
        </div>

        <div className="new_message">
            <input value={mvalue} onChange={e => setMvalue(e.target.value)} onKeyDown={(e) => handleMessage(e.keyCode)} />
            <img onClick={() => handleMessage(13)} className="send_button" src={sendImg} />
        </div>
    </div>
}

export default Chat