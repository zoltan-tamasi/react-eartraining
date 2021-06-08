import { 
  Note, NoteName, Chord, Rotation0, Rotation2, TriadCore, StackedMinor2, Major7With5, NotOctaveExploded 
} from './TriadCore';

test('NoteName test', () => {

  const A = new Note(new NoteName('A#'), 1);
  expect(A.successor().noteName.noteName).toEqual('B');

  const B = new Note(new NoteName('B'), 1);
  expect(B.successor().noteName.noteName).toEqual('C');
  expect(B.successor().octave).toEqual(2);

  const chord1 = new Chord(StackedMinor2, Rotation0, NotOctaveExploded, new Note(new NoteName('A'), 1));
  expect(chord1.rotation).toBe(Rotation0);
  expect(chord1.intervals()).toEqual([1, 1, 10]);
  expect(chord1.notesOf().map(({ noteName }) => noteName.noteName)).toEqual(['A', 'A#', 'B']);


  const chord2 = new Chord(Major7With5, Rotation2, NotOctaveExploded, new Note(new NoteName('A'), 1));
  expect(chord2.rotation).toBe(Rotation2);
  expect(chord2.intervals()).toEqual([4, 1, 7]);
  expect(chord2.notesOf().map(({ noteName }) => noteName.noteName)).toEqual(['A', 'C#', 'D']);

  const chord3 = new Chord(Major7With5, Rotation2, NotOctaveExploded, new Note(new NoteName('A'), 1));
  expect(chord3.rotation).toBe(Rotation2);
  expect(chord3.intervals()).toEqual([4, 1, 7]);
  expect(chord3.notesOf().map(({ noteName }) => noteName.noteName)).toEqual(['A', 'C#', 'D']);

  const triadCore1 = expect(() => new TriadCore([1, 1, 1])).toThrow();
  const triadCore2 = expect(() => new TriadCore([1, 1, 10])).not.toThrow();


});
