import {
  Rotation2
} from '../core/TriadCore';

import { TrichordGeneratorState } from './TrichordGenerator'

  test('TrichordGeneratorState test', () => {

    let generator = TrichordGeneratorState.getInitial();

    generator = TrichordGeneratorState.handleAction(generator, {
      kind: 'ChangeRotation',
      rotation: Rotation2
    });

    expect(generator.rotation).toBe(Rotation2);

    const baseNote = generator.baseNote;
    const octaveExplode = generator.octaveExplode;
    const rotation = generator.rotation;
    const triadCore = generator.triadCore;

    generator = TrichordGeneratorState.handleAction(generator, {
      kind: 'SwitchLock',
      lockKind: 'BaseNoteLock'
    });
    generator = TrichordGeneratorState.handleAction(generator, {
      kind: 'SwitchLock',
      lockKind: 'TriadCoreLock'
    })
    generator = TrichordGeneratorState.handleAction(generator, {
      kind: 'SwitchLock',
      lockKind: 'RotationLock'
    })
    generator = TrichordGeneratorState.handleAction(generator, {
      kind: 'SwitchLock',
      lockKind: 'OctaveExplodeLock'
    })

    generator = TrichordGeneratorState.handleAction(generator, {
      kind: 'Randomize'
    })
    expect(generator.triadCoreLock.locked).toBe(true);
    expect(generator.triadCore).toBe(triadCore);
    expect(generator.octaveExplode).toBe(octaveExplode);
    expect(generator.rotation).toBe(rotation);
    expect(generator.baseNote).toBe(baseNote);

  });
