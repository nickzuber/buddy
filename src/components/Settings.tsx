import { useRef, useState } from "react"
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
  SupportedTheme.Blue,
  SupportedTheme.Black,
]

interface SettingsTabProps {
  selectedTheme: SupportedTheme
  setTheme: (theme: SupportedTheme) => void
}

export function SettingsTab({ selectedTheme, setTheme }: SettingsTabProps) {
  const { categories, categoriesList, changeCategoryMax, clearCategories } =
    useCategories()
  const totalBudgetSum = sumOfRunningMonthCategoriesMax(categories)
  const [showHiddenCategories, setShowHiddenCategories] = useState(false)

  const counterRef = useRef(0)
  const timerRef = useRef<any>()

  return (
    <div className="tab-container">
      <div
        className="tab-header-container"
        onClick={() => {
          if (counterRef.current++ >= 4) {
            setShowHiddenCategories(true)
          }
          clearTimeout(timerRef.current)
          timerRef.current = setTimeout(() => {
            counterRef.current = 0
          }, 1000)
        }}
      >
        {"Settings"}
      </div>

      {/** Testing */}
      {showHiddenCategories ? (
        <div className="history-group pop-press">
          <div className="history-group-title">{"Testing"}</div>

          <div className="settings-group">
            <div className="settings-group-long-item">
              <span>{"All data"}</span>
              <button
                className="primary-button settings-button fit-content"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Delete all entries you've ever tracked? There's no going back!"
                  )
                  if (confirmed) {
                    clearCategories()
                  }
                }}
              >
                {"Reset"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

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

      {/** Testing

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
                [
                  Category.Groceries,
                  makeEntryFromDate(63, f("2024-06-22T16:54")),
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
      */}
    </div>
  )
}

// function f(s: string) {
//   return s as FormattedDateTime
// }
