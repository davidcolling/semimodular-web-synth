import { useState, ChangeEvent } from "react";
import { PatchbayControlsProps } from "../types";

const PatchbayControls = ({ lfo1, destination1 }: PatchbayControlsProps) => {
  const destinations = ["filter cutoff"];

  const handleDestination1Change = (event: ChangeEvent<HTMLSelectElement>) => {
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
                onChange={handleDestination1Change}
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

