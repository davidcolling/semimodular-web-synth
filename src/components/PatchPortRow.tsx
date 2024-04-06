import { memo } from "react";
import { PatchPortRowProps } from "../types";
import PatchPort from "./PatchPort";

const PatchPortRow = ({ inputs, patch }: PatchPortRowProps) => {
  return (
    <div style={{display: 'inline'}}>
      {
        inputs.map((input) => {
          return (
            <PatchPort isSelected={input} patch={patch} />
          );
        })
      }
    </div>
  );
};

export default memo(PatchPortRow);
