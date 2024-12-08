import React from "react";
import ScheduleTime from "../scheduleTime/ScheduleTime";
import { ReservationTypes } from "../../types/generalTypes";
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

        const isEnabled = scheduledTime.includes(slot) || isNextSlot;

        return (
          <ScheduleTime
            key={index}
            value={slot}
            onSelectSlot={() => onSelectSlots(slot)}
            selected={scheduledTime.includes(slot)}
            primaryColor={primaryColor}
            disabled={scheduledTime.length > 0 && !isEnabled}
          />
        );
      })}
    </div>
  );
};

export default TimeSlots;
