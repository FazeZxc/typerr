import { Login } from "../components/Login"
import { SignUp } from "../components/SignUp"

export const Auth = ()=>{
    return <div>
        <div className="flex flex-row justify-between px-[400px] py-[200px]">
            <SignUp></SignUp>
            <Login></Login>
        </div>
    </div>
}