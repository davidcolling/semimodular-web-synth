const NOTES: string[] = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

const VALID_KEYS = ["q", "2", "w", "3", "e", "r", "5", "t", "6", "y", "7", "u"];

type key = {
  [key: string]: string;
};

const KEY_TO_NOTE: key = {
  q: "C",
  2: "Db",
  w: "D",
  3: "Eb",
  e: "E",
  r: "F",
  5: "Gb",
  t: "G",
  6: "Ab",
  y: "A",
  7: "Bb",
  u: "B",
};

type note = {
  [key: string]: string;
};

const NOTE_TO_KEY: note = {
  C: "q",
  Db: "2",
  D: "w",
  Eb: "3",
  E: "e",
  F: "r",
  Gb: "5",
  G: "t",
  Ab: "6",
  A: "y",
  Bb: "7",
  B: "u",
};

export { NOTES, KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS };
