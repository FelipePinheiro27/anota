import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import "./GeneralButton.scss";

interface GeneralButtonProps {
  onClick?: () => void;
  text?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const GeneralButton = ({ onClick, text, icon: Icon }: GeneralButtonProps) => {
  return (
    <div className="GeneralButton" onClick={onClick}>
      <span className="text">{text}</span>
      {Icon && <Icon />}
    </div>
  );
};

export default GeneralButton;
