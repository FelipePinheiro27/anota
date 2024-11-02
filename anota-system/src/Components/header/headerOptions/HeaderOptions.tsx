import React from "react";
import { ListItem } from "@mui/material";

interface HeaderOptionsProps {
  optionName: string;
  isActive: boolean;
  onClick: void;
}

const HeaderOptions = ({
  optionName,
  isActive,
  onClick,
}: HeaderOptionsProps) => {
  return <ListItem sx={{ width: "auto", padding: 0 }}>{optionName}</ListItem>;
};

export default HeaderOptions;
