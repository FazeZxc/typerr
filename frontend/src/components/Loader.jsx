import { PropagateLoader } from "react-spinners"

export const Loader = ()=>{
  return <div className="w-full h-screen flex flex-row justify-center items-center">
    <PropagateLoader color="#8E7AB5" />
  </div>
}