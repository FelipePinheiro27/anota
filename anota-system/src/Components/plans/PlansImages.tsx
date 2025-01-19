import React, { useState } from "react";
import BeachTennis from "../../images/beach_plan.jpg";
import Futvolei from "../../images/futvolei.jpg";
import Volei from "../../images/volei.jpg";

const PlansImages = () => {
  const [imagesIterator, setImagesIterator] = useState(0);
  const images = [BeachTennis, Futvolei, Volei];

  setTimeout(() => {
    setImagesIterator(imagesIterator < 2 ? imagesIterator + 1 : 0);
  }, 3000);

  return (
    <img
      src={images[imagesIterator]}
      alt="Modalidades"
      style={{ height: "460px", width: "390px", borderRadius: "10px" }}
    />
  );
};

export default PlansImages;
