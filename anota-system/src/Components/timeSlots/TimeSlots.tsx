import React from "react";
import ScheduleTime from "../scheduleTime/ScheduleTime";
import { ReservationTypes } from "../../types/generalTypes";
import "./TimeSlots.scss";

interface TimeSlotsProps {
  slots: ReservationTypes[];
  scheduledTime: ReservationTypes[];
  onSelectSlots: (slot: ReservationTypes) => void;
}

const TimeSlots = ({ slots, onSelectSlots, scheduledTime }: TimeSlotsProps) => {
  return (
    <div className="TimeSlots">
      {slots.map((slot, index) => (
        <ScheduleTime
          key={index}
          value={slot}
          onSelectSlot={() => onSelectSlots(slot)}
          selected={scheduledTime.includes(slot)}
          disabled={
            scheduledTime.length > 0 && scheduledTime[0].start !== slot.start
          }
        />
      ))}
    </div>
  );
};

export default TimeSlots;
