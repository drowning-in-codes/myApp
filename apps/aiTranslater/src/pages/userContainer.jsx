import React from "react";
import UserTabs from "../components/userTabs.jsx";
import UserContent from "../components/userContent.jsx";
import { Routes, Route } from "react-router";
import UserTranslate from "../components/userTranslate.jsx";
import UserWriting from "../components/userWriting.jsx";
import UserSetting from "../components/userSetting.jsx";
import UserImage from "../components/userImage.jsx";
const userContainer = () => {
  return (
    <div className="flex  items-start justify-center ">
      <UserTabs className="flex-1 grow-1 shrink-1" />
      <div className="flex-4">
        <Routes>
          <Route index path="/" element={<UserContent />} />
          <Route path="/translate" element={<UserTranslate />} />
          <Route path="/writing" element={<UserWriting />} />
          <Route path="/image" element={<UserImage />} />
          <Route path="/settings" element={<UserSetting />} />
        </Routes>
      </div>
    </div>
  );
};

export default userContainer;
