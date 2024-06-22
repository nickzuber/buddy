import { PersistedState, SupportedTheme } from "../types/core"
import { createState } from "./persisted"

const useThemeState = createState<SupportedTheme>(PersistedState.Theme)

export function useTheme() {
  const [theme, setTheme] = useThemeState(SupportedTheme.Purple)

  return {
    theme,
    setTheme,
  }
}
