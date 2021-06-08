
export class Note {
  noteName: NoteName;
  octave: number;

  constructor(noteName: NoteName, octave: number) {
    this.noteName = noteName;
    this.octave = octave;
  }

  plus(toAdd: number): Note {
    if (toAdd === 0) return this;
    return this.successor().plus(toAdd - 1);
  }

  successor(): Note {
    return this.noteName.noteName.toString() === 'B' ? 
      new Note(new NoteName('C'), this.octave + 1) : 
      new Note(this.noteName.successor(), this.octave)
  }

  toString(): string {
    return `${this.noteName}${this.octave}`;
  }

}


export type NoteNameType = 'A' | 'A#' | 'B' | 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'H';

export class NoteName {
  noteName: NoteNameType

  constructor(noteName: NoteNameType) {
    this.noteName = noteName
  }

  fromInt(noteValue: number): NoteName {
    if (noteValue === 0) return new NoteName('C');
    if (noteValue === 1) return new NoteName('C#');
    if (noteValue === 2) return new NoteName('D');
    if (noteValue === 3) return new NoteName('D#');
    if (noteValue === 4) return new NoteName('E');
    if (noteValue === 5) return new NoteName('F');
    if (noteValue === 6) return new NoteName('F#');
    if (noteValue === 7) return new NoteName('G');
    if (noteValue === 8) return new NoteName('G#');
    if (noteValue === 9) return new NoteName('A');
    if (noteValue === 10) return new NoteName('A#');
    if (noteValue === 11) return new NoteName('B');
    throw new Error('Note value must be between 0 - 11');
  }

  successor(): NoteName {
    if (this.noteName === 'C') return new NoteName('C#');
    if (this.noteName === 'C#') return new NoteName('D');
    if (this.noteName === 'D') return new NoteName('D#');
    if (this.noteName === 'D#') return new NoteName('E');
    if (this.noteName === 'E') return new NoteName('F');
    if (this.noteName === 'F') return new NoteName('F#');
    if (this.noteName === 'F#') return new NoteName('G');
    if (this.noteName === 'G') return new NoteName('G#');
    if (this.noteName === 'G#') return new NoteName('A');
    if (this.noteName === 'A') return new NoteName('A#');
    if (this.noteName === 'A#') return new NoteName('B');
    return new NoteName('C');
  }

  predecessor(): NoteName {
    if (this.noteName === 'C') return new NoteName('B');
    if (this.noteName === 'C#') return new NoteName('C');
    if (this.noteName === 'D') return new NoteName('C#');
    if (this.noteName === 'D#') return new NoteName('D');
    if (this.noteName === 'E') return new NoteName('D#');
    if (this.noteName === 'F') return new NoteName('E');
    if (this.noteName === 'F#') return new NoteName('F');
    if (this.noteName === 'G') return new NoteName('F#');
    if (this.noteName === 'G#') return new NoteName('G');
    if (this.noteName === 'A') return new NoteName('G#');
    if (this.noteName === 'A#') return new NoteName('A');
    return new NoteName('A#');
  }
}

export class Rotation {}

export const Rotation0 = new Rotation();
export const Rotation1 = new Rotation();
export const Rotation2 = new Rotation();

export class OctaveExplode {}

export const OctaveExploded = new OctaveExplode();
export const NotOctaveExploded = new OctaveExplode();

export class Chord {
  rotation: Rotation;
  triadCore: TriadCore;
  baseNote: Note;
  octaveExplode: OctaveExplode;

  constructor(triadCore: TriadCore, rotation: Rotation, octaveExplode: OctaveExplode, baseNote: Note) {
    this.rotation = rotation;
    this.triadCore = triadCore;
    this.baseNote = baseNote;
    this.octaveExplode = octaveExplode;
  }

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
        .reduce(([head, ...rest], interval, index) => {
          return [head.plus(interval), head, ...rest];
        }, [this.baseNote])
        .reverse();

    return (this.octaveExplode === OctaveExploded) 
        ? [notes[0], notes[1].plus(12), notes[2]]
        : notes
  }
}

export class TriadCore {
  intervals: [number, number, number];

  constructor(intervals: [number, number, number]) {
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


