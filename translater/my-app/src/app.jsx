import React from "react";
import * as React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div>
      <div class="container__user-info flex flex-col justify-start items-stretch bg-gray-200">
        <div class="user_info flex flex-col justify-start items-center mt-5">
          <img
            src="./assets/user-info.jpg"
            class="user_info__avatar inline-block rounded-full w-20 h-20"
            alt="user"
          />
          <p class="user_info__name font-bold antialiased text-lg">user</p>
          <ul class="menu bg-base-200 rounded-box w-56">
            <li>
              <a>
                <i class="fa-solid fa-house block"></i> <span>首页</span>
              </a>
            </li>
            <li>
              <a>
                <i class="fa-solid fa-globe"></i> <span>翻译</span>
              </a>
            </li>
            <li>
              <a>
                <i class="fa-solid fa-toolbox"></i> <span>工具</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="container__content">
        <head class="header"> </head>
        content
      </div>
    </div>
  );
};

export default App;
