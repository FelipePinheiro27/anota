import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

interface DateButtonProps {
  date: Dayjs | null;
  handleDateChange: (date: Dayjs | null) => void;
}

const DateButton = ({ date, handleDateChange }: DateButtonProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DemoContainer components={["DesktopDatePicker"]}>
        <DatePicker
          onChange={handleDateChange}
          value={date}
          minDate={dayjs()}
          maxDate={dayjs().add(30, "day")}
          format="DD/MM/YYYY"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateButton;
