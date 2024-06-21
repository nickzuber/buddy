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

export function OverviewTab() {
  const { categories } = useCategories()

  // Subtract 1 because this is selecting the month from the array, which is 0-indexed.
  // Note that DateTime#get#month is NOT 0-indexed (e.g. January == 1)
  const startingMonthIndex = DateTime.now().get("month") - 1
  const [selectedMonth, setSelectedMonth] = useState<Item<Month>>(
    MONTH_ITEMS[startingMonthIndex]
  )

  // This works because Month enum evaluates to the proper month index for Luxon.
  const selectedMonthIndex = selectedMonth.value as number

  // This is for the overall spending trend.
  const expenses = sumOfRunningMonthCategories(categories, selectedMonthIndex)
  const monthlyExpenses = sumOfRunningMonthCategories(
    categories,
    selectedMonthIndex
  )
  const monthlyMax = sumOfRunningMonthCategoriesMax(categories)
  const monthlyRemainingBudget = monthlyMax - monthlyExpenses

  const maxOfCategories = Object.entries(categories)
    .map(([cat, val]) => {
      const category = cat as Category
      const max = val.max
      return { category, max }
    })
    .reduce((map, { category, max }) => {
      map[category] = max
      return map
    }, {} as Record<Category, number>)

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

  // This might not have any entries if there were none, so fallback to empty.
  const selectedMonthEntries = entriesByMonth[selectedMonthIndex] ?? []

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
      <div className="big-text-primary overview-header">
        {formatCurrency(expenses)}
      </div>
      <div className="big-text-primaryx overview-header-byline">
        {monthlyRemainingBudget > 0
          ? `Under budget by ${formatCurrency(monthlyRemainingBudget)}`
          : `Over budget by ${formatCurrency(
              Math.abs(monthlyRemainingBudget)
            )}`}
      </div>
      <Dropdown
        selectedItem={selectedMonth}
        items={MONTH_ITEMS}
        onChange={(item: Item<Month>) => setSelectedMonth(item)}
      />

      <div className="overview-items-container">
        {selectedEntryCategoryKeysSortedByUsage.map((category) => {
          const entries = selectedEntriesByCategory[category]
          const max = maxOfCategories[category]
          const expenses = sumOfEntries(entries)

          const remaining = max - expenses

          // Defines the width of the container.
          const expensesRatio = expenses / max
          const expensesRatioNormalized = Math.max(
            0,
            Math.min(expensesRatio, 1)
          )
          const formattedExpensesRatio = (expensesRatio * 100).toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }
          )
          const nodeId = `uid-${category}`

          return (
            <div key={category} className="overview-item">
              <div
                id={nodeId}
                className="overview-item-fill"
                ref={() => {
                  const elem = document.querySelector(
                    `#${nodeId}`
                  ) as HTMLDivElement | null
                  if (!elem) return
                  setTimeout(
                    () =>
                      (elem.style.width = `${expensesRatioNormalized * 100}%`),
                    1
                  )
                }}
              />
              <div className="overview-item-inner">
                <span className="overview-item-category">
                  <span style={{ fontSize: 26 }}>
                    {emojiOfCategory(category)}
                  </span>
                  <span>{stringOfCategory(category)}</span>
                </span>
                <span>{formatCurrency(expenses)}</span>
              </div>
              <div className="overview-item-byline-inner overview-item-byline-category">
                <span className="overview-item-category">
                  <span style={{ opacity: 0, fontSize: 26, lineHeight: 0 }}>
                    {emojiOfCategory(category)}
                  </span>
                  <span>{`${formatCurrency(remaining)} of ${formatCurrency(
                    max
                  )}`}</span>
                </span>
                <span>{`${formattedExpensesRatio}%`}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
