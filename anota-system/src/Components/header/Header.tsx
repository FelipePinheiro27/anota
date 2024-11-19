import React, { useState } from "react";
import { Box, List, ListItem } from "@mui/material";
import LogoHeader from "../../images/LogoHeader.svg";
import ButtonDropDown from "../buttonDropdown/ButtonDropDown";

const Header = () => {
  const [activeItem, setActiveItem] = useState("Agendamentos");

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ background: "#fff", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      paddingTop={2}
      paddingBottom={2}
      paddingRight={4}
      paddingLeft={6}
    >
      <img
        src={LogoHeader}
        alt="logo da empresa"
        style={{ width: "40px", height: "40px" }}
      />
      <Box>
        <List disablePadding sx={{ display: "flex", gap: 15 }}>
          {["Agendamentos", "Quadras", "Layout"].map((item) => (
            <ListItem
              key={item}
              sx={{
                cursor: "pointer",
                borderBottom:
                  activeItem === item
                    ? "2px solid #2AA137"
                    : "1px solid transparent",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </ListItem>
          ))}
        </List>
      </Box>
      <ButtonDropDown />
    </Box>
  );
};

export default Header;
