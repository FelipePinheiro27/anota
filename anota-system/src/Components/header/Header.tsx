import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import LogoHeader from "../../LogoHeader.svg";
import ButtonDropDown from "../buttonDropdown/ButtonDropDown";

const Header = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingTop={2}
      paddingRight={4}
      paddingLeft={6}
    >
      <img
        src={LogoHeader}
        alt="Test"
        style={{ width: "40px", height: "40px" }}
      />
      <Box>
        <List disablePadding sx={{ display: "flex", gap: 2 }}>
          <ListItem sx={{ width: "auto", padding: 0 }}>Agendamentos</ListItem>
          <ListItem sx={{ width: "auto", padding: 0 }}>Quadras</ListItem>
          <ListItem sx={{ width: "auto", padding: 0 }}>Layout</ListItem>
        </List>
      </Box>
      <ButtonDropDown />
    </Box>
  );
};

export default Header;
