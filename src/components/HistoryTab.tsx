import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import {
  emojiOfCategory,
  formatCurrency,
  fromFormattedDateTime,
  stringOfCategory,
  sumOfEntries,
  sumOfRunningMonthCategoriesMax,
} from "../helpers/core"
import { useCategories } from "../hooks/useCategories"
import {
  Category,
  HydratedEntry,
  getKeyForDay,
  getKeyForMonth,
} from "../types/core"
import { Dropdown, Item } from "./Dropdown"

function toItem(category: Category | null): Item<Category | null> {
  if (!category) {
    return {
      id: uuidv4(),
      title: "Everything",
      value: null,
    }
  }

  return {
    id: uuidv4(),
    title: `${emojiOfCategory(category)} ${stringOfCategory(category)}`,
    value: category,
  }
}

const CATEGORY_ITEMS = [
  toItem(null),
  toItem(Category.Groceries),
  toItem(Category.Transport),
  toItem(Category.Clothes),
  toItem(Category.Restaurants),
  toItem(Category.Fun),
  toItem(Category.Other),
]

export function HistoryTab() {
  const { categories, removeEntryFromCategory } = useCategories()
  const [openedId, setOpenedId] = useState<string | undefined>()

  const [selectedCategory, setSelectedCategory] = useState<
    Item<Category | null>
  >(CATEGORY_ITEMS[0])

  const max = sumOfRunningMonthCategoriesMax(categories)

  const allEntries = Object.entries(categories)
    .map(([cat, rmv]) =>
      rmv.entries.map(
        (entry) =>
          ({
            ...entry,
            date: fromFormattedDateTime(entry.date),
            category: cat as Category,
            max: rmv.max,
          } as HydratedEntry)
      )
    )
    .flat()
    .sort((a, b) => {
      const aDate = fromFormattedDateTime(a.date)
      const bDate = fromFormattedDateTime(b.date)
      const diff = bDate.diff(aDate)
      return diff.valueOf()
    })

  const entriesByMonth = allEntries.reduce((map, entry) => {
    const key = getKeyForMonth(entry.date)
    if (!map[key]) {
      map[key] = []
    }
    map[key].push(entry)
    return map
  }, {} as Record<string, Array<HydratedEntry>>)

  const sortedDateKeys = Object.keys(entriesByMonth).sort(
    (a, b) => Number(b) - Number(a)
  )

  return (
    <div className="tab-container" onClick={() => setOpenedId(undefined)}>
      <div className="tab-header-container">{"History"}</div>

      <Dropdown
        selectedItem={selectedCategory}
        items={CATEGORY_ITEMS}
        onChange={(item: Item<Category | null>) => setSelectedCategory(item)}
        style={{
          width: "100%",
          boxSizing: "border-box",
        }}
      />

      {sortedDateKeys.map((key) => {
        const entries = entriesByMonth[key]
        const date = entries[0].date
        const currentMonthIndex = date.get("month")

        const sum = sumOfEntries(entries, currentMonthIndex)

        const maxFormatted = formatCurrency(max)
        const costsFormatted = formatCurrency(sum)

        const filteredEntries = entries.filter((entry) => {
          return selectedCategory.value
            ? entry.category === selectedCategory.value
            : true
        })

        const entriesByDay = filteredEntries.reduce((map, entry) => {
          const key = getKeyForDay(entry.date)
          if (!map[key]) {
            map[key] = []
          }
          map[key].push(entry)
          return map
        }, {} as Record<string, Array<HydratedEntry>>)

        const sortedDateKeysInner = Object.keys(entriesByDay).sort(
          (a, b) => Number(b) - Number(a)
        )

        if (filteredEntries.length === 0) {
          return null
        }

        return (
          <div key={key} className="history-group">
            <div className="history-group-title-container">
              <div className="history-group-title">{date.toFormat("LLLL")}</div>
              <div className="history-group-costs-large">
                <span>{`${costsFormatted}`}</span>
              </div>
            </div>
            {sortedDateKeysInner.map((key) => {
              const entries = entriesByDay[key]

              return (
                <div key={key} className="history-inner-group">
                  <div className="history-inner-group-title-outer">
                    <div className="history-inner-group-title">
                      {entries[0].date.toFormat("LLL d yyyy")}
                    </div>
                  </div>

                  {entries.map((entry) => {
                    const cost = formatCurrency(entry.cost)

                    return (
                      <div
                        key={entry.id}
                        style={{
                          opacity:
                            openedId !== undefined
                              ? openedId === entry.id
                                ? 1
                                : 0.5
                              : undefined,
                        }}
                        className="history-item"
                        onClick={(event) => {
                          event.stopPropagation()
                          if (openedId === entry.id) {
                            // TODO(zube): Probably should be temporary; remove behavior later.
                            removeEntryFromCategory(entry.category, entry.id)
                            setOpenedId(undefined)
                          } else {
                            setOpenedId(entry.id)
                          }
                        }}
                      >
                        <div className="history-category-outer">
                          <div className="history-category">
                            <span>{emojiOfCategory(entry.category)}</span>
                            <span className="history-category-name">
                              {stringOfCategory(entry.category)}
                            </span>
                          </div>
                          <div
                            className="history-category"
                            style={{ marginTop: -4 }}
                          >
                            <span style={{ opacity: 0 }}>
                              {emojiOfCategory(entry.category)}
                            </span>
                            <span className="history-category-byline">
                              {date.toFormat("h:mm a")}
                            </span>
                          </div>
                        </div>
                        <div className="history-cost">{cost}</div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
