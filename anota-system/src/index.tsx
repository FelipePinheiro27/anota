import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SignInCard from "./Components/SingIn_SingUp/SingInCard";
import SignUp from './Components/SingIn_SingUp/SingUp';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SignInCard/>
  </React.StrictMode>
);
