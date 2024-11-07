import { memo } from "react";
import { PatchbayInputLabelProps } from "../types";

const PatchbayInputLabel = ({ name, }: PatchbayInputLabelProps ) => {
  return (
    <div
      style={{
        display: "inline"
      }}
    >
      <svg
        width={10}
        height={10}
        style={{
          display: "inline",
        }}
      >
         <polygon points="0 0, 0 10, 10 5" />
      </svg>
    </div>
  );
};

export default memo(PatchbayInputLabel);

