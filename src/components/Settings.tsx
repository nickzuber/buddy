import { stringOfTheme } from "../helpers/core"
import { useCategories } from "../hooks/useCategories"
import { SupportedTheme } from "../types/core"

const AvailableThemes: Array<SupportedTheme> = [
  SupportedTheme.Purple,
  SupportedTheme.Green,
  SupportedTheme.Orange,
  SupportedTheme.Red,
]

interface SettingsTabProps {
  selectedTheme: SupportedTheme
  setTheme: (theme: SupportedTheme) => void
}

export function SettingsTab({ selectedTheme, setTheme }: SettingsTabProps) {
  const { categories } = useCategories()

  return (
    <div className="tab-container">
      <div className="tab-header-container">{"Settings"}</div>

      <div className="history-group">
        <div className="history-group-title">{"App theme"}</div>

        <div className="settings-group">
          {AvailableThemes.map((theme) => {
            return (
              <button
                key={theme}
                disabled={theme === selectedTheme}
                className="primary-button settings-button"
                onClick={() => setTheme(theme)}
              >
                {stringOfTheme(theme)}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
