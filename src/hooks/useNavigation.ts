import { PersistedState, Tab } from "../types/core"
import { createState } from "./persisted"

const useNavigationState = createState<Tab>(PersistedState.Navigation)

export function useNavigation() {
  const [tab, setTab] = useNavigationState(Tab.Entry)

  return {
    tab,
    setTab,
  }
}
