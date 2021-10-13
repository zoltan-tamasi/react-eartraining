import {
  A, Asharp, B, C, Csharp, D, Dsharp, E, F, Fsharp, G, Gsharp,
  Note,
  NotOctaveExploded,
  OctaveExplode,
  Rotation,
  Rotation0,
  Rotation1,
  Rotation2,
  TriadCore,
  OctaveExploded,
  Phrygian,
  AllTriadTypes,
  Chord
} from "../core/TriadCore";
import { Opaque } from "../core/Opaque";

export type Lock<T> = Opaque<T, { locked: boolean, lockKind: LockKind }>;
export type TriadCoreLock = Lock<'TriadCoreLock'>
export type RotationLock = Lock<'RotationLock'>
export type BaseNoteLock = Lock<'BaseNoteLock'>
export type OctaveExplodeLock = Lock<'OctaveExplodeLock'>

export type Action = Randomize | ChangeRotation | SwitchLock | ChangeBaseNote | ChangeTriadCore
export type LockKind = 'TriadCoreLock' | 'RotationLock' | 'BaseNoteLock' | 'OctaveExplodeLock'

export interface Randomize {
  kind: 'Randomize'
}

export interface ChangeRotation {
  kind: 'ChangeRotation'
  rotation: Rotation
}

export interface ChangeBaseNote {
  kind: 'ChangeBaseNote'
  baseNote: Note
}

export interface ChangeTriadCore {
  kind: 'ChangeTriadCore',
  triadCore: TriadCore
}

export interface SwitchLock {
  kind: 'SwitchLock'
  lockKind: LockKind
}


export interface Effect {}
export const NoEffect = {} as Effect

export const switchLock = <T>(lock: Lock<T>): Lock<T> => ({
  locked: !lock.locked,
  lockKind: lock.lockKind
}) as Lock<T>

export const pullRandom = <T>(list: Array<T>): T => list[Math.round(Math.random() * (list.length - 1))]

export function assertExhaustive(
  value: never,
  message: string = 'Reached unexpected case in exhaustive switch'
): never {
  throw new Error(message);
}

export class TrichordGeneratorState {
  constructor(
    readonly rotation: Rotation,
    readonly octaveExplode: OctaveExplode,
    readonly triadCore: TriadCore,
    readonly baseNote: Note,
    readonly triadCoreLock: TriadCoreLock,
    readonly baseNoteLock: BaseNoteLock,
    readonly rotationLock: RotationLock,
    readonly octaveExplodeLock: OctaveExplodeLock,
    readonly audioEngineReady: Boolean
  ) {}

  static getInitial() {
    return new TrichordGeneratorState(
      Rotation0,
      OctaveExploded,
      Phrygian,
      new Note(C, 3),
      { locked: false, lockKind: 'TriadCoreLock' } as TriadCoreLock,
      { locked: false, lockKind: 'BaseNoteLock' } as BaseNoteLock,
      { locked: false, lockKind: 'RotationLock' } as RotationLock,
      { locked: false, lockKind: 'OctaveExplodeLock' } as OctaveExplodeLock,
      false
    )
  }

  static getChord(state: TrichordGeneratorState): Chord {
    return new Chord(state.rotation, state.triadCore, state.baseNote, state.octaveExplode);
  }

  static handleAction (state: TrichordGeneratorState, action: Action): TrichordGeneratorState {
    switch (action.kind) {
      case 'Randomize':
        const newRotation = !state.rotationLock.locked ? pullRandom([Rotation0, Rotation1, Rotation2]) : state.rotation;
        const newOctaveExplode = !state.octaveExplodeLock.locked ? pullRandom([OctaveExploded, NotOctaveExploded]) : state.octaveExplode;
        const newTriadCore = !state.triadCoreLock.locked ? pullRandom(AllTriadTypes) : state.triadCore;
        const newBaseNote = !state.baseNoteLock.locked ? new Note(
          pullRandom([C, Csharp, D, Dsharp, E, F, Fsharp, G, Gsharp, A, Asharp, B]),
          pullRandom([2, 3, 4])
        ) : state.baseNote;
        return Object.assign({}, state, { rotation: newRotation, octaveExplode: newOctaveExplode, triadCore: newTriadCore, baseNote: newBaseNote });
      case 'ChangeRotation':
        return Object.assign({}, state, { rotation: action.rotation });
      case 'SwitchLock':
        switch (action.lockKind) {
          case 'TriadCoreLock':
            return Object.assign({}, state, { triadCoreLock: switchLock(state.triadCoreLock) });
          case 'RotationLock':
            return Object.assign({}, state, { rotationLock: switchLock(state.rotationLock) });
          case 'OctaveExplodeLock':
            return Object.assign({}, state, { octaveExplodeLock: switchLock(state.octaveExplodeLock) });
          case 'BaseNoteLock':
            return Object.assign({}, state, { baseNoteLock: switchLock(state.baseNoteLock) });
          default:
            assertExhaustive(action.lockKind)
        }
      case 'ChangeBaseNote':
        return Object.assign({}, state, { baseNote: action.baseNote });
      case 'ChangeTriadCore':
        return Object.assign({}, state, { triadCore: action.triadCore });
        break;
      default:
        assertExhaustive(action)
    }
  }
}

