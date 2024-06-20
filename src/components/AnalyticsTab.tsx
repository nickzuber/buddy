import { DateTime } from "luxon"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import {
  emojiOfCategory,
  formatCurrency,
  fromFormattedDateTime,
  stringOfCategory,
  stringOfMonth,
  sumOfEntries,
  sumOfRunningMonthCategories,
  sumOfRunningMonthCategoriesMax,
} from "../helpers/core"
import { useCategories } from "../hooks/useCategories"
import { Category, HydratedEntry, Month, getKeyForMonth } from "../types/core"
import { Dropdown, Item } from "./Dropdown"

function toItem(month: Month): Item<Month> {
  return {
    id: uuidv4(),
    title: stringOfMonth(month),
    value: month,
  }
}

const MONTH_ITEMS = [
  toItem(Month.Jan),
  toItem(Month.Feb),
  toItem(Month.Mar),
  toItem(Month.Apr),
  toItem(Month.May),
  toItem(Month.Jun),
  toItem(Month.Jul),
  toItem(Month.Aug),
  toItem(Month.Sept),
  toItem(Month.Oct),
  toItem(Month.Nov),
  toItem(Month.Dev),
]

function createInitialCategoryGroupings(): Record<
  Category,
  Array<HydratedEntry>
> {
  return {
    [Category.Groceries]: [],
    [Category.Transport]: [],
    [Category.Clothes]: [],
    [Category.Restaurants]: [],
    [Category.Fun]: [],
    [Category.Other]: [],
  }
}

export function AnalyticsTab() {
  const { categories } = useCategories()
  const expenses = formatCurrency(sumOfRunningMonthCategories(categories))

  const currentMonthId = DateTime.now().get("month") - 1 // 0-indexed
  const [selectedMonth, setSelectedMonth] = useState<Item<Month>>(
    MONTH_ITEMS[currentMonthId]
  )

  // (?) Might need this for overall budget overspending?
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

  const selectedMonthEntries = entriesByMonth[currentMonthId]

  const selectedEntriesByCategory = selectedMonthEntries.reduce(
    (map, entry) => {
      const category = entry.category
      map[category].push(entry)
      return map
    },
    createInitialCategoryGroupings()
  )

  const selectedEntryCategoryKeysSortedByUsage = Object.keys(
    selectedEntriesByCategory
  ).sort((aKey, bKey) => {
    const a = selectedEntriesByCategory[aKey as Category]
    const b = selectedEntriesByCategory[bKey as Category]

    const aCost = sumOfEntries(a)
    const bCost = sumOfEntries(b)
    return bCost - aCost
  }) as Array<Category>

  return (
    <div className="tab-container">
      <div className="tab-header-container">{"Analytics"}</div>
      <div className="big-text-primary analytics-header">{expenses}</div>
      <Dropdown selectedItem={selectedMonth} items={MONTH_ITEMS} />

      <div className="analytics-items-container">
        {selectedEntryCategoryKeysSortedByUsage.map((category) => {
          const entries = selectedEntriesByCategory[category]
          const max = entries[0]?.max ?? 1
          const expenses = sumOfEntries(entries)

          // Defines the width of the container.
          const expensesRatio = Math.max(0, Math.min(expenses / max, 1))
          const nodeId = `uid-${category}`

          return (
            <div key={category} className="analytics-item">
              <div
                id={nodeId}
                className="analytics-item-fill"
                ref={() => {
                  const elem = document.querySelector(
                    `#${nodeId}`
                  ) as HTMLDivElement | null
                  if (!elem) return
                  setTimeout(
                    () => (elem.style.width = `${expensesRatio * 100}%`),
                    1
                  )
                }}
              />
              <div className="analytics-item-inner">
                <span className="analytics-item-category">
                  <span style={{ fontSize: 26 }}>
                    {emojiOfCategory(category)}
                  </span>
                  <span>{stringOfCategory(category)}</span>
                </span>
                <span>{formatCurrency(expenses)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
