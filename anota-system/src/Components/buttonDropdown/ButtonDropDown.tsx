import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";
import { colors } from "../../constants/Colors";
import { useNavigate } from "react-router-dom";

interface ButtonDropDownProps {
  optionsMenu: string[];
  handleItemClick: (item: string) => void;
}

const ButtonDropDown = ({
  optionsMenu,
  handleItemClick,
}: ButtonDropDownProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const value = localStorage.getItem("userSession");
  const companyData: { companyName?: string } = JSON.parse(value || "");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    localStorage.removeItem("userSession");
    navigate("/login");
  };

  return (
    <div>
      <Button
        variant="text"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        style={{ color: "black", textTransform: "none", minWidth: "120px" }}
      >
        <Typography
          sx={{
            fontFamily: "Robot",
            fontWeight: 700,
            color: colors.buttonCompany,
          }}
        >
          {companyData.companyName}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          style: { minWidth: anchorEl ? anchorEl : "auto" },
        }}
      >
        {optionsMenu.map((item) => (
          <MenuItem
            key={item}
            onClick={() => {
              if (item === "Configurações") {
                navigate("/empresa/configuracoes");
                handleClose();
              } else {
                handleItemClick(item);
                handleClose();
              }
            }}
          >
            {item === "Configurações"}
            {item}
          </MenuItem>
        ))}
        <MenuItem
          onClick={handleRemove}
          style={{
            minWidth: "120px",
            fontFamily: "Robot",
            fontWeight: 500,
            color: "#A12A2A",
          }}
        >
          Sair
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ButtonDropDown;
