import { DateTime } from "luxon"
import { useState } from "react"
import {
  areAllEntriesWithinCurrentCycle,
  fromFormattedDateTime,
  getDaysRemainingInMonth,
  isEntryWithinCurrentCycle,
  makeEntry,
  stringOfCategory,
  sumOfEntries,
} from "../helpers/core"
import { useCategories } from "../hooks/useCategories"
import { Category } from "../types/core"

export function DebugSkeleton() {
  const currentMonthIndex = DateTime.now().get("month")
  const {
    categories,
    addEntryToCategory,
    removeEntryFromCategory,
    editEntryFromCategory,
    completeAndRecordCateoriesForPastMonths,
    history,
    clearHistory,
  } = useCategories()

  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >()

  if (selectedCategory) {
    const { entries } = categories[selectedCategory]
    return (
      <div>
        <button onClick={completeAndRecordCateoriesForPastMonths}>
          {"sync"}
        </button>
        <br />
        <button onClick={clearHistory}>{"clear history"}</button>
        <br />
        <br />

        <button
          onClick={() => {
            setSelectedCategory(undefined)
          }}
        >
          {"go back"}
        </button>
        <button
          onClick={() => {
            const userInputElem = document.querySelector(
              "#user-value"
            ) as HTMLInputElement | null
            const value = userInputElem ? Number(userInputElem.value ?? 0) : 0
            const entry = makeEntry(value)
            addEntryToCategory(selectedCategory, entry)

            if (userInputElem) {
              userInputElem.value = ""
            }
          }}
        >
          {"add"}
        </button>
        <input id="user-value" type="number" placeholder="$0" />
        <h3>{`Category: ${stringOfCategory(selectedCategory)}, $${sumOfEntries(
          entries,
          currentMonthIndex
        )}`}</h3>
        <br />
        {entries.map((entry) => {
          const { id, cost, date } = entry
          const doesEntryNeedToBeProcessed = !isEntryWithinCurrentCycle(entry)

          return (
            <div
              key={id}
              style={{
                margin: "12px 12px 24px",
                background: doesEntryNeedToBeProcessed
                  ? "rgba(255, 0, 0, .2)"
                  : undefined,
              }}
            >
              {`${id}, $${cost}`}
              <br />
              <span
                style={{ fontSize: "80%", marginBottom: -12, display: "block" }}
              >{`${
                date
                  ? fromFormattedDateTime(date).toFormat(
                      "LLLL d yyyy, cccc 'at' h:mma"
                    )
                  : "n/a"
              }`}</span>
              <br />
              <button
                onClick={() => removeEntryFromCategory(selectedCategory, id)}
              >
                {"remove"}
              </button>
              <button
                onClick={() => editEntryFromCategory(selectedCategory, id, 20)}
              >
                {"edit ($20)"}
              </button>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <button onClick={completeAndRecordCateoriesForPastMonths}>
        {"sync"}
      </button>
      <br />
      <button onClick={clearHistory}>{"clear history"}</button>
      <br />

      <h3>{`Days left in cycle ${getDaysRemainingInMonth()}`}</h3>
      {Object.keys(categories).map((k) => {
        const name = k as Category
        const { entries, max } = categories[name]
        const hasEntriesThatNeedToBeProcessed =
          !areAllEntriesWithinCurrentCycle(entries)

        return (
          <div key={k} style={{ margin: "12px 12px 24px" }}>
            {`Category: ${stringOfCategory(name)}`}
            {hasEntriesThatNeedToBeProcessed ? (
              <span style={{ color: "red", fontWeight: "600" }}>{"*"}</span>
            ) : undefined}
            <br />
            {`Max: $${max}, Entries (total): ${entries.length}; $${sumOfEntries(
              entries,
              currentMonthIndex
            )}`}
            <br />
            <button
              onClick={() => {
                setSelectedCategory(name)
              }}
            >
              {"select"}
            </button>
          </div>
        )
      })}
    </div>
  )
}
