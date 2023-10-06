import React from "react"

const ChatUsers: React.FC = () => {

    const users = [
        {
            userId: 2,
            username: "Elmin Mujan",
        },
        {
            userId: 2,
            username: "Elmin Mujan",
        },
        {
            userId: 2,
            username: "Elmin Mujan",
        },
    ]
    return <div className="chat_users_wrapper">
        {users && users.length && users.map((user, i) => {
            return <div key={"user_chat_item_"+user.userId+"_"+i} className="item">
                <img src="" /> {user.username}
            </div>
        })}
    </div>
}
export default ChatUsers