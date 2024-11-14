import { FormControl, FormControlLabel, RadioGroup } from "@mui/material";
import RadioSelect from "../radioSelect/RadioSelect";
import Futvolei from "../../icons/futvolei.svg";
import Volei from "../../icons/volei.svg";
import BeachTennis from "../../icons/beachTennis.svg";

const ModalitiesGroups = () => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="beachTennis"
          control={<RadioSelect label="Beach Tennis" icon={BeachTennis} />}
          label=""
        />
        <FormControlLabel
          value="futvolei"
          control={<RadioSelect label="Futvôlei" icon={Futvolei} />}
          label=""
        />
        <FormControlLabel
          value="volei"
          control={<RadioSelect label="Vôlei" icon={Volei} />}
          label=""
        />
      </RadioGroup>
    </FormControl>
  );
};

export default ModalitiesGroups;
