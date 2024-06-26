import { TriadCore, Rotation, OctaveExplode, Note, NoteNameType, Chord } from "../core/TriadCore";

const getImage = (triadCore: TriadCore): string => {

  const mapping: { [key: string]: string; } = {
    "StackedMinor2": "img/1-1-10.png",
    "Minor2PlusMajor2": "img/1-2-9.png",
    "Major2PlusMinor2" :  "img/1-9-2.png",
    "MinorMajor" :  "img/1-3-8.png",
    "MinorMajorI" :  "img/1-8-3.png",
    "Lydian" :  "img/1-5-6.png",
    "Phrygian" :  "img/1-6-5.png",
    "Major2Plus4" :  "img/2-2-8.png",
    "Minor7With3" :  "img/2-3-7.png",
    "Minor7With5" :  "img/2-7-3.png",
    "Dominant" :  "img/2-4-6.png",
    "HalfDiminished" :  "img/2-6-4.png",
    "Minor" :  "img/3-4-5.png",
    "Major" :  "img/3-5-4.png",
    "Augmented" :  "img/4-4-4.png",
    "Diminished" :  "img/3-3-6.png",
    "Major7With5" :  "img/1-7-4.png",
    "Major7With3" :  "img/1-4-7.png",
    "Stacked4s" :  "img/2-5-5.png",
  };
  
  return mapping[triadCore.label];
}

export const getNoteWheel = (triadCore: TriadCore, rotation: Rotation, octaveExplode: OctaveExplode, baseNote: Note): [NoteNameType, number, boolean][] => {
  
  const chord = new Chord(rotation, triadCore, baseNote, octaveExplode);
  const noteList = [baseNote];
  
  Array.from({ length: 11 }, () => {
    noteList.push(noteList[noteList.length - 1].successor());
  });
  
  return noteList.map((note, position) => {
    if (chord.notesOf().map(note => note.noteName).includes(note.noteName)) {
      return [note.noteName, position, true];
    } else {
      return [note.noteName, position, false];
    }
  })
}

export const getImageAndRotation = (triadCore: TriadCore, rotation: Rotation): [string, string] => {
  const imageRotation = 
  {
    "Rotation0":  0,
    "Rotation1": triadCore.intervals[0],
    "Rotation2": (triadCore.intervals[0] + triadCore.intervals[1])
  }[rotation.toString()];
  
  return [getImage(triadCore), `rotation-${imageRotation}`]
}
