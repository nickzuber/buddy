import { PersistedState, Tab } from "../types/core"
import { createState } from "./persisted"

const useNavigationState = createState<Tab>(PersistedState.Navigation)

export function useNavigation() {
  const [tab, setTab] = useNavigationState(Tab.Entry)

  function setTabAndResetScroll(tab: Tab): void {
    setTab(tab)
    document.querySelector(".primary-container")?.scrollTo(0, 0)
  }

  return {
    tab,
    setTab: setTabAndResetScroll,
  }
}
