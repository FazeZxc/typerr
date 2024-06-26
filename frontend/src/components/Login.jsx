import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/user";
import { Loader } from "./Loader";

// eslint-disable-next-line no-undef
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

console.log(backendUrl);
export const Login = () => {
  const [userEmailInput, setUserEmailInput] = useState("");
  const [userPasswordInput, setUserPasswordInput] = useState("");
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  function handleEmailInputChange(e) {
    const { value } = e.target;
    setUserEmailInput(value);
    console.log(value);
  }
  function handlePasswordInputChange(e) {
    const { value } = e.target;
    setUserPasswordInput(value);
    console.log(value);
  }
  async function submit(e) {
    setIsloading(true);
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsloading(false);
    axios
      .post(
        backendUrl + "/api/v1/signin",
        {
          email: userEmailInput,
          password: userPasswordInput,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setUser(response.data.user);
        console.log(response.data.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <div className="flex flex-row w-[300px] justify-between items-end">
        <span className="text-Primary2 text-2xl py-2">login</span>
        <span className="text-Secondary2 opacity-50 text-xl hover:underline">
          <a href="#forget">forget password?</a>
        </span>
      </div>
      <form className="flex flex-col w-[300px] gap-4">
        <input
          value={userEmailInput}
          onChange={handleEmailInputChange}
          type="text"
          placeholder="email"
          className="bg-[#272727] text-Primary2 text-xl selection:bg-none p-2 rounded-xl"
        ></input>
        <input
          value={userPasswordInput}
          onChange={handlePasswordInputChange}
          type="password"
          placeholder="password"
          className="bg-[#272727] text-Primary2 text-xl selection:bg-none p-2 rounded-xl"
        ></input>
        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            value="rememberMe"
            className="w-3 text-Primary2 text-xl bg-[#272727]"
          ></input>
          <label htmlFor="rememberMe" className="text-Primary2 text-xl">
            Remember me
          </label>
        </div>
        <button
          onClick={submit}
          className="w-[300px] p-2 bg-[#272727] text-Primary flex flex-row gap-2 hover:bg-[#fff] hover:text-Secondary rounded-xl items-center justify-center"
        >
          {!isLoading ? (
            <>
              <div className="size-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    fill="#8e7ab5"
                    d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                  />
                </svg>
              </div>

              <p className="text-xl font-semibold">Sign in</p>
            </>
          ) : (
            <div className="w-[300px] flex flex-row justify-center items-center h-8 p-1">
              <Loader></Loader>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};
