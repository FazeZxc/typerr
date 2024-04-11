import { useEffect, useRef, useState } from "react";
import { Key } from "./Key";
import { Button } from "./Button";
import { faker } from "@faker-js/faker";
import { useSetRecoilState } from "recoil";
import { accuracyAtom, wpmAtom } from "../store/score";
import { useNavigate } from "react-router-dom";
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
  const setAccuracy = useSetRecoilState(accuracyAtom);
  const setWpm = useSetRecoilState(wpmAtom);
  const [isStarted, setIsStarted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  function handleInputChange(e) {
    const { value } = e.target;
    setUserInput(value);
    const typedWords = value.trim().split(/\s+/);    
    const correctWords = typedWords.filter((word, index) => {
      return word === text.split(/\s+/)[index];
    }).length;
  
    const newAccuracy = (correctWords / typedWords.length) * 100;
    setAccuracy(newAccuracy);
  
    const timeDiff = (Date.now() - startTime) / 60000;
    const newWPM = (typedWords.length / timeDiff) * 60;
    setWpm(newWPM);
  }

  function handleStart(e) {
    setIsStarted(true);
    inputRef.current.focus();
    setIsFocused(true);
    setStartTime(Date.now());
  }
  function handleEnd(e) {
    setIsStarted(false);
    setEndTime(Date.now());
    navigate("/result");
  }
  function clickHandler(e) {
    if (e.key === " ") {
      setUserInput("");
    }
    SetPressedKey(e.key.toUpperCase());
  }
  useEffect(() => {
    const fakeText = faker.lorem.paragraph(5);
    setText(fakeText);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line no-empty
    if (startTime && endTime) {
    }
  }, [startTime, endTime]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-row gap-4 selection:hidden">
        <Button version="primary" onClick={handleStart}>
          START
        </Button>
        <Button version="destructive" onClick={handleEnd}>
          END
        </Button>
      </div>
      <label className="text-Secondary font-semibold text-2xl w-[900px]">
        {text}
      </label>
      <input
        type="text"
        ref={inputRef}
        disabled={!isStarted}
        value={userInput}
        autoFocus
        onKeyDown={clickHandler}
        onChange={handleInputChange}
        className="mb-4 p-2 border border-gray-400 rounded-xl w-[700px] h-auto text-black font-semibold text-2xl"
      ></input>
      <div className="flex flex-col gap-2 border-4 border-Secondary2 rounded-xl p-4 border-blue-400">
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
    </div>
  );
};
