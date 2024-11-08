import React from "react";
import "./ReservationsButton.css";

interface ReservationsButtonProps {
  text: string;
  bgColor: string;
}

const ReservationsButton = ({ text, bgColor }: ReservationsButtonProps) => {
  return (
    <div style={{ backgroundColor: bgColor }} className="ReservationsButton">
      {text}
    </div>
  );
};

export default ReservationsButton;
