import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/clientsPages/Home";
import Schedules from "../pages/clientsPages/Schedules";
import Reservation from "../pages/clientsPages/Reservation";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/horarios" element={<Schedules />} />
        <Route path="/reservas" element={<Reservation />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
