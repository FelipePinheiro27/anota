import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CompanyLogo from "../../companyLogo/CompanyLogo";

interface ClientHeaderMobileProps {
  previewsPage: string;
  companyName: string;
  primaryColor: string;
  pathRouteKey: string;
  companyId?: string | number;
}

const ClientHeaderMobile = ({
  previewsPage,
  companyName,
  primaryColor,
  pathRouteKey,
  companyId,
}: ClientHeaderMobileProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        alignItems: "center",
        background: "#fff",
        padding: "10px 0 ",
        width: "100%",
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
            marginLeft: "10px",
            width: "48px",
            height: "48px",
          }}
        >
          <ArrowBackIcon sx={{ color: { primaryColor }, fontWeight: 700 }} />
        </Box>
      </Link>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          gap: "10px",
        }}
      >
        <CompanyLogo
          companyId={companyId}
          companyName={companyName}
          width={50}
          height={50}
          showFallback={false}
        />
        <Typography
          sx={{ fontWeight: 500, letterSpacing: "0.2" }}
          fontSize="20px"
          color={primaryColor}
        >
          {companyName}
        </Typography>
      </Box>
    </Box>
  );
};

export default ClientHeaderMobile;
