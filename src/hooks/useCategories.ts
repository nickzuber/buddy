import { DateTime } from "luxon"
import {
  getMonthYearTimestamp,
  getMonthYearTimestampFromFormatted,
} from "../helpers/core"
import {
  Category,
  Entry,
  HistoryLedger,
  MonthYearTimestamp,
  PersistedState,
  RunningMonthCategories,
} from "../types/core"
import { createState } from "./persisted"

const useCategoriesState = createState<RunningMonthCategories>(
  PersistedState.RunningMonthCategories
)

const useHistoryState = createState<HistoryLedger>(PersistedState.HistoryLedger)

const initialCategories: RunningMonthCategories = {
  [Category.Groceries]: {
    entries: [],
    max: 400,
  },
  [Category.Transport]: {
    entries: [],
    max: 100,
  },
  [Category.Clothes]: {
    entries: [],
    max: 150,
  },
  [Category.Restaurants]: {
    entries: [],
    max: 400,
  },
  [Category.Fun]: {
    entries: [],
    max: 400,
  },
  [Category.Other]: {
    entries: [],
    max: 300,
  },
}

const initialHistory: HistoryLedger = {}

export function useCategories() {
  const [categories, setCategories] = useCategoriesState(initialCategories)
  const [history, setHistory] = useHistoryState(initialHistory)

  function changeCategoryMax(category: Category, newMax: number): void {
    setCategories({
      ...categories,
      [category]: {
        ...categories[category],
        max: newMax,
      },
    })
  }

  function addEntryToCategory(category: Category, entry: Entry): void {
    setCategories({
      ...categories,
      [category]: {
        ...categories[category],
        entries: [entry, ...categories[category].entries],
      },
    })
  }

  function editEntryFromCategory(
    category: Category,
    id: string,
    cost: number,
    memo?: string
  ) {
    setCategories({
      ...categories,
      [category]: {
        ...categories[category],
        entries: categories[category].entries.map((entry) => {
          if (entry.id !== id) {
            return entry
          }

          return {
            ...entry,
            cost,
            memo,
          }
        }),
      },
    })
  }

  function removeEntryFromCategory(category: Category, id: string) {
    setCategories({
      ...categories,
      [category]: {
        ...categories[category],
        entries: categories[category].entries.filter(
          (entry) => entry.id !== id
        ),
      },
    })
  }

  function clearEntriesFromCategory(category: Category) {
    setCategories({
      ...categories,
      [category]: {
        ...categories[category],
        entries: [],
      },
    })
  }

  function completeAndRecordCateoriesForPastMonths() {
    const categoryKeys = Object.keys(categories) as Array<Category>

    // Entry IDs to delete after processing.
    const processedEntryIds = new Set<string>()

    // MonthYearTimestamp -> Category -> Entry[]
    // MonthYearTimestamp -> Category -> MonthEndingValue

    const newMonthEndingCategories: Record<
      MonthYearTimestamp,
      Partial<Record<Category, Array<Entry>>>
    > = {}

    const currentDate = DateTime.now()
    const currentMonthYearTimestamp = getMonthYearTimestamp(currentDate)

    for (const categoryKey of categoryKeys) {
      const entriesForCategory = categories[categoryKey].entries
      for (const entry of entriesForCategory) {
        const monthYearTimestamp = getMonthYearTimestampFromFormatted(
          entry.date
        )

        // Skip any entries that are still within this active cycle.
        if (currentMonthYearTimestamp === monthYearTimestamp) {
          continue
        }

        // These entries need to be processed.
        processedEntryIds.add(entry.id)
        if (!newMonthEndingCategories[monthYearTimestamp]) {
          newMonthEndingCategories[monthYearTimestamp] = {}
        }

        // Add entry to category for that month.
        const categoryToEntries = newMonthEndingCategories[monthYearTimestamp]
        const processedEntries = categoryToEntries[categoryKey]
        if (!processedEntries) {
          categoryToEntries[categoryKey] = [entry]
        } else {
          categoryToEntries[categoryKey] = [...processedEntries, entry]
        }
      }
    }

    console.info(newMonthEndingCategories)

    // For each category, find all entries that are not in this month
    //

    // go through every entry in every category
    //  - look for any where date is not in current month
    //    - remove from categories state
    //  - store those in month-keyed map
    //  - create MonthEndingValue from each map
    //  - add / merge into HistoryLedger
    //
    //
    //
    // OLD
    // // record to history ledger
    // const historyTimestamp = makeMonthYearTimestamp()
    // // reset entries
    // const categoryKeys = Object.keys(categories)
    // setCategories(
    //   categoryKeys.reduce((map, key) => {
    //     const categoryKey = key as Category
    //     const category = categories[categoryKey]
    //     return {
    //       ...map,
    //       [categoryKey]: {
    //         ...category,
    //         entries: [],
    //       },
    //     }
    //   }, categories)
    // )
  }

  return {
    // Categories
    categories,
    changeCategoryMax,
    addEntryToCategory,
    editEntryFromCategory,
    removeEntryFromCategory,
    clearEntriesFromCategory,

    // History
    history,
    completeAndRecordCateoriesForPastMonths,
  }
}
