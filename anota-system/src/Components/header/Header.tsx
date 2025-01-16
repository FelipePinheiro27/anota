import React, { useState } from "react";
import { Box, List, ListItem, Menu, MenuItem } from "@mui/material";
import LogoHeader from "../../images/LogoHeader.svg";
import ButtonDropDown from "../buttonDropdown/ButtonDropDown";
import useIsMobile from "../../hooks/useIsMobile";

type activeItemType = "Agendamentos" | "Quadras";

interface HeaderProps {
  activeItem: activeItemType;
  setActiveItem: React.Dispatch<React.SetStateAction<activeItemType>>;
}

const Header = ({ activeItem, setActiveItem }: HeaderProps) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useIsMobile();

  const handleItemClick = (item: string) => {
    setActiveItem(item as activeItemType);
    setMenuAnchorEl(null);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        background: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
      paddingTop={2}
      paddingBottom={2}
      paddingX={4}
    >
      <img
        src={LogoHeader}
        alt="logo da empresa"
        style={{ width: "40px", height: "40px" }}
      />

      {isMobile ? (
        <>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            {["Agendamentos", "Quadras"].map((item) => (
              <MenuItem
                key={item}
                selected={activeItem === item}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <Box>
          <List disablePadding sx={{ display: "flex", gap: 2 }}>
            {["Agendamentos", "Quadras"].map((item) => (
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
      )}

      <ButtonDropDown />
    </Box>
  );
};

export default Header;
