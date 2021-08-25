import React, { Dispatch, SetStateAction, useState } from 'react';
import { Chord, Major2PlusMinor2, Major7With3, Note, NotOctaveExploded, OctaveExploded, Rotation0, Rotation1, C, D, NoteName } from '../core/TriadCore'
import { Action, TrichordGeneratorState } from '../state/TrichordGenerator'

const useHandler = (generator: TrichordGeneratorState, setGenerator: Dispatch<SetStateAction<TrichordGeneratorState>>) =>
    (action: Action) => setGenerator(TrichordGeneratorState.handleAction(generator, action))

const TrichordGeneratorComponent = () => {
    const [generator, setGenerator] = useState(
        TrichordGeneratorState.getInitial()
    );

    const handler = useHandler(generator, setGenerator)
     
  return (
      <div>
          <div>
              Chord is: { TrichordGeneratorState.getChord(generator).notesOf().map((note) => `${note.noteName}${note.octave}`).join('\n') }
          </div>
          <div>
              Intervals is: { TrichordGeneratorState.getChord(generator).intervals().map((note) => `${note}`).join(',') }
          </div>
          <div>
              Basenote is: { generator.baseNote.toString() }
          </div>
          <div>
              Triadcore is: { generator.triadCore.label }
          </div>
          <div>
              TriadCoreLock is: { generator.triadCoreLock.locked ? 'locked' : 'open' }
          </div>
          <div>
              RotationLock is: { generator.rotationLock.locked ? 'locked' : 'open' }
          </div>
          <div>
              BaseNoteLock is: { generator.baseNoteLock.locked ? 'locked' : 'open' }
          </div>
          <div>
              OctaveExplodeLock is: { generator.octaveExplodeLock.locked ? 'locked' : 'open' }
          </div>

          <button onClick = { () => handler({ kind: 'Randomize' }) } >Rand</button>
          <button onClick = { () => handler({ kind: 'SwitchLock', lockKind: 'TriadCoreLock' }) } >TriadCoreLock</button>
          <button onClick = { () => handler({ kind: 'SwitchLock', lockKind: 'RotationLock' }) } >RotationLock</button>
          <button onClick = { () => handler({ kind: 'SwitchLock', lockKind: 'BaseNoteLock' }) } >BaseNoteLock</button>
          <button onClick = { () => handler({ kind: 'SwitchLock', lockKind: 'OctaveExplodeLock' }) } >OctaveExplodeLock</button>

      </div>
  );
}

export default TrichordGeneratorComponent;
