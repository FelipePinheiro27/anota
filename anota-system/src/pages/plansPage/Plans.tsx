import React from "react";
import SystemAbout from "../../Components/plans/SystemAbout";
import Resources from "../../Components/plans/Resources";
import Pricing from "../../Components/plans/Pricing";
import NeedHelp from "../../Components/plans/NeedHelp";
import Footer from "../../Components/plans/Footer";
import Trail from "../../Components/plans/Trail";

const Plans = () => {
  return (
    <>
      <SystemAbout />
      <Trail />
      <Resources />
      <Pricing />
      <NeedHelp />
      <Footer />
    </>
  );
};

export default Plans;
