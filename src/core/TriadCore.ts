import { Opaque } from "./Opaque";

export class Note {
  constructor(readonly noteName: NoteNameType, readonly octave: number) {
    this.noteName = noteName;
    this.octave = octave;
  }

  plus(toAdd: number): Note {
    if (toAdd === 0) return this;
    return this.successor().plus(toAdd - 1);
  }

  successor(): Note {
    return this.noteName === B ?
      new Note(C, this.octave + 1) :
      new Note(NoteName.successor(this.noteName), this.octave)
  }

  toString(): string {
    return `${this.noteName.toString()}${this.octave}`;
  }

  toInt(): number {
    return this.octave * 12 + NoteName.toInt(this.noteName)
  }

  static fromInt(number: number) {
    return new Note( NoteName.fromInt(number % 12), Math.floor(number / 12))
  }
}

export type NoteNameType = Opaque<'NoteNameType', object>

export const C = { toString() { return 'C' } } as NoteNameType;
export const Csharp = { toString() { return 'C#' } } as NoteNameType;
export const D = { toString() { return 'D' } } as NoteNameType;
export const Dsharp = { toString() { return 'D#' } } as NoteNameType;
export const E = { toString() { return 'E' } } as NoteNameType;
export const F = { toString() { return 'F' } } as NoteNameType;
export const Fsharp = { toString() { return 'F#' } } as NoteNameType;
export const G = { toString() { return 'G' } } as NoteNameType;
export const Gsharp = { toString() { return 'G#' } } as NoteNameType;
export const A = { toString() { return 'A' } } as NoteNameType;
export const Asharp = { toString() { return 'A#' } } as NoteNameType;
export const B = { toString() { return 'B' } } as NoteNameType;


export const NoteName = {

  toInt(noteName: NoteNameType): number {
    if (noteName === C) return 0;
    if (noteName === Csharp) return 1;
    if (noteName === D) return 2;
    if (noteName === Dsharp) return 3;
    if (noteName === E) return 4;
    if (noteName === F) return 5;
    if (noteName === Fsharp) return 6;
    if (noteName === G) return 7;
    if (noteName === Gsharp) return 8;
    if (noteName === A) return 9;
    if (noteName === Asharp) return 10;
    return 11;
  },

  fromInt(noteValue: number): NoteNameType {
    if (noteValue === 0) return C;
    if (noteValue === 1) return Csharp;
    if (noteValue === 2) return D;
    if (noteValue === 3) return Dsharp;
    if (noteValue === 4) return E;
    if (noteValue === 5) return F;
    if (noteValue === 6) return Fsharp;
    if (noteValue === 7) return G;
    if (noteValue === 8) return Gsharp;
    if (noteValue === 9) return A;
    if (noteValue === 10) return Asharp;
    if (noteValue === 11) return B;
    throw new Error('Note value must be between 0 - 11');
  },

  successor(noteName: NoteNameType): NoteNameType {
    if (noteName === C) return Csharp;
    if (noteName === Csharp) return D;
    if (noteName === D) return Dsharp;
    if (noteName === Dsharp) return E;
    if (noteName === E) return F;
    if (noteName === F) return Fsharp;
    if (noteName === Fsharp) return G;
    if (noteName === G) return Gsharp;
    if (noteName === Gsharp) return A;
    if (noteName === A) return Asharp;
    if (noteName === Asharp) return B;
    return C;
  },

  predecessor(noteName: NoteNameType): NoteNameType {
    if (noteName === C) return B;
    if (noteName === Csharp) return C;
    if (noteName === D) return Csharp;
    if (noteName === Dsharp) return D;
    if (noteName === E) return Dsharp;
    if (noteName === F) return E;
    if (noteName === Fsharp) return F;
    if (noteName === G) return Fsharp;
    if (noteName === G) return G;
    if (noteName === A) return Gsharp;
    if (noteName === Asharp) return A;
    return Asharp;
  }
}


export type Rotation = Opaque<'Rotation', string>
export const Rotation0 = { toString() { return 'Rotation0'; } } as Rotation;
export const Rotation1 = { toString() { return 'Rotation1'; } } as Rotation;
export const Rotation2 = { toString() { return 'Rotation2'; }  } as Rotation;

export const rotationFromString = (rotation: string): Rotation => {
  switch (rotation) {
    case 'Rotation0': return Rotation0;
    case 'Rotation1': return Rotation1;
    case 'Rotation2': return Rotation2;
    default:
      (() => { throw new Error(`${rotation} is not a valid rotation`) })()
  }
}

