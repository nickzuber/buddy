import { useEffect } from "react"
import { getThemeGlobalVariables } from "../helpers/core"
import { useNavigation } from "../hooks/useNavigation"
import { useTheme } from "../hooks/useTheme"
import { Tab, ThemeProvider } from "../types/core"
import { BottomNavigation } from "./BottomNavigation"
import { EntryTab } from "./EntryTab"
import { HistoryTab } from "./HistoryTab"
import { OverviewTab } from "./OverviewTab"
import { SettingsTab } from "./Settings"

// If we just set the overflow to always be scroll, this will give Safari
// that annoying "bouncy scroll" behavior even when there is no scrollable
// content.
const TABS_THAT_SCROLL_VERTICALLY: Array<Tab> = [
  Tab.History,
  Tab.Overview,
  Tab.Settings,
]

function App() {
  const { tab, setTab } = useNavigation()

  const { theme: selectedTheme, setTheme } = useTheme()
  const selectedThemeProvider = ThemeProvider[selectedTheme]

  useEffect(() => {
    const elem = document.querySelector("meta[name='theme-color']")
    if (!elem) return
    elem.setAttribute("content", selectedThemeProvider.primary)

    const bodyElem = document.querySelector("body")
    if (!bodyElem) return
    bodyElem.style.background = selectedThemeProvider.primary
  }, [selectedThemeProvider])

  function renderContent() {
    switch (tab) {
      case Tab.Entry:
        return <EntryTab />
      case Tab.Overview:
        return <OverviewTab />
      case Tab.History:
        return <HistoryTab />
      case Tab.Settings:
        return <SettingsTab selectedTheme={selectedTheme} setTheme={setTheme} />
      default:
        return <div>{"not supported!"}</div>
    }
  }

  return (
    <div
      className="primary-container bounding-styles"
      style={{
        ...getThemeGlobalVariables(selectedTheme),
        overflowY: TABS_THAT_SCROLL_VERTICALLY.includes(tab)
          ? "auto"
          : undefined,
      }}
    >
      {renderContent()}
      <BottomNavigation activeTab={tab} setTab={setTab} />
    </div>
  )
}

export default App
