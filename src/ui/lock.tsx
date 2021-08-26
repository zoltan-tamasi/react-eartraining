import { Action, Lock } from '../state/TrichordGenerator'

export const LockComponent = function<T>(props: { lock: Lock<T>, handler: (action: Action) => void }) {
  return (
    <span onClick={ () => props.handler({ kind: 'SwitchLock', lockKind: props.lock.lockKind }) }>
      { props.lock.locked ? <img src="img/locked.png"></img> : <img src="img/unlocked.png"></img> }
    </span>
  )
}
