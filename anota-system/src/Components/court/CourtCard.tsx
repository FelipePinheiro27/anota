import React from "react";
import "./CourtCard.scss";

const CourtCard = () => {
  return (
    <div className="CourtCard">
      <div className="CourtCard-info">
        <div className="CourtCard-info--title">Quadra 01</div>
        <div className="CourtCard-info--description">
          Quadra próxima ao bar Quadra próxima ao bar
        </div>
      </div>
      <div className="CourtCard-button">SELECIONAR</div>
    </div>
  );
};

export default CourtCard;
