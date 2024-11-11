import Header from "./components/header/Header";
import SignIn from "./components/SingIn_SingUp/SingInCard";
import SignUp from "./components/SingIn_SingUp/SingUp";
import Home from "./pages/clientsPages/Home";
import CourtCard from "./components/court/CourtCard";
import CourtsOptions from "./components/court/courtsOptions/CourtsOptions";
import Reservation from "./pages/clientsPages/Reservation";

export default function App() {
  return (
    <>
      {/* <Home />; */}
      <Reservation />
    </>
  );
}
