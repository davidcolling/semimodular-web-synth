import { memo } from "react";
import { PatchbayLabelProps } from "../types";

const PatchbayInputLabel = ({ name, }: PatchbayLabelProps ) => {
  return (
    <div
      style={{
        display: "inline"
      }}
    >
      <p className="unselectable title-small"
        style={{
          display: "inline",
          padding: "5px"
        }}
      >{name}</p>
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

