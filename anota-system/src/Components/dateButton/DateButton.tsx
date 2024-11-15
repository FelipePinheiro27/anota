import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";

interface DateButtonProps {}

const DateButton = ({}: DateButtonProps) => {
  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      const formattedDate = value.format("YYYY-MM-DD");
      console.log(formattedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DesktopDatePicker"]}>
        <DatePicker
          onChange={handleDateChange}
          defaultValue={dayjs()}
          minDate={dayjs()}
          maxDate={dayjs().add(30, "day")}
          format="DD/MM/YYYY"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateButton;