export type OctaveExplode = Opaque<'OctaveExplode', string>
export const OctaveExploded = { toString() { return 'Octave exploded' } } as OctaveExplode
export const NotOctaveExploded = { toString() { return 'Not octave exploded' } } as OctaveExplode;
export const octaveExplodedFromString = (exploded: string): OctaveExplode => {
  switch (exploded) {
    case 'Octave exploded': return OctaveExploded;
    case 'Not octave exploded': return NotOctaveExploded;
    default:
      (() => { throw new Error(`${exploded} is not a valid OctaveExplode string`) })()
  }
};

export class Chord {
  constructor(
    readonly rotation: Rotation,
    readonly triadCore: TriadCore,
    readonly baseNote: Note,
    readonly octaveExplode: OctaveExplode
  ) {}

  intervals(): [number, number, number] {
    return (
      this.rotation === Rotation0
        ? [this.triadCore.intervals[0], this.triadCore.intervals[1], this.triadCore.intervals[2]] :
        this.rotation === Rotation1
        ? [this.triadCore.intervals[1], this.triadCore.intervals[2], this.triadCore.intervals[0]] :
      //chord.rotation === Rotation2
          [this.triadCore.intervals[2], this.triadCore.intervals[0], this.triadCore.intervals[1]]
    );
  }

  notesOf(): Array<Note> {

    const notes: Array<Note> =
      this.intervals().slice(0, 2)
        .reduce(
          ([head, ...rest], interval) =>
            [head.plus(interval), head, ...rest],
          [this.baseNote]
        )
        .reverse();

    return (this.octaveExplode === OctaveExploded)
      ? [notes[0], notes[1].plus(12), notes[2]]
      : notes
  }
}

export class TriadCore {
  constructor(readonly intervals: [number, number, number], readonly label: string) {
    if (intervals[0] + intervals[1] + intervals[2] !== 12)
      throw new Error("TriadCore must be 3 integers summing up to 12");
    this.intervals = intervals;
  }

  public static fromIntervals(intervals: [number, number, number]): TriadCore {

    const rotate = (intervals: [number, number, number]): [number, number, number] =>
      [intervals[1], intervals[2], intervals[0]]

    const triadType = AllTriadTypes.find(
      core =>
        core.intervals.every((coreInterval, index) => intervals[index] === coreInterval) ||
        rotate(core.intervals).every((coreInterval, index) => intervals[index] === coreInterval) ||
        rotate(rotate(core.intervals)).every((coreInterval, index) => intervals[index] === coreInterval)
    );
    if (triadType === undefined)
      throw new Error(`Invalid intervals: ${intervals}`);
    return triadType;
  }

  public static fromLabel(label: string) {
    const triadCore = AllTriadTypes.find(triadCore => triadCore.label == label);
    if (!triadCore) throw new Error(`${label} is not a valid TriadCore`);
    return triadCore;
  }

  public invert(): TriadCore {
    return TriadCore.fromIntervals([this.intervals[0], this.intervals[2], this.intervals[1]]);
  }
}

export const StackedMinor2 = new TriadCore([1, 1, 10], 'StackedMinor2');
export const Minor2PlusMajor2 = new TriadCore([1, 2, 9], 'Minor2PlusMajor2');
export const Major2PlusMinor2 = new TriadCore([1, 9, 2], 'Major2PlusMinor2');
export const MinorMajor = new TriadCore([1, 3, 8], 'MinorMajor');
export const MinorMajorI = new TriadCore([1, 8, 3], 'MinorMajorI');
export const Major7With5 = new TriadCore([1, 7, 4], 'Major7With5');
export const Major7With3 = new TriadCore([1, 4, 7], 'Major7With3');
export const Lydian = new TriadCore([1, 5, 6], 'Lydian');
export const Phrygian = new TriadCore([1, 6, 5], 'Phrygian');
export const Major2Plus4 = new TriadCore([2, 2, 8], 'Major2Plus4');
export const Minor7With3 = new TriadCore([2, 3, 7], 'Minor7With3');
export const Minor7With5 = new TriadCore([2, 7, 3], 'Minor7With5');
export const Dominant = new TriadCore([2, 4, 6], 'Dominant');
export const HalfDiminished = new TriadCore([2, 6, 4], 'HalfDiminished');
export const Stacked4s = new TriadCore([2, 5, 5], 'Stacked4s');
export const Diminished = new TriadCore([3, 3, 6], 'Diminished');
export const Minor = new TriadCore([3, 4, 5], 'Minor');
export const Major = new TriadCore([3, 5, 4], 'Major');
export const Augmented = new TriadCore([4, 4, 4], 'Augmented');

export const AllTriadTypes = [StackedMinor2, Minor2PlusMajor2, Major2PlusMinor2, MinorMajor, MinorMajorI,
  Major7With5, Major7With3, Lydian, Phrygian, Major2Plus4, Minor7With3, Minor7With5, Dominant, HalfDiminished,
  Stacked4s, Diminished, Minor, Major, Augmented]
