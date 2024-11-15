import { Box } from "@mui/material";
import { DateButtonTypes } from "../../types/generalTypes";

interface ScheduleDateProps {
  dateType: DateButtonTypes;
  setDateType: React.Dispatch<React.SetStateAction<DateButtonTypes>>;
}

const ScheduleDate = ({ dateType, setDateType }: ScheduleDateProps) => {
  return <Box display="flex" margin="30px 0" gap="80px"></Box>;
};

export default ScheduleDate;
