import { ChangeEvent, useContext, useCallback } from "react";
import { PatchbayControlsProps } from "../types";
import { OptionsContext } from "../contexts/OptionsContext";

const PatchbayControls = ({ lfo1, destination1, destination2 }: PatchbayControlsProps) => {
  const destinations = ["filter cutoff", "filter q"];
  const optionsContext = useContext(OptionsContext);
  var connectionHappened = "false";

  const handleLfo1Change = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    lfo1.stop();

    if (value === "filter cutoff") {
      lfo1.disconnect(destination2); 
      lfo1.connect(destination1); 
    } else if (value === "filter q") {
      lfo1.disconnect(destination1); 
      lfo1.connect(destination2);
    }
    lfo1.start()

    const optionsCopy = Object.assign({}, optionsContext.options);
    optionsCopy.patchbay.lfo1Destination = value;

    optionsContext.setOptions(optionsCopy);
  };

  return (
    <div className="control-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">{`PATCHBAY`}</label>
        </div>
      </div>
      <div className="row justify-center">
        <div className="frequency-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
              <select
                className="presets-select unselectable"
                name="presetsSelect"
                onChange={handleLfo1Change}
              >
                {destinations.map((destination) => {
                  return (
                    <option key={destination} value={destination}>
                      {destination}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatchbayControls;

