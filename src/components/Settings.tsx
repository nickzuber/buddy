import {
  emojiOfCategory,
  emojiOfTheme,
  formatCurrency,
  stringOfCategory,
  stringOfTheme,
  sumOfRunningMonthCategoriesMax,
} from "../helpers/core"
import { useCategories } from "../hooks/useCategories"
import { SupportedTheme } from "../types/core"
import { NumberInputButton } from "./NumberInputButton"

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
  const { categories, categoriesList, changeCategoryMax } = useCategories()
  const totalBudgetSum = sumOfRunningMonthCategoriesMax(categories)

  return (
    <div className="tab-container">
      <div className="tab-header-container">{"Settings"}</div>

      {/** Defaults */}
      <div className="history-group">
        <div className="history-group-title">{"Category budgets"}</div>

        <div className="settings-group">
          {categoriesList.map(({ category, val }) => {
            return (
              <div className="settings-group-long-item">
                <span>
                  {`${emojiOfCategory(category)}`}
                  &nbsp;&nbsp;
                  {`${stringOfCategory(category)}`}
                </span>
                <NumberInputButton
                  value={val.max}
                  setValue={(newValue) => changeCategoryMax(category, newValue)}
                />
              </div>
            )
          })}
          <div className="hr" />
          <div className="settings-group-main-long-item">
            <span className="settings-item-byline">{"Total / month"}</span>
            <span>{formatCurrency(totalBudgetSum)}</span>
          </div>
        </div>
      </div>

      {/** Theme */}
      <div className="history-group">
        <div className="history-group-title">{"App theme"}</div>

        <div className="settings-group-grid">
          {AvailableThemes.map((theme) => {
            return (
              <button
                key={theme}
                disabled={theme === selectedTheme}
                className="primary-button settings-button"
                onClick={() => setTheme(theme)}
              >
                {`${emojiOfTheme(theme)} ${stringOfTheme(theme)}`}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
