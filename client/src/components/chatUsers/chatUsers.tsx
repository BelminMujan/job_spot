import Input from "@component/input/input"
import React, { useState, useEffect } from "react"
import Api from "../../api/api"

interface ChatUsersProps {
    setParticipant: (userId: number) => void
}
type chatUser = {
    id: number,
    email: string
}
type chatUsers = Array<chatUser>

const ChatUsers: React.FC<ChatUsersProps> = ({ setParticipant }) => {
    const api = new Api()
    const [search, setSearch] = useState<string>("")
    const [users, setUsers] = useState<chatUsers>([])
    const [foundUsers, setFoundUsers] = useState<chatUsers>([])
    useEffect(() => {
        loadRooms()
    }, [])
    useEffect(() => {
        if (search === "") {
            setFoundUsers([])
        } else {
            searchUsers()
        }
    }, [search])

    const loadRooms = async () => {
        api.get("/messages/load_rooms").then(data => {
            console.log("Loading rooms");
            console.log(data);
            
            setUsers(data as chatUsers)
        })
    }
    const searchUsers = () => {
        api.get(`/auth/search?email=${search}`).then(data => {
            console.log("Searched");
            console.log(data);
            setFoundUsers(data as chatUsers)
        })
    }

    const handleUserChange = (userId: number, user?: any) => {
        setParticipant(userId)
        let contains = users.filter((u: chatUser) => u.id === userId)
        if (!contains || contains.length === 0) {
            setUsers(prev => ([...prev, user]))
        }
    }
    return <div className="chat_users_wrapper">
        <Input label="Search" value={search} onChange={setSearch} />
        <div>
            {foundUsers && foundUsers.length !== 0 && foundUsers.map(u => {
                return <div onClick={() => handleUserChange(u.id, u)}>{u.email}</div>
            })}
        </div>
        {users && users.length !== 0 && users.map((user, i) => {
            return <div key={"user_chat_item_" + user?.id + "_" + i} className="item" onClick={() => handleUserChange(user?.id)}>
                <img src="" /> {user?.email}
            </div>
        })}
    </div>
}
export default ChatUsers