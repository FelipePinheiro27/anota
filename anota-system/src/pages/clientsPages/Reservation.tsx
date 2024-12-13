import React, { useContext, useEffect, useState } from "react";
import CourtsOptions from "../../Components/court/courtsOptions/CourtsOptions";
import { Box, Typography } from "@mui/material";
import ClientHeader from "../../Components/header/clientHeader/ClientHeader";
import { ClientReservationContext } from "../../context/ClientReservationProvider";
import { retrieveCourtsByCompany } from "../../api/ClientAPI";
import { CourtTypes } from "../../types/generalTypes";
import { useRetrieveCompany } from "../../hooks/useRetrieveCompany";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/loadingSpinner/LoadingSpinner";

const Reservation = () => {
  useRetrieveCompany();
  const clientReservation = useContext(ClientReservationContext);
  const [isLoading, setIsLoading] = useState(true);
  const [courts, setCourts] = useState<CourtTypes[]>([]);
  const { dynamicPath } = useParams();

  const { company, onSelectCourt } = clientReservation || {};
  const { primaryColor } = company || {};

  useEffect(() => {
    const fetchCourts = async () => {
      setIsLoading(true);
      setCourts(await retrieveCourtsByCompany(company?.id || ""));
      setIsLoading(false);
    };

    fetchCourts();
  }, [company?.id]);

  return (
    <Box>
      <ClientHeader previewsPage={`/${dynamicPath}`} />
      <Box sx={{ padding: { xs: "30px 15px", md: "30px 40px" } }}>
        <Box margin={"30px 0"}>
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
          >
            Escolha uma Opção
          </Typography>
        </Box>
        <Box paddingLeft="35px" marginTop="40px">
          {isLoading ? (
            <Box marginTop="250px">
              <LoadingSpinner color={primaryColor} />
            </Box>
          ) : (
            <CourtsOptions
              courts={courts || []}
              onSelectCourt={onSelectCourt}
              primaryColor={primaryColor || ""}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Reservation;
