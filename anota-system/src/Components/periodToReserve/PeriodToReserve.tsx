import React from "react";
import { FormControl, FormControlLabel, RadioGroup } from "@mui/material";
import RadioSelect from "../radioSelect/RadioSelect";

interface PeriodToReserveProps {
  period?: number;
  onChange: (value: number) => void;
}

const PeriodToReserve = ({ period, onChange }: PeriodToReserveProps) => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value={0}
          onClick={() => onChange(0)}
          control={
            <RadioSelect
              label="1 Única Vez"
              color="#226FE2"
              checked={period === 0}
            />
          }
          label=""
        />
        <FormControlLabel
          value={1}
          onClick={() => onChange(1)}
          control={
            <RadioSelect label="1 Mês" color="#226FE2" checked={period === 1} />
          }
          label=""
        />
        <FormControlLabel
          value={3}
          onClick={() => onChange(3)}
          control={
            <RadioSelect
              label="3 Meses"
              color="#226FE2"
              checked={period === 3}
            />
          }
          label=""
        />
        <FormControlLabel
          value={6}
          onClick={() => onChange(6)}
          control={
            <RadioSelect
              label="6 Meses"
              color="#226FE2"
              checked={period === 6}
            />
          }
          label=""
        />
      </RadioGroup>
    </FormControl>
  );
};

export default PeriodToReserve;
