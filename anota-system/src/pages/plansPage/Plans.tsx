import React from "react";
import HorizontalStrip from "../../Components/plans/HorizontalStrip";
import SystemAbout from "../../Components/plans/SystemAbout";
import Resources from "../../Components/plans/Resources";
import Pricing from "../../Components/plans/Pricing";
import NeedHelp from "../../Components/plans/NeedHelp";
import Footer from "../../Components/plans/Footer";
import Trail from "../../Components/plans/Trail";
import useIsMobile from "../../hooks/useIsMobile";

const Plans = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <SystemAbout />
      {!isMobile && <Trail />}
      {/* {!isMobile && <HorizontalStrip />} */}
      <Resources />
      <Pricing />
      <NeedHelp />
      <Footer />
    </>
  );
};

export default Plans;
