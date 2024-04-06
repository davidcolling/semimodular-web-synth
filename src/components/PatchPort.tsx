import { memo } from "react";
import { PatchPortProps } from "../types";

const PatchPort = ({ isSelected, patch }: PatchPortProps) => {
  return (
      <svg
        width={50}
        height={50}
      >
        <circle 
          cx={25}
          cy={25}
          r={20}
          fill="#7f7f7f"
        />
        {
          isSelected && 
            <circle 
              cx={25}
              cy={25}
              r={20}
              fill="#000000"
            />
        }
      </svg>
  );
};

export default memo(PatchPort);

