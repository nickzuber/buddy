import { useEffect } from "react"
import { useNavigation } from "../hooks/useNavigation"
import { Tab } from "../types/core"
import { BottomNavigation } from "./BottomNavigation"
import { EntryTab } from "./EntryTab"
import { HistoryTab } from "./HistoryTab"
import { OverviewTab } from "./OverviewTab"
import { SettingsTab } from "./Settings"

type Theme = {
  primary: string
  primaryAlt: string
  footerBackground: string
}

enum SupportedTheme {
  Purple = "purple",
  Green = "green",
  Orange = "orange",
  Red = "Red",
}

const ThemeProvider: Record<SupportedTheme, Theme> = {
  [SupportedTheme.Purple]: {
    primary: "#a97cf0",
    primaryAlt: "#9971dc",
    footerBackground: "#352e4f",
  },
  [SupportedTheme.Green]: {
    primary: "#31C023",
    primaryAlt: "#27ac1b",
    footerBackground: "#284932",
  },
  [SupportedTheme.Orange]: {
    primary: "#F28D27",
    primaryAlt: "#DC8123",
    footerBackground: "#443022",
  },
  [SupportedTheme.Red]: {
    primary: "#F05A4B",
    primaryAlt: "#e34c3d",
    footerBackground: "#3c1c1c",
  },
} as const

function getThemeGlobalVariables(theme: SupportedTheme) {
  return {
    "--primary": ThemeProvider[theme].primary,
    "--primary-alt": ThemeProvider[theme].primaryAlt,
    "--footer-background": ThemeProvider[theme].footerBackground,
  }
}

// If we just set the overflow to always be scroll, this will give Safari
// that annoying "bouncy scroll" behavior even when there is no scrollable
// content.
const TABS_THAT_SCROLL_VERTICALLY: Array<Tab> = [Tab.History, Tab.Overview]

function App() {
  const { tab, setTab } = useNavigation()

  const selectedTheme = SupportedTheme.Purple
  const selectedThemeProvider = ThemeProvider[selectedTheme]

  useEffect(() => {
    const elem = document.querySelector("meta[name='theme-color']")
    if (!elem) return
    elem.setAttribute("content", selectedThemeProvider.primary)
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
        return <SettingsTab />
      default:
        return <div>{"not supported!"}</div>
    }
  }

  return (
    <div
      className="primary-container"
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
