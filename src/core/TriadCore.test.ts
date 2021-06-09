import {
  Note,
  Chord,
  Rotation0,
  Rotation1,
  Rotation2,
  TriadCore,
  StackedMinor2,
  Major7With5,
  NotOctaveExploded,
  Phrygian,
  OctaveExploded,
  A, B, C, Asharp, Csharp, Dsharp, Gsharp, D
} from './TriadCore';

test('NoteName test', () => {

  expect(new Note(A, 1).successor().noteName).toEqual(B);

  expect(new Note(B, 1).successor().noteName).toEqual(C);
  expect(new Note(B, 1).successor().octave).toEqual(2);

  const chord1 = new Chord(Rotation0, StackedMinor2, new Note(A, 1), NotOctaveExploded);
  expect(chord1.rotation).toBe(Rotation0);
  expect(chord1.intervals()).toEqual([1, 1, 10]);
  expect(chord1.notesOf().map(({ noteName }) => noteName)).toEqual([A, Asharp, B]);


  const chord2 = new Chord(Rotation2, Major7With5, new Note(A, 1), NotOctaveExploded);
  expect(chord2.rotation).toBe(Rotation2);
  expect(chord2.intervals()).toEqual([4, 1, 7]);
  expect(chord2.notesOf().map(({ noteName }) => noteName)).toEqual([A, Csharp, D]);

  const chord3 = new Chord(Rotation1, Phrygian, new Note(A, 1), OctaveExploded);
  expect(chord3.rotation).toBe(Rotation1);
  expect(chord3.intervals()).toEqual([6, 5, 1]);
  expect(chord3.notesOf().map(({ noteName }) => noteName)).toEqual([A, Dsharp, Gsharp]);
  expect(chord3.notesOf()[0].octave).toEqual(1);
  expect(chord3.notesOf()[1].octave).toEqual(3);
  expect(chord3.notesOf()[2].octave).toEqual(2);

  expect(() => new TriadCore([1, 1, 1])).toThrow();
  expect(() => new TriadCore([1, 1, 10])).not.toThrow();


});
