import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { colors } from "../../constants/Colors";
const ButtonDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button 
        variant="text" 
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        style={{ color: 'black', textTransform: 'none', minWidth: '120px' }} 
      >
        <Typography sx={{fontFamily: 'Robot', fontWeight: 700, color: colors.buttonCompany } }>
          Level Beach
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          style: { minWidth: anchorEl ? anchorEl : 'auto' },
        }}
      >
        <MenuItem onClick={handleClose} style={{ minWidth: '120px', fontFamily: 'Robot', fontWeight: 500, color: colors.buttonCompany }}>Alterar Dados</MenuItem>
        <MenuItem onClick={handleClose} style={{ minWidth: '120px', fontFamily: 'Robot', fontWeight: 500, color: "#A12A2A"}}>Sair</MenuItem>
      </Menu>
    </div>
  );
};

export default ButtonDropDown;
