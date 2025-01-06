import React from "react";
import UserInfo from "./userInfo.jsx";
export default function UserTabs(props) {
  const { className } = props;
  return (
    <div className={className}>
      <UserInfo />
    </div>
  );
}
