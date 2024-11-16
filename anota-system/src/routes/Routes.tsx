import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/clientsPages/Home";
import Schedules from "../pages/clientsPages/Schedules";
import Reservation from "../pages/clientsPages/Reservation";
import Confirmation from "../pages/clientsPages/Confirmation";
import MyReservations from "../pages/clientsPages/MyReservations";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/horarios" element={<Schedules />} />
        <Route path="/reservas" element={<Reservation />} />
        <Route path="/confirmacao" element={<Confirmation />} />
        <Route path="/minhas-reservas" element={<MyReservations />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
