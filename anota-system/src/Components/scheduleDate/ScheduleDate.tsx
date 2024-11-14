import { Box } from "@mui/material";
import DateButton from "../dateButton/DateButton";
import { DateButtonTypes } from "../../types/generalTypes";

interface ScheduleDateProps {
  dateType: DateButtonTypes;
  setDateType: React.Dispatch<React.SetStateAction<DateButtonTypes>>;
}

const ScheduleDate = ({ dateType, setDateType }: ScheduleDateProps) => {
  return (
    <Box display="flex" margin="30px 0" gap="80px">
      <DateButton dateType={dateType} setDateType={setDateType} />
    </Box>
  );
};

export default ScheduleDate;
