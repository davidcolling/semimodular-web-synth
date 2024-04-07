import { memo } from "react";
import { PatchbayProps } from "../types/index.js";
import PatchPortRow from "./PatchPortRow"

const PatchbayControls = ({sources, destinations, patch}: PatchbayProps) => {

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
              <PatchPortRow 
                source={sources[0]}
                destinations={destinations} 
                patch={patch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PatchbayControls);

