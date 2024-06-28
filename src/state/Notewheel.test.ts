import React from 'react';
import { getNoteWheel } from './Notewheel';
import { Csharp, D, E, Minor, NotOctaveExploded, Note, Rotation0 } from '../core/TriadCore';

describe('Generate wheel of notes', () => {
  test('getNoteWheel generates notelist correctly', () => {
    
    let [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[0];

    expect(note.toString()).toBe("C#");
    expect(position).toEqual(0);
    expect(selected).toEqual(true);

    [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[1];
    
    expect(note.toString()).toBe("D");
    expect(position).toEqual(1);
    expect(selected).toEqual(false);

    [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[2];
    
    expect(note.toString()).toBe("D#");
    expect(position).toEqual(2);
    expect(selected).toEqual(false);

    [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[3];
    
    expect(note.toString()).toBe("E");
    expect(position).toEqual(3);
    expect(selected).toEqual(true);

    [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[4];
    
    expect(note.toString()).toBe("F");
    expect(position).toEqual(4);
    expect(selected).toEqual(false);

    [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[5];
    
    expect(note.toString()).toBe("F#");
    expect(position).toEqual(5);
    expect(selected).toEqual(false);

    [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[6];
    
    expect(note.toString()).toBe("G");
    expect(position).toEqual(6);
    expect(selected).toEqual(false);

    [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[7];
    
    expect(note.toString()).toBe("G#");
    expect(position).toEqual(7);
    expect(selected).toEqual(true);

    [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[8];
    
    expect(note.toString()).toBe("A");
    expect(position).toEqual(8);
    expect(selected).toEqual(false);

    [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[9];
    
    expect(note.toString()).toBe("A#");
    expect(position).toEqual(9);
    expect(selected).toEqual(false);

    [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[10];
    
    expect(note.toString()).toBe("B");
    expect(position).toEqual(10);
    expect(selected).toEqual(false);

    [note, position, selected] = getNoteWheel(Minor, Rotation0, NotOctaveExploded, new Note(Csharp, 4))[11];
    
    expect(note.toString()).toBe("C");
    expect(position).toEqual(11);
    expect(selected).toEqual(false);

  });
});