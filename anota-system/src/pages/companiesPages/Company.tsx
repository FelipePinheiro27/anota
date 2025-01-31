import React, { useState } from "react";
import { Box } from "@mui/material";
import Header, { activeItemType } from "../../Components/header/Header";
import ReservationsTableData from "../../Components/reservationsTableData/ReservationsTableData";
import CompanyCourts from "../../Components/companyCourts/CompanyCourts";
import ScheduleFix from "../../Components/scheduleFix/ScheduleFix";

const Company = () => {
  const [activeItem, setActiveItem] = useState<activeItemType>("Agendamentos");

  const contentData = {
    Agendamentos: <ReservationsTableData />,
    Quadras: <CompanyCourts />,
    Horários: <ScheduleFix setActiveItem={setActiveItem} />,
  };

  return (
    <Box>
      <Header activeItem={activeItem} setActiveItem={setActiveItem} />
      <Box sx={{ padding: { xs: "30px 10px ", md: "30px 40px" } }}>
        {contentData[activeItem]}
      </Box>
    </Box>
  );
};

export default Company;
