import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface NoDataProps {
  title: string;
  description?: string;
}

const NoData = ({ title, description }: NoDataProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "50px",
        padding: "70px",
      }}
    >
      <InfoOutlinedIcon
        sx={{ fontSize: 60, color: "#9e9e9e", marginBottom: "20px" }}
      />
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "20px",
          color: "#424242",
          marginBottom: "10px",
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ fontSize: "14px", color: "#757575" }}>
        {description}
      </Typography>
    </Box>
  );
};

export default NoData;
