import { memo } from "react";
import { PatchbayInputLabelProps } from "../types";

const PatchbayOutputLabel = ({ name }: PatchbayInputLabelProps ) => {
  return (
    <div>
      <div className="rotated">
        <p>{name}</p>
      </div>
      <svg
        width={10}
        height={10}
        style={{
          display: "inline",
        }}
      >
         <polygon points="5 0, 0 10, 10 10" />
      </svg>
    </div>
  );
};

export default memo(PatchbayOutputLabel);

