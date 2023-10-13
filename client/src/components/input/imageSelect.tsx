import React, { ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState } from "react";

interface InputTypes {
    label: string,
    onChange: (value: string) => void,
    error?: any,
}
const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ImageSelect: React.FC<InputTypes> = ({ label, onChange, error }) => {
    const [preview, setPreview] = useState<any>()
    const inputRef = useRef<HTMLInputElement>(null);
    const onHandleChange = (e: any) => {
        let file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image type is not valid!");
            return;
        } else {
            if (inputRef.current) {
                setPreview(URL.createObjectURL(file))
                onChange(file)
                const dataTransfer = new DataTransfer();
                file = dataTransfer.items.add(file)
                inputRef.current.files = dataTransfer.files;
            }
        }
    }
    return <label className={`input_wrapper ${error ? "error" : ""}`}>
        {label}
        <div className="input_img">
            <input
                ref={inputRef}
                accept="image/*"
                multiple={false}
                type={"file"}
                style={{ display: "none" }}
                onChange={onHandleChange} />
            {preview ? <div>
                Selected image:
                <img alt="" src={preview} />
            </div> : "Select new picture!"}
        </div>

        {error && <p className="error_message">{error?.message}</p>}
    </label>
}

export default ImageSelect