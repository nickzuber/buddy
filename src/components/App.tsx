import { useEffect, useState } from "react"
import {
  fromFormattedDateTime,
  getDaysRemainingInMonth,
  makeEntry,
  stringOfCategory,
  sumOfEntries,
} from "../helpers/core"
import { useCategories } from "../hooks/useCategories"
import { Category } from "../types/core"

function App() {
  const {
    categories,
    addEntryToCategory,
    removeEntryFromCategory,
    editEntryFromCategory,
    completeAndRecordCateoriesForPastMonths,
  } = useCategories()

  useEffect(() => {
    completeAndRecordCateoriesForPastMonths()
  }, [completeAndRecordCateoriesForPastMonths])

  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >()

  if (selectedCategory) {
    const { entries } = categories[selectedCategory]
    return (
      <div>
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
        <input id="user-value" type="number" placeholder="$x" />
        <h3>{`Category: ${stringOfCategory(selectedCategory)}, $${sumOfEntries(
          entries
        )}`}</h3>
        <br />
        {entries.map((entry) => {
          const { id, cost, date } = entry

          return (
            <div key={id} style={{ margin: "12px 12px 24px" }}>
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
      <h3>{`Days left in cycle ${getDaysRemainingInMonth()}`}</h3>
      {Object.keys(categories).map((k) => {
        const name = k as Category
        const { entries, max } = categories[name]

        return (
          <div key={k} style={{ margin: "12px 12px 24px" }}>
            {`Category: ${stringOfCategory(name)}`}
            <br />
            {`Max: $${max}, Entries (total): ${entries.length}, $${sumOfEntries(
              entries
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

export default App
