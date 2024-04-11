/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export const Button = ({ children, version, onClick }) => {
  const [variant, setVariant] = useState("primary");

  useEffect(() => {
    if (version == "primary") {
      setVariant("bg-Primary");
    } else if (version == "destructive") {
      setVariant("bg-Secondary");
    }
  }, [version]);
  return (
    <div
      id={version}
      onClick={onClick}
      className={`${variant} rounded-lg p-2 w-[70px] text-center cursor-pointer selection:hidden`}
    >
      {" "}
      {children}
    </div>
  );
};
