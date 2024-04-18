import React, { Component } from "react";

import {
  PolySynth,
  Gain,
  Filter,
  Volume,
  Reverb,
  Distortion,
  EQ3,
  FeedbackDelay,
  BitCrusher,
  Destination,
  FFT,
  Synth,
  LFO,
  Signal
} from "tone";

import { OptionsContext } from "../contexts/OptionsContext";

import OscillatorControls from "./OscillatorControls";
import LFOControls from "./LFOControls";
import PatchbayController from "./PatchbayController";
import MasterControls from "./MasterControls";
import EnvelopeControls from "./EnvelopeControls";
import FilterControls from "./FilterControls";
import Keyboard from "./Keyboard";
import EffectsControls from "./EffectsControls";
import EQ3Controls from "./EQ3Controls";
import Midi from "./Midi";
import Presets from "./Presets";

import { KEY_TO_FULLNOTE, VALID_KEYS } from "../globals/constants";

import { options, SynthControllerState, ModularOutput, ModularInput } from "../types";

import { defaults } from "../presets";

import "../styles/SynthController.css";

class SynthController extends Component<{}, SynthControllerState> {
  synth1: PolySynth;
  synth2: PolySynth;
  node1: Gain;
  node2: Gain;
  filter: Filter;
  masterVolume: Volume;
  reverb: Reverb;
  eq3: EQ3;
  distortion: Distortion;
  delay: FeedbackDelay;
  bitCrusher: BitCrusher;
  fft: FFT;
  lfo1: LFO;
  lfo2: LFO;
  sources: Array<ModularOutput>;
  destinations: Array<ModularInput>;
  state: SynthControllerState;
  constructor(props: any) {
    super(props);
    this.state = {
      baseOctave: 3,
      notesPlaying: [],
      dragging: false,
      options: defaults,
    };
    this.synth1 = new PolySynth(Synth, defaults.synth1);
    this.synth2 = new PolySynth(Synth, defaults.synth2);
    this.node1 = new Gain(0.5);
    this.node2 = new Gain(0.5);
    this.filter = new Filter(defaults.filter);
    this.masterVolume = new Volume(defaults.masterVolume);
    this.reverb = new Reverb(defaults.reverb);
    this.eq3 = new EQ3(defaults.eq3);
    this.distortion = new Distortion(defaults.distortion);
    this.delay = new FeedbackDelay(defaults.delay);
    this.bitCrusher = new BitCrusher(defaults.bitCrusher);
    this.fft = new FFT(512);
    this.lfo1 = new LFO();
    this.lfo2 = new LFO();

    this.sources = [];
    this.sources.push(
      {
        id: 0,
        node: this.lfo1,
        name: "lfo1",
        destination: -1
      },
      {
        id: 1, 
        node: this.lfo2,
        name: "lfo2",
        destination: -1
      }
    );
    this.destinations = [];
    this.destinations.push(
      {
        id: 0,
        isSelected: false,
        connectedSource: -1,
        node: this.filter.frequency, 
        name: "filt cut"
      },
      {
        id: 1,
        isSelected: false,
        connectedSource: -1,
        node: this.filter.Q,
        name: "filt res"
      },
      {
        id: 2,
        isSelected: false,
        connectedSource: -1, 
        node: this.delay.wet, 
        name: "delay wet"
      },
      {
        id: 3,
        isSelected: false,
        connectedSource: -1, 
        node: this.delay.feedback, 
        name: "delay fb"
      },
      {
        id: 4,
        isSelected: false,
        connectedSource: -1, 
        node: this.bitCrusher.wet, 
        name: "bitcr wet"
      },
      {
        id: 5,
        isSelected: false,
        connectedSource: -1, 
        node: this.distortion.wet, 
        name: "dstrt wet"
      },
      {
        id: 6,
        isSelected: false,
        connectedSource: -1, 
        node: this.reverb.wet, 
        name: "rvb wet"
      },
    );

    this.init();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  initEnvelopes = () => {
    //set envelopes values for synth1
    this.synth1.set({
      envelope: defaults.envelope,
    });
    // set envelopes values for synth2
    this.synth2.set({
      envelope: defaults.envelope,
    });
  };

  init = () => {
    this.initEnvelopes();

    //send each synth through a Gain node to prevent clipping
    this.synth1.connect(this.node1);
    this.synth2.connect(this.node2);

    //connect both Gain nodes to the filter
    this.node1.connect(this.filter);
    this.node2.connect(this.filter);

    //connect the filter -> EQ3 -> distortion -> bitCrusher -> delay -> reverb -> masterVolume -> fft
    this.filter.chain(
      this.eq3,
      this.distortion,
      this.bitCrusher,
      this.delay,
      this.reverb,
      this.masterVolume,
      this.fft,
      Destination
    );

    this.lfo1.start();
    this.lfo2.start();
  };

  onKeyDown = (event: KeyboardEvent) => {
    // if key held down
    if (event.repeat) {
      return;
    }
    const key = event.key.toLowerCase();
    if (VALID_KEYS.includes(key)) {
      const fullNoteObj = KEY_TO_FULLNOTE[key];
      const fullNote = `${fullNoteObj.note}${
        this.state.baseOctave + fullNoteObj.octaveMod
      }`;

      this.playNote(fullNote, false, true);
    }
  };

  onKeyUp = (event: KeyboardEvent) => {
    const key: string = event.key.toLowerCase();

    if (VALID_KEYS.includes(key)) {
      const fullNoteObj = KEY_TO_FULLNOTE[key];
      const fullNote = `${fullNoteObj.note}${
        this.state.baseOctave + fullNoteObj.octaveMod
      }`;

      this.stopNote(fullNote);
    }
  };

  // io is true, then connects, else disconnects
  patch = (source: number, destination: number, io: boolean) => {
    const newOptions = Object.assign({}, this.state.options);
    if (io) {
      if (this.sources[source].destination > -1) {
        this.patch(source, this.sources[source].destination, false)
      }

      this.sources[source].node.connect(this.destinations[destination].node);
      this.sources[source].destination = destination;
      this.destinations[destination].isSelected = true;
      this.destinations[destination].connectedSource = source;
    } else {
      if (destination > -1) {
        this.sources[source].node.disconnect(this.destinations[destination].node);
        this.sources[source].destination = -1;
        this.destinations[destination].isSelected = false;
        this.destinations[destination].connectedSource = -1;

        if (this.destinations[destination].node instanceof Signal<"frequency">) {
          let signalNode: Signal<"frequency"> = this.destinations[destination].node as Signal<"frequency">;
          signalNode.overridden = false;
        }
      }
    }
    this.setState({options: newOptions});
  }

  playNote = (
    fullNote: string,
    startDrag: boolean = false,
    isKeyPress: boolean = false
  ) => {
    if (!this.state.notesPlaying.includes(fullNote)) {
      //play attack of note
      if (startDrag || this.state.dragging || isKeyPress) {
        this.synth1.triggerAttack(fullNote);
        this.synth2.triggerAttack(fullNote);

        //add note to notesPlaying
        this.setState((prevState) => ({
          notesPlaying: [...prevState.notesPlaying, fullNote],
          dragging: startDrag ? true : prevState.dragging,
        }));
      }
    }
  };

  stopNote = (fullNote: string, stopDrag: boolean = false) => {
    if (this.state.notesPlaying.includes(fullNote)) {
      //trigger release of note
      this.synth1.triggerRelease(fullNote);
      this.synth2.triggerRelease(fullNote);

      //remove note from notesPlaying
      this.setState((prevState) => ({
        notesPlaying: this.state.notesPlaying.filter((n) => n !== fullNote),
        dragging: stopDrag ? false : prevState.dragging,
      }));
    } else if (!fullNote) {
      // stop drag on empty note
      this.setState({
        dragging: false,
      });
    }
  };

  setBaseOctave = (value: number) => {
    this.setState({ baseOctave: value });
    //stop all notes in notesPlaying
    this.state.notesPlaying.forEach((note) => {
      this.stopNote(note);
    });
  };

  changePreset = (preset: options) => {
    this.synth1.set(preset.synth1);
    this.synth2.set(preset.synth2);
    this.synth1.set({ envelope: preset.envelope });
    this.synth2.set({ envelope: preset.envelope });
    this.filter.set(preset.filter);
    this.masterVolume.set({ volume: preset.masterVolume });
    this.reverb.set(preset.reverb);
    this.eq3.set(preset.eq3);
    this.distortion.set(preset.distortion);
    this.delay.set(preset.delay);
    this.bitCrusher.set(preset.bitCrusher);
    this.setState({ options: preset });
  };

  setOptions = (options: options) => {
    this.setState({ options: options });
  };

  render() {
    return (
      <div className="container unselectable">
        <div className="top-bar">
          <Midi playNote={this.playNote} stopNote={this.stopNote} />
          <Presets changePreset={this.changePreset} />
        </div>
        <OptionsContext.Provider
          value={{ options: this.state.options, setOptions: this.setOptions }}
        >
          <div className="top-container">
            <OscillatorControls synthNum={1} synth={this.synth1} />
            <OscillatorControls synthNum={2} synth={this.synth2} />
            <EnvelopeControls synth1={this.synth1} synth2={this.synth2} />
            <FilterControls
              filter={this.filter}
              isPlaying={this.state.notesPlaying.length > 0}
              fft={this.fft}
            />
            <EQ3Controls eq3={this.eq3} />
            <EffectsControls
              reverb={this.reverb}
              distortion={this.distortion}
              delay={this.delay}
              bitCrusher={this.bitCrusher}
            />
          </div>
          <div className="bottom-container">
            <MasterControls
              masterVolume={this.masterVolume}
              octave={this.state.baseOctave}
              setOctave={this.setBaseOctave}
            />
            <Keyboard
              notesPlaying={this.state.notesPlaying}
              octave={this.state.baseOctave}
              playNote={this.playNote}
              stopNote={this.stopNote}
            />
          </div>
          <div className="middle-container">
            <LFOControls
              lfo={this.lfo1}
              sourcesNum={0}
            />
            <LFOControls
              lfo={this.lfo2}
              sourcesNum={1}
            />
          </div>
          <div className="middle-container">
            <PatchbayController 
              sources={this.sources}
              destinations={this.destinations}
              patch={(source, destination, io) => this.patch(source, destination, io)}
            />
          </div>
        </OptionsContext.Provider>
      </div>
    );
  }
}

export default SynthController;
