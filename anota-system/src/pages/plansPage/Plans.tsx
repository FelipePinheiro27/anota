import React from "react";
import HorizontalStrip from "../../Components/plans/HorizontalStrip";
import SystemAbout from "../../Components/plans/SystemAbout";
import Resources from "../../Components/plans/Resources";
import Pricing from "../../Components/plans/Pricing";

const Plans = () => {
  return (
    <>
      <SystemAbout />
      <HorizontalStrip />
      <Resources />
      <Pricing />
    </>
  );
};

export default Plans;
