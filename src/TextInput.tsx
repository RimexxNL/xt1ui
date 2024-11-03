import React, {FC} from "react"

export interface TextInputProps extends React.HTMLAttributes<HTMLInputElement>{
    type?: HTMLInputElement["type"]
    placeholder?: string
}
const TextInput:FC<TextInputProps> = ({type,placeholder,...rest}) => {
    return (
        <>
            <input className={`xt1textInput`} type={type} placeholder={placeholder} {...rest} />
        </>
    )
}

export default TextInput