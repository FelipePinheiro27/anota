import { Box, Typography } from "@mui/material";
import CompanyLogo from "../../../images/levelBeach.png";

const ClientHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img width={61} src={CompanyLogo} alt="Level Beach Club" />
      <Typography
        sx={{ fontWeight: 500, letterSpacing: "0.2" }}
        fontSize="28px"
        color="#E45609"
      >
        Level Beach Club
      </Typography>
    </Box>
  );
};

export default ClientHeader;
