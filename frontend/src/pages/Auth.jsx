import { Login } from "../components/Login"
import { SignUp } from "../components/SignUp"

export const Auth = ()=>{
    return <div>
        <div className="flex flex-row justify-between px-[200px] py-[100px] ">
            <SignUp></SignUp>
            <Login></Login>
        </div>
    </div>
}