import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import "./GeneralButton.scss";

interface GeneralButtonProps {
  onClick: () => void;
  text: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  active?: boolean;
}

const GeneralButton = ({
  onClick,
  text,
  icon: Icon,
  active = false,
}: GeneralButtonProps) => {
  return (
    <div
      className={`GeneralButton ${active ? "active-color" : ""}`}
      onClick={onClick}
    >
      <span>{text}</span>
      {Icon && <Icon />}
    </div>
  );
};

export default GeneralButton;
