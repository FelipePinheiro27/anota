import React from "react";
import { Box, Radio, Typography } from "@mui/material";

interface RadioSelectProps {
  value?: unknown;
  label: string;
  icon?: string;
}

const RadioSelect = ({ value, label, icon }: RadioSelectProps) => {
  return (
    <Box display="flex" alignItems="center">
      <Radio
        sx={{
          "&.Mui-checked": {
            color: "#E45609",
          },
        }}
        value={value}
      />
      <img
        src={icon}
        alt="Imagem da Modalidade"
        width={20}
        style={{ marginRight: "5px" }}
      />
      <Typography>{label}</Typography>
    </Box>
  );
};

export default RadioSelect;
