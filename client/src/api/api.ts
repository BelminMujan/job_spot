import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
interface iApi {
    [key: string]: any
}

class Api implements iApi {
    navigate = useNavigate()
    headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
    handlePromise(res: any, resolve: any, reject: any) {
        res.json().then((data: any) => {

            if (res?.status === 200) {
                if (data.toast) {
                    toast.success(data.toast)
                }
                resolve(data)
            } else {
                if (data.toast) {
                    toast.success(data.toast)
                }
                if (data.authenticated === false) {
                    return this.navigate("/login")
                }
                reject(data)
            }
        }).catch((e: Error) => {
            reject(e)
        })
    }
    logout() {
        this.get("/auth/logout").then(res => {
        }).catch(e => {
            console.log(e);
        })
    }


    post(path: string, data: any) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`/api${path}`, {
                    method: "POST",
                    headers: this.headers,
                    credentials: "same-origin",
                    body: JSON.stringify(data)
                }).then(res => {
                    this.handlePromise(res, resolve, reject)
                }).catch(e => {
                    reject(e)
                })
            } catch (error) {
                reject(error)
            }
        })
    }
    get(path: string) {
        return new Promise((resolve, reject) => {
            try {
                fetch("/api" + path, {
                    method: "GET",
                    headers: this.headers,
                    credentials: "same-origin",
                }).then(res => {
                    this.handlePromise(res, resolve, reject)
                }).catch(e => {
                    reject(e)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    async uploadImage(image: any) {

        let form = new FormData()
        form.append("image", image)

        const response = await fetch("/api/auth/upload_photo", {
            method: 'POST',
            credentials: "same-origin",
            body: form,
        })
        console.log("Upload image res: ", response)
    }
}

export default Api