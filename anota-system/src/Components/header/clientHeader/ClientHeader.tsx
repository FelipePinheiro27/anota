import { Box, Typography } from "@mui/material";
import CompanyLogo from "../../../images/levelBeach.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useIsMobile from "../../../hooks/useIsMobile";

const ClientHeader = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        sm: {
          background: "red",
        },
      }}
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          width={isMobile ? 50 : 61}
          src={CompanyLogo}
          alt="Level Beach Club"
        />
        <Typography
          sx={{ fontWeight: 500, letterSpacing: "0.2" }}
          fontSize={{ xs: "22px", md: "28px" }}
          color="#E45609"
        >
          Level Beach Club
        </Typography>
      </Box>
      {!isMobile && <Box />}
    </Box>
  );
};

export default ClientHeader;
