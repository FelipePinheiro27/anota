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
import Plans from "../pages/plansPage/Plans";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:dynamicPath" element={<Home />} />
        <Route path="/:dynamicPath/horarios" element={<Schedules />} />
        <Route path="/:dynamicPath/reservas" element={<Reservation />} />
        <Route path="/:dynamicPath/confirmacao" element={<Confirmation />} />
        <Route
          path="/:dynamicPath/minhas-reservas"
          element={<MyReservations />}
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/" element={<Plans />} />

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
