import { memo } from "react";
import { PatchbayLabelProps } from "../types";

const PatchbayOutputLabel = ({ name }: PatchbayLabelProps ) => {
  return (
    <div>
      <div className="title-small rotated">
        <p>{name}</p>
      </div>
      <svg
        width={10}
        height={10}
        style={{
          display: "block",
          margin: "auto",
          paddingTop: "10px"
        }}
      >
         <polygon points="5 0, 0 10, 10 10" />
      </svg>
    </div>
  );
};

export default memo(PatchbayOutputLabel);

