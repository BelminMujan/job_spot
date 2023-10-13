import Button from "@component/button/button";
import ImageSelect from "@component/input/imageSelect";
import Input from "@component/input/input";
import { useAppSelector } from "@hook/useRedux";
import { iUser } from "@slice/userSlice";
import Api from "@src/api/api";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Settings: React.FC = () => {
    const [data, setData] = useState<iUser | null>(null)
    const { user } = useAppSelector((state) => state.user)
    const api = new Api()
    useEffect(() => {
        setData(user as iUser)
    }, [user])

    const handleChange = (key: string, val: string) => {
        setData(prev => ({ ...prev, [key]: val }))
    }
    const saveChanges = () => {
        api.uploadImage(data?.image).then(res => {
            console.log(res);

        })
        api.post("/auth/update_user", { id: data?.id, email: data?.email, username: data?.username, image: data?.image?.name }).then(res => {
            console.log("Updating succeed")
            console.log(res);
        }).catch((e) => {
            console.log("Error updating user: ", e);
            toast.error("Error updating!")
        })
    }
    return <div className="settings_wrapper">
        <h3>Settings</h3>
        <Input label="Email" value={data?.email as string} onChange={(v) => handleChange("email", v)} />
        <Input label="Username" value={data?.username as string} onChange={(v) => handleChange("username", v)} />
        <img alt="" src={"http://localhost:3001/files/" + data?.image} />
        <ImageSelect label="Select profile image" onChange={(v) => handleChange("image", v)} />
        <Button action={saveChanges}>Save changes</Button>
    </div>
}

export default Settings