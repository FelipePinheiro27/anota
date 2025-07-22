import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { IconButton, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface DateButtonProps {
  date: Dayjs | null;
  handleDateChange: (date: Dayjs | null) => void;
}

const DateButton = ({ date, handleDateChange }: DateButtonProps) => {
  const today = dayjs();
  const maxDate = today.add(30, "day");

  const handlePrev = () => {
    if (date && date.isAfter(today, "day")) {
      handleDateChange(date.subtract(1, "day"));
    }
  };

  const handleNext = () => {
    if (date && date.isBefore(maxDate, "day")) {
      handleDateChange(date.add(1, "day"));
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        onClick={handlePrev}
        disabled={!date || date.isSame(today, "day")}
        size="small"
        aria-label="Dia anterior"
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DemoContainer components={["DesktopDatePicker"]}>
          <DatePicker
            onChange={handleDateChange}
            value={date}
            minDate={today}
            maxDate={maxDate}
            format="DD/MM/YYYY"
          />
        </DemoContainer>
      </LocalizationProvider>
      <IconButton
        onClick={handleNext}
        disabled={!date || date.isSame(maxDate, "day")}
        size="small"
        aria-label="Próximo dia"
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default DateButton;
