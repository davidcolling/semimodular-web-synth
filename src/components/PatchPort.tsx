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
        width={50}
        height={50}
        ref={patchPort}
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

