import React from "react";
import { FaBrain } from "react-icons/fa";
const TitleBar = () => {
  return (
    <div className="pl-2 gap-2 h-8 flex justify-start items-center bg-[#2f3241] text-white title-bar sticky top-0 left-0 right-0 z-50 ">
      <FaBrain className="text-xl" />
      <div className="title-font">AI Translater</div>
    </div>
  );
};

export default TitleBar;
