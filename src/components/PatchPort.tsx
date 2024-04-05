import { memo } from "react";
import { PatchPortProps } from "../types";

const PatchPort = ({ isSelected }: PatchPortProps) => {
  return (
    <div>
      <svg
        width={50}
        height={50}
      >
      {
        isSelected && 
        <circle 
          cx={25}
          cy={25}
          r={20}
          fill="#000000"
        />
      }
      {
        !isSelected && 
        <circle 
          cx={25}
          cy={25}
          r={20}
          fill="#7f7f7f"
        />
      }
      </svg>
    </div>
  );
};

export default memo(PatchPort);
