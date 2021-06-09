import { Opaque } from "./Opaque";

export class Note {
  constructor(readonly noteName: NoteNameType, readonly  octave: number) {
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
    return `${this.noteName}${this.octave}`;
  }

}

export type NoteNameType = Opaque<'NoteNameType', object>

export const C = {} as NoteNameType;
export const Csharp = {} as NoteNameType;
export const D = {} as NoteNameType;
export const Dsharp = {} as NoteNameType;
export const E = {} as NoteNameType;
export const F = {} as NoteNameType;
export const Fsharp = {} as NoteNameType;
export const G = {} as NoteNameType;
export const Gsharp = {} as NoteNameType;
export const A = {} as NoteNameType;
export const Asharp = {} as NoteNameType;
export const B = {} as NoteNameType;


export const NoteName = {

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


export type Rotation = Opaque<'Rotation', number>
export const Rotation0 = {} as Rotation;
export const Rotation1 = {} as Rotation;
export const Rotation2 = {} as Rotation;

export type OctaveExplode = Opaque<'OctaveExplode', boolean>
export const OctaveExploded = {} as OctaveExplode
export const NotOctaveExploded = {} as OctaveExplode;

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
        .reduce(([head, ...rest], interval) => {
          return [head.plus(interval), head, ...rest];
        }, [this.baseNote])
        .reverse();

    return (this.octaveExplode === OctaveExploded) 
        ? [notes[0], notes[1].plus(12), notes[2]]
        : notes
  }
}

export class TriadCore {
  constructor(readonly intervals: [number, number, number]) {
    if (intervals[0] + intervals[1] + intervals[2] !== 12)
      throw new Error("TriadCore must be 3 integers summing up to 12");
    this.intervals = intervals;
  }
}

export const StackedMinor2 = new TriadCore([1, 1, 10]);
export const Minor2PlusMajor2 = new TriadCore([1, 2, 9]);
export const Major2PlusMinor2 = new TriadCore([1, 9, 2]);
export const MinorMajor = new TriadCore([1, 3, 8]);
export const MinorMajorI = new TriadCore([1, 8, 3]);
export const Major7With5 = new TriadCore([1, 7, 4]);
export const Major7With3 = new TriadCore([1, 4, 7]);
export const Lydian = new TriadCore([1, 5, 6]);
export const Phrygian = new TriadCore([1, 6, 5]);
export const Major2Plus4 = new TriadCore([2, 2, 8]);
export const Minor7With3 = new TriadCore([2, 3, 7]);
export const Minor7With5 = new TriadCore([2, 7, 3]);
export const Dominant = new TriadCore([2, 4, 6]);
export const HalfDiminished = new TriadCore([2, 6, 4]);
export const Stacked4s = new TriadCore([2, 5, 5]);
export const Diminished = new TriadCore([3, 3, 6]);
export const Minor = new TriadCore([3, 4, 5]);
export const Major = new TriadCore([3, 5, 4]);
export const Augmented = new TriadCore([4, 4, 4]);
