import React from "react";
import "./ReservationsButton.css";

interface ReservationsButtonProps {
  text: string;
  bgColor: string;
  onClick?: () => void;
}

const ReservationsButton = ({
  text,
  bgColor,
  onClick,
}: ReservationsButtonProps) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
      className="ReservationsButton"
    >
      {text}
    </div>
  );
};

export default ReservationsButton;
