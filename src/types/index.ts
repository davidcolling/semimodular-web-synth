import { ChangeEvent } from "react";
import {
  FFT,
  Volume,
  EQ3,
  PolySynth,
  Filter,
  FeedbackDelay,
  Reverb,
  Distortion,
  BitCrusher,
  EnvelopeOptions,
  FilterOptions,
  OmniOscillatorOptions,
  LFO,
  Frequency,
  Signal,
  OutputNode,
  InputNode,
  ToneAudioNode,
  Param
} from "tone";

type synthOptions = {
  volume: number;
  detune: number;
  oscillator: Partial<OmniOscillatorOptions>;
};

type reverbOptions = {
  wet: number;
  decay: number;
};

type eq3Options = {
  low: number;
  mid: number;
  high: number;
  lowFrequency: number;
  highFrequency: number;
};

type distortionOptions = { distortion: number; wet: number };

type delayOptions = {
  wet: number;
  delayTime: number;
  feedback: number;
};

type bitCrusherOptions = {
  wet: number;
  bits: number;
};

type lfoOptions = {
    frequency: number;
    amplitude: number;
    min: number;
    max: number;
    rangeMultiple: number;
}

type patchbayOptions = {
  [key: string]: boolean | number;
  o0dest: number;
  o1dest: number;
  o2dest: number;
  o3dest: number;
  dest0: boolean;
  dest1: boolean;
  dest2: boolean;
  dest3: boolean;
}


export type options = {
  name: string;
  synth1: synthOptions;
  synth2: synthOptions;
  envelope: Partial<EnvelopeOptions>;
  filter: Partial<FilterOptions>;
  reverb: reverbOptions;
  eq3: eq3Options;
  distortion: distortionOptions;
  delay: delayOptions;
  bitCrusher: bitCrusherOptions;
  lfo1: lfoOptions;
  lfo2: lfoOptions;
  patchbay: patchbayOptions;
  masterVolume: number;
};

export type SynthControllerState = {
  baseOctave: number;
  notesPlaying: string[];
  dragging: boolean;
  options: options;
};

export type ControlProps = {
  min: number;
  max: number;
  value: number;
  width: number;
  height: number;
  step: number;
  onValueChange: (value: number) => void;
};

export type OscillatorControlsProps = {
  synthNum: 1 | 2;
  synth: PolySynth;
};

export type LFOControlsProps = {
  lfo: LFO;
  sourcesNum: number;
};

export type EnvelopeControlsProps = {
  synth1: PolySynth;
  synth2: PolySynth;
};

export type FilterControlsProps = {
  filter: Filter;
  isPlaying: boolean;
  fft: FFT;
};

export type FilterDisplayProps = {
  type: string;
  rolloff: number;
  q: number;
  freq: number;
  gain: number;
  isPlaying: boolean;
  fft: FFT;
};

export type EffectsControlsProps = {
  reverb: Reverb;
  distortion: Distortion;
  delay: FeedbackDelay;
  bitCrusher: BitCrusher;
};

export type EQ3ControlsProps = {
  eq3: EQ3;
};

export type MasterControlsProps = {
  masterVolume: Volume;
  octave: number;
  setOctave: (octave: number) => void;
};

export type KeyProps = {
  note: string;
  octave: number;
  notesPlaying: string[];
  playNote: (fullNote: string, startDrag?: boolean) => void;
  stopNote: (fullNote: string, stopDrag?: boolean) => void;
};

export type KeyboardProps = {
  notesPlaying: string[];
  octave: number;
  playNote: (fullNote: string, startDrag?: boolean) => void;
  stopNote: (fullNote: string, stopDrag?: boolean) => void;
};

export type RadioButtonProps = {
  value: string;
  name: string;
  selected: boolean;
  size: string;
  onValueChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type RadioButtonGroupProps = {
  items: string[];
  id: string;
  comparator: string;
  buttonSize: string;
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type MidiProps = {
  playNote: (fullNote: string, startDrag?: boolean) => void;
  stopNote: (fullNote: string, stopDrag?: boolean) => void;
};

export type PresetsProps = {
  changePreset: (preset: options) => void;
};

export type ModularOutput = {
  id: number;
  node: ToneAudioNode;
  name: string;
  destination: number;
}

export type PatchPortProps = {
  sourceId: number;
  destId: number;
  isSelected: boolean;
  onValueChange: (sourceId: number, destId: number, value: boolean) => void;
}

export type PatchPortRowProps = {
  source: ModularOutput;
  destinations: Array<ModularInput>;
  patch: (source: number, destination: number, io: boolean) => void;
}

export type ModularInput = {
  id: number;
  isSelected: boolean;
  connectedSource: number;
  node: ToneAudioNode | Param<"normalRange">;
  name: string;
}

export type PatchbayProps = {
  sources: Array<ModularOutput>;
  destinations: Array<ModularInput>;
  patch: (source: number, destination: number, io: boolean) => void;
}

export type PatchbayLabelProps = {
  name: string;
}

