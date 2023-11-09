import { ChangeEvent, useContext, useCallback, memo } from "react";
import { OptionsContext } from "../contexts/OptionsContext";
import { PatchbayProps } from "../types/index.js";

const PatchbayControls = ({sources, destinations, patch}: PatchbayProps) => {
  const optionsContext = useContext(OptionsContext);

  const handleLfo1Change = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      var value = parseInt(event.target.value, 10)
      const optionsCopy = Object.assign({}, optionsContext.options);
      patch(0, optionsCopy.patchbay.lfo1Destination, false);
      optionsCopy.patchbay.lfo1Destination = value;
      patch(0, optionsCopy.patchbay.lfo1Destination, true);
  
      optionsContext.setOptions(optionsCopy);
    },
    [optionsContext]
  )
  
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
                    <option key={destination.id} value={destination.id}>
                      {destination.name} {destination.id}
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

export default memo(PatchbayControls);

