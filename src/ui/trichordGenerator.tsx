import React, { Dispatch, SetStateAction, useState } from 'react';
import { Rotation0, Rotation1, Rotation2 } from '../core/TriadCore';
import { Action, TrichordGeneratorState } from '../state/TrichordGenerator';
import { LockComponent } from './lock'

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
        Rotation is: { generator.rotation.toString() }
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
      <br />
      <button onClick = { () => handler({ kind: 'ChangeRotation', rotation: Rotation0 }) } >Rotation0</button>
      <button onClick = { () => handler({ kind: 'ChangeRotation', rotation: Rotation1 }) } >Rotation1</button>
      <button onClick = { () => handler({ kind: 'ChangeRotation', rotation: Rotation2 }) } >Rotation2</button>
      <LockComponent lock={generator.triadCoreLock} handler={handler} />
    </div>
  );
}

/*const TrichordGeneratorComponent2 = () => {
  const [generator, setGenerator] = useState(
    TrichordGeneratorState.getInitial()
  );

  const handler = useHandler(generator, setGenerator)

  return (
    <div className="container">
      <form onSubmit={(event: React.FormEvent<EventTarget>) => event.preventDefault()}>
        <div className="row">
          <LockComponent lock={generator.triadCoreLock} handler={handler} />
          <div className="col-4">
            <div className="form-group form-inline">
              <label htmlFor="triadCoreSelect">Triad core</label>
              <select className="form-control" id="triadCoreSelect" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedValue = event.target.value
                actionHandler(ChangeTriadCore(TriadCore.fromString(selectedValue)))
              }>
                {
                  Constants(TriadCore.allTriadTypes: _*) map { triadCore =>
                    <option selected={trichordGeneratorState.triadCore.bind == triadCore} value={triadCore.toString}>
                      {triadCore.label}
                    </option>
                  }
                }
              </select>
            </div>
          </div>
          { Lock.toUI(TrichordGeneratorState.baseNoteLocked, actionHandler).bind }
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="baseNoteSlider">Base note: {trichordGeneratorState.baseNote.bind.toString}</label>
              <input type="range" className="form-control-range" id="baseNoteSlider" min="24" max="60"
                     list={document.getElementById("baseNoteMarks").asInstanceOf[HTMLInputElement]}
                     value={Note.toInt(trichordGeneratorState.baseNote.bind).toString}
                     onInput={baseNoteSliderHandler(actionHandler)} onchange={baseNoteSliderHandler(actionHandler)}/>
              <datalist id="baseNoteMarks">
                <option value="24" label="C 2"/>
                <option value="36" label="C 3"/>
                <option value="48" label="C 4"/>
                <option value="60" label="C 5"/>
              </datalist>
            </div>
          </div>
        </div>
        <div className="row">
          { Lock.toUI(TrichordGeneratorState.rotationLocked, actionHandler).bind }
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="baseNoteSlider">Rotation: {trichordGeneratorState.rotation.bind match {
                case Rotation0 => "1st position"
                case Rotation1 => "2nd position"
                case Rotation2 => "3rd position"
              }}</label>
              <input type="range" className="form-control-range" id="rotationSlider" min="0" max="2"
                     value={Rotation.toInt(trichordGeneratorState.rotation.bind).toString}
                     onInput={rotationSliderHandler(actionHandler)} onchange={rotationSliderHandler(actionHandler)}/>
            </div>
          </div>
          { Lock.toUI(TrichordGeneratorState.octaveExplodeLocked, actionHandler).bind }
          <div className="col-4">
            <div className="btn-group-toggle">
              {
                val classList = if (trichordGeneratorState.octaveExplode.bind == OctaveExploded) "btn btn-success" else "btn btn-outline-secondary"
                <label className={classList}>
                  <input type="checkbox" checked={trichordGeneratorState.octaveExplode.bind == OctaveExploded}
                         onChange={(event: Event) =>
                           actionHandler(
                             ChangeOctaveExploded(OctaveExplode.fromBoolean(event.target.asInstanceOf[HTMLInputElement].checked))
                           )}/>
                  Middle note octave up
                </label>
              }
            </div>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-primary" onClick={(_: Event) => actionHandler(Invert)}>
            Invert
          </button>
          <button className="btn btn-primary" onClick={(_: Event) => actionHandler(Randomize) }>
            Randomize
          </button>
        </div>

        <hr/>

        { NoteWheel.toUI(TrichordGeneratorState.triadCore, TrichordGeneratorState.rotation, TrichordGeneratorState.octaveExplode,
                         TrichordGeneratorState.baseNote, TrichordGeneratorState.audioEngineReady, actionHandler).bind }

        <hr/>

      </form>
    </div>
  )
}*/

export default TrichordGeneratorComponent;
