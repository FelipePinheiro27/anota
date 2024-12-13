import React from "react";
import { Box, Radio, Typography } from "@mui/material";

interface RadioSelectProps {
  value?: unknown;
  checked?: boolean;
  label: string;
  icon?: string;
  color: string;
}

const RadioSelect = ({
  value,
  label,
  icon,
  color,
  checked = false,
}: RadioSelectProps) => {
  return (
    <Box display="flex" alignItems="center">
      <Radio
        sx={{
          "&.Mui-checked": {
            color,
          },
        }}
        value={value}
        checked={checked}
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
