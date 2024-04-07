import { useCallback, memo, useContext } from "react";
import Knob from "./Knob";
import { LFOControlsProps } from "../types";
import { OptionsContext } from "../contexts/OptionsContext";

const LFOControls = ({ lfo, sourcesNum}: LFOControlsProps) => {
  const frequency = lfo.frequency.toFrequency(lfo.frequency.value);
  const min = lfo.get().min;
  const max = lfo.get().max;
  const amplitude = lfo.get().amplitude;
  const optionsContext = useContext(OptionsContext);
  let rangeMultiple
  if (sourcesNum === 0) {
    rangeMultiple = optionsContext.options.lfo1.rangeMultiple;
  } else {
    rangeMultiple = optionsContext.options.lfo2.rangeMultiple;
  }

  const handleFrequencyChange = useCallback(
    (value: number) => {
      lfo.set({ frequency: value});

      const optionsCopy = Object.assign({}, optionsContext.options);
      switch ( sourcesNum) {
        case 0:
          optionsCopy.lfo1.frequency = value;
          break;
        case 1:
          optionsCopy.lfo2.frequency = value;
          break;
      }

      optionsContext.setOptions(optionsCopy);
    },
    [lfo, optionsContext]
  );

  const handleMinChange = useCallback(
    (value: number) => {
      lfo.set({ min: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      switch ( sourcesNum) {
        case 0:
          optionsCopy.lfo1.min = value;
          break;
        case 1:
          optionsCopy.lfo2.min = value;
          break;
      }

      optionsContext.setOptions(optionsCopy);
    },
    [lfo, optionsContext]
  );

  const handleMaxChange = useCallback(
    (value: number) => {
      lfo.set({ max: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      switch ( sourcesNum) {
        case 0:
          optionsCopy.lfo1.max = value;
          break;
        case 1:
          optionsCopy.lfo2.max = value;
          break;
      }

      optionsContext.setOptions(optionsCopy);
    },
    [lfo, optionsContext]
  );

  const handleAmplitudeChange = useCallback(
    (value: number) => {
      lfo.set({ amplitude: value});

      const optionsCopy = Object.assign({}, optionsContext.options);
      switch ( sourcesNum) {
        case 0:
          optionsCopy.lfo1.amplitude = value;
          break;
        case 1:
          optionsCopy.lfo2.amplitude = value;
          break;
      }

      optionsContext.setOptions(optionsCopy);
    },
    [lfo, optionsContext]
  );

  const handleRangeMultipleChange = useCallback(
    (value: number) => {
      rangeMultiple = value;

      const optionsCopy = Object.assign({}, optionsContext.options);
      switch ( sourcesNum) {
        case 0:
          optionsCopy.lfo1.rangeMultiple = value;
          break;
        case 1:
          optionsCopy.lfo2.rangeMultiple = value;
          break;
      }

      optionsContext.setOptions(optionsCopy);
    },
    [lfo, optionsContext]
  );

  return (
    <div className="control-container lfo-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">{`LFO ${sourcesNum + 1}`}</label>
        </div>
      </div>
      <div className="row justify-center">
        <div className="frequency-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
              <Knob
                min={0}
                max={10}
                value={frequency}
                onValueChange={handleFrequencyChange}
                width={50}
                height={50}
                step={0.01}
              />
              <label className="unselectable title-small">Freq</label>
              <span className="tooltip unselectable value">{`${Math.round(
                      frequency
              )}Hz`}</span>
            </div>
            <div className="column hasTooltip">
              <Knob
                min={0}
                max={1}
                value={amplitude}
                onValueChange={handleAmplitudeChange}
                width={50}
                height={50}
                step={0.01}
              />
              <label className="unselectable title-small">Amp</label>
              <span className="tooltip unselectable value">{`${Math.round(
                      amplitude * 100
              )}%`}</span>
             </div>
             <div className="column hasTooltip">
              <Knob
                min={-10 * rangeMultiple}
                max={10 * rangeMultiple}
                value={min}
                onValueChange={handleMinChange}
                width={50}
                height={50}
                step={1}
              />
              <label className="unselectable title-small">Min</label>
              <span className="tooltip unselectable value">{`${Math.round(
                      min
              )}`}</span>
            </div>
            <div className="column hasTooltip">
              <Knob
                min={-10 * rangeMultiple}
                max={10 * rangeMultiple}
                value={max}
                onValueChange={handleMaxChange}
                width={50}
                height={50}
                step={1}
              />
              <label className="unselectable title-small">Max</label>
              <span className="tooltip unselectable value">{`${Math.round(
                      max
              )}`}</span>
            </div>
            <div className="column hasTooltip">
              <Knob
                min={1}
                max={1000}
                value={rangeMultiple}
                onValueChange={handleRangeMultipleChange}
                width={50}
                height={50}
                step={100}
              />
              <label className="unselectable title-small">* Range</label>
              <span className="tooltip unselectable value">{`${
                      rangeMultiple
              }`}</span>
            </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LFOControls);

