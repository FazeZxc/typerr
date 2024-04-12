import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userAtom } from "../store/user";
import { useEffect, useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const Header = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const resetUser = useResetRecoilState(userAtom);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function autoLogin() {
      axios
        .get(backendUrl + "/api/v1/autoLogin", {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setUser({
            username: response.data.user.username,
            email: response.data.user.email,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    autoLogin();
  }, [isLoggedIn]);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  async function handleLogout() {
    const response = await fetch(backendUrl + "/api/v1/logOut", {
      method: "GET",
      credentials: "include",
    });
    resetUser();
    if (response.status === 200) {
      navigate("/auth");
    }
  }

  return (
    <div className="pt-2 px-24 flex flex-row justify-between items-end">
      <div className="flex flex-row items-end gap-4">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="text-Primary2 text-8xl selection:hidden cursor-pointer"
        >
          typerr
        </div>
        <div className="h-12 w-12 flex flex-row items-center justify-center rounded-xl hover:bg-[#272727]">
          <svg
            onClick={() => {
              navigate("/");
            }}
            height={24}
            width={24}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="#B197FC"
              d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm16 64h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V144zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zM160 336c0-8.8 7.2-16 16-16H400c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V336zM272 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM256 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM368 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM352 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V240zM464 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM448 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16z"
            />
          </svg>
        </div>
      </div>
      <div className=" h-12 w-12 flex flex-row items-center justify-center  rounded-2xl cursor-pointer">
        {user.email != "" ? (
          <span className="text-Primary font-semibold text-2xl flex flex-row items-end gap-4">
            {user.username}{" "}
            <svg
              onClick={handleLogout}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-6 w-8 rounded-lg p-1 hover:bg-[#272727]"
            >
              <path
                fill="#907ab5"
                height={24}
                width={24}
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              />
            </svg>
          </span>
        ) : (
          <svg
            onClick={() => {
              navigate("/auth");
            }}
            xmlns="http://www.w3.org/2000/svg"
            height={24}
            width={24}
            viewBox="0 0 448 512"
          >
            <path
              fill="#B197FC"
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
