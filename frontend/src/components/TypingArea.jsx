/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "./Button";

const TypingArea = ({
  typingText,
  inpFieldValue,
  timeLeft,
  mistakes,
  WPM,
  CPM,
  initTyping,
  handleKeyDown,
  resetGame,
}) => {
  return (
    <div className="rounded-[5px] p-[20px] pt-0 text-pretty">
      <div className="w-screen px-[100px]">
        <p id="paragraph" className="break-all text-center text-balance ">
          {typingText}
        </p>
      </div>
      <div className="flex justify-between items-center mt-[5px]">
        <ul className="ps-[0px] flex justify-between items-center m-0 w-full mx-[200px] text-Secondary2">
          <li className="list-none my-0 mx-[10px]">
            <p className="m-[5px] text-[12px]">Time Left:</p>
            <span className="m-[10px] text-[18px]">
              <b>{timeLeft}</b>s
            </span>
          </li>
          <li className="list-none my-0 mx-[10px]">
            <p className="m-[5px] text-[12px]">Mistakes:</p>
            <span className="m-[10px] text-[18px]">{mistakes}</span>
          </li>
          <li className="list-none my-0 mx-[10px]">
            <p className="m-[5px] text-[12px]">WPM:</p>
            <span className="m-[10px] text-[18px]">{WPM}</span>
          </li>
          <li className="clist-none my-0 mx-[10px]pm">
            <p className="m-[5px] text-[12px]">CPM:</p>
            <span className="m-[10px] text-[18px]">{CPM}</span>
          </li>
        </ul>
      </div>
      <div className="w-full flex flex-row items-center justify-center">
      <Button onClick={resetGame} version="primary">
        Try Again
      </Button>
      </div>
    </div>
  );
};

export default TypingArea;
