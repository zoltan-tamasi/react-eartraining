import { Note, OctaveExplode, Rotation, TriadCore } from "../core/TriadCore"
import { getImageAndRotation, getNoteWheel } from "../state/Notewheel";

export const NoteWheel = function<T>(props: { 
  triadCore: TriadCore, 
  rotation: Rotation, 
  octaveExplode: OctaveExplode,
  baseNote: Note
}) {
  const [image, rotation] = getImageAndRotation(props.triadCore, props.rotation);
  return (
    <div id="note-wheel">

      {getNoteWheel(props.triadCore, props.rotation, props.octaveExplode, props.baseNote).map(([noteName, position, selected]) => (
        <span className={`note-label pos-${position} ${selected ? "selected" : ""}`} >
          {noteName.toString()}
        </span>
      ))}

      <img src={image} className={rotation}></img>
    </div>
  )
}
