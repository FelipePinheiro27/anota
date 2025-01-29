import React from "react";
import "./ReservationsButton.css";

interface ReservationsButtonProps {
  text: string;
  bgColor: string;
  fontColor: string;
  onClick?: () => void;
}

const ReservationsButton = ({
  text,
  bgColor,
  fontColor,
  onClick,
}: ReservationsButtonProps) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: fontColor }}
      className="ReservationsButton"
    >
      {text}
    </div>
  );
};

export default ReservationsButton;
