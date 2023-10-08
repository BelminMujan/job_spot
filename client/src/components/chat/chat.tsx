import React, { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@hook/useRedux";
import io from "socket.io-client"
import Message from "@component/message/message";
import sendImg from "../../assets/send.png"
let socket: any

interface ChatProps {
    participant: number | null
}

const Chat: React.FC<ChatProps> = ({ participant }) => {
    const [mvalue, setMvalue] = useState("")
    const { user } = useAppSelector(state => state.user)
    const [messages, setMessages] = useState<any>([])
    const [roomName, setRoomName] = useState<string>("")
    const messagesRef = useRef<null | HTMLDivElement | React.LegacyRef<HTMLElement>>()
    useEffect(() => {
        if (participant && participant !== null) {
            socket = io({ path: "/socket" })

            socket.on("connect", () => {
                console.log("Connected to server");
                socket.emit("join_room", participant)
                socket.on("joined_room", (roomName: string) => {
                    setRoomName(roomName)
                    console.log("Joined room: ", roomName);

                })
            });
            socket.on("connect_error", (e: Error) => {
                console.log("Error connecting on sockets: ", e)
            })

            socket.on("load_messages", (data: any) => {
                
                setMessages(data)
            });
            socket.on("message", (message: any)=>{
                setMessages(prev => [...prev, message])
            })
            return () => {
                socket.disconnect();
            };
        }

    }, [participant]);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight + 100
        }
    }, [messages])



    const handleMessage = (val: number) => {
        if (val === 13 && mvalue && mvalue !== "") {
            // let msg = { user1: user.id, message: mvalue, createdAt: new Date().toISOString() }
            // setMessages(prev => [...prev, msg])
            socket.emit("message", { room_id: roomName, message: mvalue })
            setMvalue("")
        }
    }
    if (!participant || participant === null) {
        return <></>
    }

    return <div className="chat_wrapper">
        <div className="messages" ref={messagesRef}>
            {messages && messages.length !== 0 && messages.map((m: any, i: number) => {
                return <Message key={"message_"+m.message_id} isCurrent={m?.from_user === user.id} message={m?.message} />
            })}
        </div>

        <div className="new_message">
            <input value={mvalue} onChange={e => setMvalue(e.target.value)} onKeyDown={(e) => handleMessage(e.keyCode)} />
            <img onClick={() => handleMessage(13)} className="send_button" src={sendImg} />
        </div>
    </div>
}

export default Chat