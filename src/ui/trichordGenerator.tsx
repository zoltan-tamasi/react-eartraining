import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AllTriadTypes,
  Note,
  NotOctaveExploded,
  OctaveExploded,
  octaveExplodedFromString,
  Rotation0,
  Rotation1,
  Rotation2,
  rotationFromString,
  TriadCore,
} from "../core/TriadCore";
import { Action, TrichordGeneratorState } from "../state/TrichordGenerator";
import { LockComponent } from "./lock";
import { NoteWheel } from "./noteWheeel";

const useHandler = (generator: TrichordGeneratorState, setGenerator: Dispatch<SetStateAction<TrichordGeneratorState>>) =>
  (action: Action) =>
    setGenerator(TrichordGeneratorState.handleAction(generator, action));

const TrichordGeneratorComponent = () => {
  const [generator, setGenerator] = useState(
    TrichordGeneratorState.getInitial()
  );

  const handler = useHandler(generator, setGenerator);

  return (
    <div>
      <div>
        Chord is:{" "}
        {TrichordGeneratorState.getChord(generator)
          .notesOf()
          .map((note) => `${note.noteName}${note.octave}`)
          .join("\n")}
      </div>
      <div>
        Intervals is:{" "}
        {TrichordGeneratorState.getChord(generator)
          .intervals()
          .map((note) => `${note}`)
          .join(",")}
      </div>
      <div>
        Basenote {generator.baseNote.toString()}
        <input
          type="range"
          className="form-control-range"
          id="baseNoteSlider"
          min="24"
          max="60"
          list="baseNoteMarks"
          value={generator.baseNote.toInt()}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handler({
              kind: "ChangeBaseNote",
              baseNote: Note.fromInt(parseInt(event.target.value)),
            })
          }
        />
        <datalist id="baseNoteMarks">
          <option value="24" label="C 2" />
          <option value="36" label="C 3" />
          <option value="48" label="C 4" />
          <option value="60" label="C 5" />
        </datalist>
        <LockComponent lock={generator.baseNoteLock} handler={handler} />
      </div>
      <div>
        <label htmlFor="rotation-select">Rotation </label>
        <select
          name="rotations"
          id="rotation-select"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            handler({
              kind: "ChangeRotation",
              rotation: rotationFromString(event.target.value),
            })
          }
        >
          {[Rotation0, Rotation1, Rotation2].map((rotation) => (
            <option
              value={rotation}
              key={rotation.toString()}
              selected={generator.rotation === rotation}
            >
              {rotation.toString()}
            </option>
          ))}
        </select>
        <LockComponent lock={generator.rotationLock} handler={handler} />
      </div>
      <div>
        <label htmlFor="triadcore-select">Triadcore </label>
        <select
          name="triadcores"
          id="triadcore-select"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            handler({
              kind: "ChangeTriadCore",
              triadCore: TriadCore.fromLabel(event.target.value),
            })
          }
        >
          {AllTriadTypes.map((triadCore) => (
            <option
              value={triadCore.label}
              key={triadCore.label}
              selected={generator.triadCore.label === triadCore.label}
            >
              {triadCore.label}
            </option>
          ))}
        </select>
        <LockComponent lock={generator.triadCoreLock} handler={handler} />
      </div>
      <div>
        <select
          name="octave-exploded"
          id="octave-exploded-select"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            handler({
              kind: "ChangeOctaveExplode",
              octaveExplode: octaveExplodedFromString(event.target.value),
            })
          }
        >
          <option
            value={OctaveExploded}
            key={OctaveExploded.toString()}
            selected={generator.octaveExplode === OctaveExploded}
          >
            {OctaveExploded.toString()}
          </option>
          <option
            value={NotOctaveExploded}
            key={NotOctaveExploded.toString()}
            selected={generator.octaveExplode === NotOctaveExploded}
          >
            {NotOctaveExploded.toString()}
          </option>
        </select>
        <LockComponent lock={generator.octaveExplodeLock} handler={handler} />
      </div>

      <button onClick={() => handler({ kind: "Randomize" })}>Rand</button>
      <br />

      <hr />

      <NoteWheel triadCore={generator.triadCore} baseNote={generator.baseNote} octaveExplode={generator.octaveExplode} rotation={generator.rotation}  />
    </div>
  );
};

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
