import { FormControl, FormControlLabel, RadioGroup } from "@mui/material";
import RadioSelect from "../radioSelect/RadioSelect";
import Futvolei from "../../icons/futvolei.svg";
import Volei from "../../icons/volei.svg";
import BeachTennis from "../../icons/beachTennis.svg";

interface ModalitiesGroupsProps {
  onSelectModality: (modality: number) => void;
  modalitySelected?: number;
}

const ModalitiesGroups = ({
  onSelectModality,
  modalitySelected,
}: ModalitiesGroupsProps) => {
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
