import Input from "@component/input/input"
import React, { useState, useEffect } from "react"
import Api from "../../api/api"
import { iUser } from "@slice/userSlice"
import { useDebounce } from "@hook/useDebounce"

interface ChatUsersProps {
    setParticipant: (userId: number) => void
}
type chatUsers = Array<iUser>

const ChatUsers: React.FC<ChatUsersProps> = ({ setParticipant }) => {
    const api = new Api()
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebounce(search)
    const [users, setUsers] = useState<chatUsers>([])
    const [foundUsers, setFoundUsers] = useState<chatUsers>([])
    useEffect(() => {
        loadRooms()
    }, [])
    useEffect(() => {
        if (debouncedSearch === "") {
            setFoundUsers([])
        } else {
            searchUsers()
        }
    }, [debouncedSearch])


    const loadRooms = async () => {
        api.get("/messages/load_rooms").then(data => {
            console.log("Loading rooms");
            console.log(data);

            setUsers(data as chatUsers)
        })
    }
    const searchUsers = () => {
        api.get(`/auth/search?email=${debouncedSearch}`).then(data => {
            console.log("Searched");
            console.log(data);
            setFoundUsers(data as chatUsers)
        })
    }

    const handleUserChange = (userId: number, user?: any) => {
        setParticipant(userId)
        let contains = users.filter(u => u.id === userId)
        if (!contains || contains.length === 0) {
            setUsers(prev => ([...prev, user]))
        }
    }
    return <div className="chat_users_wrapper">
        <Input label="Search" value={search} onChange={setSearch} />
        {foundUsers && foundUsers.length !== 0 && <div className="found_users_wrapper">
            {foundUsers.map(u => {
                return <div className="found_user" onClick={() => handleUserChange(u.id as number, u)}>{u.email}</div>
            })}
        </div>}
        {users && users.length !== 0 && users.map((user, i) => {
            return <div key={"user_chat_item_" + user?.id + "_" + i} className="item" onClick={() => handleUserChange(user.id as number)}>
                <img src="" /> {user?.username || user?.email}
            </div>
        })}
    </div>
}
export default ChatUsers