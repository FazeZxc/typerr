export const SignUp = () => {
  function submit() {}
  return (
    <div>
      <div className="flex flex-row w-[400px] justify-between items-end">
        <span className="text-Primary2 text-2xl py-2">register</span>
      </div>
      <form className="flex flex-col w-[300px] gap-4">
        <input
          type="text"
          placeholder="username"
          className="bg-[#272727] text-Primary2 text-xl selection:bg-none p-2 rounded-xl"
        ></input>
        <input
          type="text"
          placeholder="email"
          className="bg-[#272727] text-Primary2 text-xl selection:bg-none p-2 rounded-xl"
        ></input>
        <input
          type="text"
          placeholder="verify email"
          className="bg-[#272727] text-Primary2 text-xl selection:bg-none p-2 rounded-xl"
        ></input>
        <input
          type="password"
          placeholder="password"
          className="bg-[#272727] text-Primary2 text-xl selection:bg-none p-2 rounded-xl"
        ></input>
        <input
          type="password"
          placeholder="verify password"
          className="bg-[#272727] text-Primary2 text-xl selection:bg-none p-2 rounded-xl"
        ></input>

        <button
          onClick={submit}
          className="w-[300px] p-2 bg-[#272727] text-Primary flex flex-row gap-2 hover:bg-[#fff] hover:text-Secondary rounded-2xl items-center justify-center"
        >
          <div className="size-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path
                fill="#907ab5"
                d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
              />
            </svg>
          </div>
          <p className="text-xl font-semibold">Sign in</p>
        </button>
      </form>
    </div>
  );
};
