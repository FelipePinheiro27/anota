import React, { useEffect, useRef } from "react";
import SystemAbout from "../../Components/plans/SystemAbout";
import Resources from "../../Components/plans/Resources";
import Pricing from "../../Components/plans/Pricing";
import NeedHelp from "../../Components/plans/NeedHelp";
import Footer from "../../Components/plans/Footer";
import Trail from "../../Components/plans/Trail";
import { useSearchParams } from "react-router-dom";

const Plans = () => {
  const [searchParams] = useSearchParams();
  const promoCode = searchParams.get("promo");
  const isValidCode = promoCode === "MNTV10";

  const pricingRef = useRef<HTMLDivElement | null>(null);

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (promoCode && isValidCode) {
      scrollToPricing();
    }
  }, [promoCode, isValidCode]);

  return (
    <>
      <SystemAbout scrollToPricing={scrollToPricing} />
      <Trail />
      <Resources />
      <Pricing ref={pricingRef} />
      <NeedHelp />
      <Footer />
    </>
  );
};

export default Plans;
