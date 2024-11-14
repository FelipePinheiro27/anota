import React from "react";
import GeneralButton from "../buttons/generalButton/GeneralButton";
import { CalendarMonthOutlined } from "@mui/icons-material";
import "./DateButton.scss";

const DateButton = () => {
  return <GeneralButton text="DATA ESPECÍFICA" icon={CalendarMonthOutlined} />;
};

export default DateButton;
