import { useState } from "react"

export const Button = ({children , version}) =>{
    const [variant , setVariant] = useState("primary")
    if(version == "primary"){
        setVariant("bg-green-400")
    }else if(version == "destructive"){
        setVariant("bg-red-400")
    }
    return <div className={variant + "rounded-lg p-2 w-[70px] text-center"}>
        {children}
    </div>
}