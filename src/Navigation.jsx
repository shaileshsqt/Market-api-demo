import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROUTES from "./config/routes";
import Home from "./Modules/Home";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
