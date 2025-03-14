import React from "react";
import ScheduleTime from "../scheduleTime/ScheduleTime";
import { ReservationTypes } from "../../types/generalTypes";
import { Tooltip, Typography } from "@mui/material";
import "./TimeSlots.scss";

interface TimeSlotsProps {
  slots: ReservationTypes[];
  scheduledTime: ReservationTypes[];
  onSelectSlots: (slot: ReservationTypes) => void;
  primaryColor: string;
}

const TimeSlots = ({
  slots,
  onSelectSlots,
  scheduledTime,
  primaryColor,
}: TimeSlotsProps) => {
  const sortedScheduledTime = [...scheduledTime].sort((a, b) =>
    a.start.localeCompare(b.start)
  );
  const lastScheduled = sortedScheduledTime[sortedScheduledTime.length - 1];

  return (
    <div className="TimeSlots">
      {slots.map((slot, index) => {
        const isNextSlot = lastScheduled && slot.start === lastScheduled.end;
        const isEnabled =
          scheduledTime.includes(slot) || isNextSlot || !lastScheduled;
        const isSelected = scheduledTime.includes(slot);
        const isLastSelected = lastScheduled === slot;

        const tooltipMessage = isSelected
          ? !isLastSelected && "Apenas a partir do último horário para remover."
          : !isLastSelected &&
            "Apenas horários seguidos podem ser selecionados.";

        return (
          <Tooltip
            key={index}
            title={
              tooltipMessage ? (
                <Typography variant="body2">{tooltipMessage}</Typography>
              ) : (
                ""
              )
            }
            arrow
            placement="top"
          >
            <div>
              <ScheduleTime
                value={slot}
                onSelectSlot={() => onSelectSlots(slot)}
                selected={isSelected}
                primaryColor={primaryColor}
                disabled={scheduledTime.length > 0 && !isEnabled}
              />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default TimeSlots;
