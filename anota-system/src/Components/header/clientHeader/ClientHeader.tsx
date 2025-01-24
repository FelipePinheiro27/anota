import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useIsMobile from "../../../hooks/useIsMobile";
import ClientHeaderMobile from "./ClientHeaderMobile";
import { ClientReservationContext } from "../../../context/ClientReservationProvider";
import { useContext } from "react";
import { useRetrieveCompany } from "../../../hooks/useRetrieveCompany";

interface ClientHeaderProps {
  previewsPage: string;
}

const ClientHeader = ({ previewsPage }: ClientHeaderProps) => {
  const isMobile = useIsMobile();
  const { company } = useContext(ClientReservationContext) || {};
  useRetrieveCompany();
  const { primaryColor, pathRouteKey } = company || {};

  const CompanyLogo = `/images/${pathRouteKey}.png`;

  if (isMobile) {
    return (
      <ClientHeaderMobile
        previewsPage={previewsPage}
        companyName={company?.name || ""}
        primaryColor={primaryColor || ""}
        pathRouteKey={pathRouteKey || ""}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        marginTop: "30px",
      }}
    >
      <Link
        to={previewsPage || "/"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            backgroundColor: "#e9e9e9",
          }}
        >
          <ArrowBackIcon />
        </Box>
      </Link>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <img
          width={isMobile ? 50 : 61}
          src={CompanyLogo}
          alt="Logo da empresa"
        />
        <Typography
          sx={{ fontWeight: 500, letterSpacing: "0.2" }}
          fontSize={{ xs: "22px", md: "28px" }}
          color={primaryColor}
        >
          {company?.name}
        </Typography>
      </Box>
      {!isMobile && <Box />}
    </Box>
  );
};

export default ClientHeader;
