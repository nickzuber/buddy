import {
  emojiOfCategory,
  emojiOfTheme,
  formatCurrency,
  makeEntryFromDate,
  stringOfCategory,
  stringOfTheme,
  sumOfRunningMonthCategoriesMax,
} from "../helpers/core"
import { useCategories } from "../hooks/useCategories"
import {
  Category,
  Entry,
  FormattedDateTime,
  SupportedTheme,
} from "../types/core"
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
  const {
    categories,
    categoriesList,
    changeCategoryMax,
    addEntriesToCategories,
    clearCategories,
  } = useCategories()
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

      {/** Danger */}
      <div className="history-group">
        <div className="history-group-title">{"Danger"}</div>

        <div className="settings-group-grid">
          <button
            className="primary-button settings-button"
            onClick={() => {
              const confirmed = window.confirm(
                "Delete all entries you've ever tracked? There's no going back!"
              )
              if (confirmed) {
                clearCategories()
              }
            }}
          >
            {"Delete all entries"}
          </button>
        </div>
      </div>

      {/** Testing */}
      <div className="history-group">
        <div className="history-group-title">{"Testing"}</div>

        <div className="settings-group-grid">
          <button
            className="primary-button settings-button"
            onClick={() => {
              const itemsToReplay: [Category, Entry][] = [
                [Category.Fun, makeEntryFromDate(3, f("2024-05-14T21:56"))],
                [Category.Fun, makeEntryFromDate(8, f("2024-06-19T14:46"))],
                [
                  Category.Restaurants,
                  makeEntryFromDate(40, f("2024-06-19T16:29")),
                ],
                [Category.Other, makeEntryFromDate(178, f("2024-06-21T01:39"))],
                [Category.Other, makeEntryFromDate(81, f("2024-06-21T01:50"))],
                [Category.Fun, makeEntryFromDate(15, f("2024-06-21T01:51"))],
                [Category.Other, makeEntryFromDate(110, f("2024-06-21T12:22"))],
                [
                  Category.Restaurants,
                  makeEntryFromDate(16, f("2024-06-21T17:08")),
                ],
                [
                  Category.Restaurants,
                  makeEntryFromDate(6, f("2024-06-22T11:55")),
                ],
                [
                  Category.Restaurants,
                  makeEntryFromDate(18, f("2024-06-22T12:20")),
                ],
                [
                  Category.Restaurants,
                  makeEntryFromDate(8, f("2024-06-22T15:31")),
                ],
              ]

              const confirmed = window.confirm(
                `Add ${itemsToReplay.length} entries to your history?`
              )
              if (confirmed) {
                addEntriesToCategories(itemsToReplay)
              }
            }}
          >
            {"Sync entries"}
          </button>
        </div>
      </div>
    </div>
  )
}

function f(s: string) {
  return s as FormattedDateTime
}
