import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/clientsPages/Home";
import Schedules from "../pages/clientsPages/Schedules";
import Reservation from "../pages/clientsPages/Reservation";
import Confirmation from "../pages/clientsPages/Confirmation";
import MyReservations from "../pages/clientsPages/MyReservations";
import SignIn from "../pages/companiesPages/SignIn";
import SignUp from "../pages/companiesPages/SignUp";
import Company from "../pages/companiesPages/Company";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/levelBeach" element={<Home />} />
        <Route path="/levelBeach/horarios" element={<Schedules />} />
        <Route path="/levelBeach/reservas" element={<Reservation />} />
        <Route path="/levelBeach/confirmacao" element={<Confirmation />} />
        <Route
          path="/levelBeach/minhas-reservas"
          element={<MyReservations />}
        />
        <Route path="/levelBeach/login" element={<SignIn />} />
        <Route path="/levelBeach/cadastro" element={<SignUp />} />

        <Route
          path="/empresa"
          element={
            <ProtectedRoute>
              <Company />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
