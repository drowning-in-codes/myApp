import React from "react";
import { FaHome } from "react-icons/fa";
import { MdGTranslate, MdSettings } from "react-icons/md";
import { TbWriting } from "react-icons/tb";
import { NavLink } from "react-router";
import { IoImage } from "react-icons/io5";
export default function UserInfo() {
  return (
    <div className="p-2">
      <div className="relative flex flex-col items-center justify-center">
        <div className="avatar ">
          <div className="w-24 rounded-full">
            <img
              className="hover:scale-110 hover:rotate-180 transition-all duration-300"
              src="./img/user.png"
              alt="user avatar"
            />
          </div>
        </div>
        <div className="absolute text-center user-info__name">User</div>
      </div>
      <div className="mt-2 mx-3 p-2 text-sm text-center font-mono bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-md shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
        Description: Lorem ipsum
      </div>
      <nav>
        <ul className="menu bg-base-200 rounded-box mt-1 text-center user-info__nav-list">
          <li>
            <NavLink to="/">
              <FaHome />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/translate">
              <MdGTranslate />
              <span>Translate</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/writing">
              <TbWriting />
              <span>Writing</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/image">
              <IoImage />
              <span>Image</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              <MdSettings />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
