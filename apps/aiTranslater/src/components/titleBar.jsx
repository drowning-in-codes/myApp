import React from "react";
import { FaBrain } from "react-icons/fa";
const TitleBar = () => {
  return (
    <div className="pl-2 gap-2 h-8 flex justify-start items-center bg-[#2f3241] text-white title-bar">
      <FaBrain className="text-xl" />
      <div className="title-font">AI Translater</div>
    </div>
  );
};

export default TitleBar;
