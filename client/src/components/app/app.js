import React from "react";
import { GlobalRouter } from "./routes";
import { GlobalToast } from "../toast";
export const App = () => {
  return (
    <>
      <GlobalRouter />
      <GlobalToast />
    </>
  );
};

export const DEBUG_ON = true;
