import React from "react";
import HorizontalStrip from "../../Components/plans/HorizontalStrip";
import SystemAbout from "../../Components/plans/SystemAbout";
import Resources from "../../Components/plans/Resources";
import Pricing from "../../Components/plans/Pricing";
import useIsMobile from "../../hooks/useIsMobile";
import NeedHelp from "../../Components/plans/NeedHelp";
import Footer from "../../Components/plans/Footer";

const Plans = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <SystemAbout />
      {!isMobile && <HorizontalStrip />}
      <Resources />
      <Pricing />
      <NeedHelp />
      <Footer />
    </>
  );
};

export default Plans;
