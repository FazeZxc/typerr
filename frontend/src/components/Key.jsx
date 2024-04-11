import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export const Key = ({ children, pressedKey }) => {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  useEffect(() => {
    const color = getRandomColor();
    if (children === pressedKey) {
      document.getElementById(children).style.backgroundColor = color;
    } else {
      document.getElementById(children).style.backgroundColor = "#ffffff";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressedKey]);
  return (
    <div
      id={children}
      className="flex items-center justify-center border border-gray-500 rounded-md h-10 w-10"
    >
      {children}
    </div>
  );
};
