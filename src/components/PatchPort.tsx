import { memo, useEffect, useRef } from "react";
import { PatchPortProps } from "../types";

const PatchPort = ({ sourceId, destId, isSelected, onValueChange }: PatchPortProps) => {
  const patchPort = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      onValueChange(sourceId, destId, !isSelected);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.cancelable) {
        event.preventDefault();
        event.stopPropagation();
      }
      onValueChange(sourceId, destId, !isSelected);
    };

    if (patchPort) {
      const current = patchPort.current;
      if (current) {
        current.addEventListener("touchstart", handleTouchStart);
        current.addEventListener("mousedown", handleMouseDown);

        return () => {
          current.removeEventListener("touchstart", handleTouchStart);
          current.removeEventListener("mousedown", handleMouseDown);

        }
      }
    }
  }, [destId, isSelected, onValueChange]);

  return (
      <svg
        width={30}
        height={30}
        ref={patchPort}
      >
        //  make skeumorphic to moog 5U patch port (see model 10): a big silver circle at the bottome ( closest to module "panel"), smaller silver hexagon, then smaller silver circle, then an empty hole
        //  maybe not above since its for a patch cable not a plug in a matrix
        //  EMS VCS is a better analogue
        <circle 
          cx={15}
          cy={15}
          r={10}
          fill="#222222"
        />
        <circle 
          cx={17}
          cy={17}
          r={7}
          fill="#444444"
        />
        {
          isSelected && 
            <circle 
              cx={15}
              cy={15}
              r={10}
              fill="#000000"
            />
        }
      </svg>
  );
};

export default memo(PatchPort);

