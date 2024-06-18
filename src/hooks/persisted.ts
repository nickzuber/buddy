import createPersistedState from "../libs/use-persisted-state"
import { PersistedState } from "../types/core"

export type PersistedStateT<T> = [T, React.Dispatch<T>]

export function createState<T>(
  name: PersistedState
): (args: T) => PersistedStateT<T> {
  return createPersistedState(name)
}
