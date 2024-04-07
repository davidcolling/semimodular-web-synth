import { memo, useCallback, useContext } from "react";
import { PatchPortRowProps } from "../types";
import PatchPort from "./PatchPort";
import { OptionsContext } from "../contexts/OptionsContext";

const PatchPortRow = ({ source, destinations, patch }: PatchPortRowProps) => {
  const optionsContext = useContext(OptionsContext);

  const onValueChange = useCallback(
    (destId: number, value: boolean) => {
      patch(source.id, destId, value);
    }, 
    [destinations, optionsContext]
  );

  return (
    <div style={{display: 'inline'}}>
      <PatchPort
        destId={-1}
        isSelected={source.destination == -1}
        onValueChange={onValueChange}
      />
      {
        destinations.map((destination) => {
          return (
            <PatchPort 
              destId={destination.id} 
              isSelected={destination.isSelected} 
              onValueChange={onValueChange} 
            />
          );
        })
      }
    </div>
  );
};

export default memo(PatchPortRow);
