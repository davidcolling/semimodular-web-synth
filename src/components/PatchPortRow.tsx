import { memo, useCallback } from "react";
import { PatchPortRowProps } from "../types";
import PatchPort from "./PatchPort";

const PatchPortRow = ({ source, destinations, patch }: PatchPortRowProps) => {

  const onValueChange = useCallback(
    (destId: number, value: boolean) => {
      patch(source.id, destId, value);
    }, 
    [source, patch]
  );

  return (
    <div style={{display: 'inline'}}>
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
