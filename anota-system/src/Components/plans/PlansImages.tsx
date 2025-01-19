import React, { useState, useEffect } from "react";
import BeachTennis from "../../images/beach_plan.jpg";
import Futvolei from "../../images/futvolei.jpg";
import Volei from "../../images/volei.jpg";

const PlansImages = () => {
  const [imagesIterator, setImagesIterator] = useState(0);
  const images = [BeachTennis, Futvolei, Volei];

  useEffect(() => {
    const timer = setInterval(() => {
      setImagesIterator((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <img
      src={images[imagesIterator]}
      alt="Modalidades"
      style={{
        height: "460px",
        width: "390px",
        borderRadius: "10px",
        objectFit: "cover",
      }}
    />
  );
};

export default PlansImages;
