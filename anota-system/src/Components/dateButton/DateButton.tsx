import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateButtonTypes } from "../../types/generalTypes";
import dayjs, { Dayjs } from "dayjs";

interface DateButtonProps {
  dateType: DateButtonTypes;
  setDateType: React.Dispatch<React.SetStateAction<DateButtonTypes>>;
}

const DateButton = ({ dateType, setDateType }: DateButtonProps) => {
  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      const formattedDate = value.format("YYYY--MM--DD");
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
          maxDate={dayjs().add(7, "day")}
          format="DD/MM/YYYY"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateButton;
