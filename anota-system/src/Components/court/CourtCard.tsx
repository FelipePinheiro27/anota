import React from "react";
import "./CourtCard.scss";

interface CourtCardProps {
  title: string;
  description: string;
  primaryColor: string;
}

const CourtCard = ({ title, description, primaryColor }: CourtCardProps) => {
  return (
    <div className="CourtCard">
      <div className="CourtCard-info">
        <div className="CourtCard-info--title">{title}</div>
        <div className="CourtCard-info--description">{description}</div>
      </div>
      <div className="CourtCard-button" style={{ background: primaryColor }}>
        SELECIONAR
      </div>
    </div>
  );
};

export default CourtCard;
