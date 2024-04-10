import { useState } from "react";
import { Key } from "./Key";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export const Keyboard = () => {
  const [pressedKey, SetPressedKey] = useState("");
  function clickHandler(e) {
    SetPressedKey(e.key.toUpperCase());
  }
  return (
    <div className="flex flex-col items-center">
      <textarea
        autoFocus
        onKeyDown={clickHandler}
        className="mb-4 p-2 border border-gray-400 rounded-xl w-[800px] h-[500px]"
      ></textarea>
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
    </div>
  );
};
