import * as React from "react";
import { createRoot } from "react-dom/client";
import TitleBar from "./components/titleBar.jsx";
import UserContainer from "./pages/userContainer.jsx";
import {  HashRouter } from "react-router";
const rootElement = document.querySelector("#root");
const root = createRoot(rootElement);
root.render(
  <HashRouter>
    <div className="h-screen">
      <TitleBar />
      <UserContainer />
    </div>
  </HashRouter>
);
