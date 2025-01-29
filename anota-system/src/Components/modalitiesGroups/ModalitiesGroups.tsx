import { useEffect } from "react";
import { FormControl, FormControlLabel, RadioGroup } from "@mui/material";
import RadioSelect from "../radioSelect/RadioSelect";
import Futvolei from "../../icons/futvolei.svg";
import Volei from "../../icons/volei.svg";
import BeachTennis from "../../icons/beachTennis.svg";
import Soccer from "../../icons/soccer.png";

interface ModalitiesGroupsProps {
  onSelectModality: (modality: number) => void;
  modalitySelected?: number;
  modalityCourt?: number;
  primaryColor: string;
}

const ModalitiesGroups = ({
  onSelectModality,
  modalitySelected,
  primaryColor,
  modalityCourt,
}: ModalitiesGroupsProps) => {
  useEffect(() => {
    if (modalityCourt === 1) onSelectModality(3);
    if (modalityCourt === 2) onSelectModality(0);
  }, []);

  if (modalityCourt === 1) {
    return (
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value={3}
            onClick={() => onSelectModality(3)}
            control={
              <RadioSelect
                label="Futebol"
                color={primaryColor}
                icon={Soccer}
                checked={modalitySelected === 3}
              />
            }
            label=""
          />
        </RadioGroup>
      </FormControl>
    );
  }

  if (modalityCourt === 2) {
    return (
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value={0}
            onClick={() => onSelectModality(0)}
            control={
              <RadioSelect
                label="Beach Tennis"
                color={primaryColor}
                icon={BeachTennis}
                checked={modalitySelected === 0}
              />
            }
            label=""
          />
        </RadioGroup>
      </FormControl>
    );
  }

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value={0}
          onClick={() => onSelectModality(0)}
          control={
            <RadioSelect
              label="Beach Tennis"
              color={primaryColor}
              icon={BeachTennis}
              checked={modalitySelected === 0}
            />
          }
          label=""
        />
        <FormControlLabel
          value={1}
          onClick={() => onSelectModality(1)}
          control={
            <RadioSelect
              label="Futvôlei"
              color={primaryColor}
              icon={Futvolei}
              checked={modalitySelected === 1}
            />
          }
          label=""
        />
        <FormControlLabel
          value={2}
          onClick={() => onSelectModality(2)}
          control={
            <RadioSelect
              label="Vôlei"
              color={primaryColor}
              icon={Volei}
              checked={modalitySelected === 2}
            />
          }
          label=""
        />
      </RadioGroup>
    </FormControl>
  );
};

export default ModalitiesGroups;
