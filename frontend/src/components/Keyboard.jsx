import { useEffect, useState } from "react";
import { Key } from "./Key";
import { Button } from "./Button";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export const Keyboard = () => {
  const [pressedKey, SetPressedKey] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [text, setText] = useState("Abhinav");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);

  function handleInputChange(e) {
    const { value } = e.target;
    setUserInput(value);
    const correctChars = text.slice(0, value.length);
    const correctCount = correctChars
      .split("")
      .filter((char, index) => char === value[index]).length;
    const newAccuracy = (correctCount / text.length) * 100;
    setAccuracy(newAccuracy);
    const timeDiff = (endTime - startTime) / 60000;
    const typedWords = value.trim().split(/\s+/).length;
    const newWPM = typedWords / timeDiff;
    setWpm(newWPM);
  }
  function handleStart(e) {
    setStartTime(Date.now());
  }
  function handleEnd(e) {
    setEndTime(Date.now());
  }
  function clickHandler(e) {
    SetPressedKey(e.key.toUpperCase());
  }

  useEffect(() => {
    // eslint-disable-next-line no-empty
    if (startTime && endTime) {
    }
  }, [startTime, endTime]);

  return (
    <div className="flex flex-col items-center">
      <textarea
        value={userInput}
        autoFocus
        placeholder={text}
        onKeyDown={clickHandler}
        onChange={handleInputChange}
        className="mb-4 p-2 border border-gray-400 rounded-xl w-[800px] h-[500px]"
      ></textarea>
      <Button variant="primary" onClick={handleStart}>
        START
      </Button>
      <Button variant="destructive" onClick={handleEnd}>
        END
      </Button>
      <div className="flex flex-col gap-2 border-4 rounded-xl p-4 border-blue-400">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((key, index) => (
              <Key key={index} pressedKey={pressedKey}>
                {key}
              </Key>
            ))}
          </div>
        ))}
      </div>
      <div>Accuracy: {accuracy.toFixed(2)}</div>
      <div>WPM: {wpm.toFixed(2)}</div>
    </div>
  );
};
