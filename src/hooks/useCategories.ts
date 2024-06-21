import {
  Category,
  Entry,
  HistoryLedger,
  PersistedState,
  RunningMonthCategories,
} from "../types/core"
import { createState } from "./persisted"

// type NewHistory = Record<
//   Category,
//   {
//     entries: Array<Entry>
//     max: number
//   }
// >

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

  const categoriesList = Object.keys(categories).map((key) => {
    const val = categories[key as Category]
    return {
      category: key as Category,
      val,
    }
  })

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
    throw new Error("Deprecated")

    // const categoryKeys = Object.keys(categories) as Array<Category>

    // // Entry IDs to delete after processing.
    // const processedEntryIds = new Set<string>()

    // // Algorithm:
    // //
    // // go through every entry in every category
    // //  - look for any where date is not in current month
    // //    - remove from categories state
    // //  - store those in month-keyed map
    // //  - create MonthEndingValue from each map
    // //  - add / merge into HistoryLedger
    // const newMonthEndingCategories: Record<
    //   MonthYearTimestamp,
    //   Partial<NewHistory>
    // > = {}

    // const currentDate = DateTime.now()
    // const currentMonthYearTimestamp = getMonthYearTimestamp(currentDate)

    // for (const categoryKey of categoryKeys) {
    //   const maxForCategory = categories[categoryKey].max
    //   const entriesForCategory = categories[categoryKey].entries
    //   for (const entry of entriesForCategory) {
    //     const monthYearTimestamp = getMonthYearTimestampFromFormatted(
    //       entry.date
    //     )

    //     // Skip any entries that are still within this active cycle.
    //     if (currentMonthYearTimestamp === monthYearTimestamp) {
    //       continue
    //     }

    //     // These entries need to be processed.
    //     processedEntryIds.add(entry.id)
    //     if (!newMonthEndingCategories[monthYearTimestamp]) {
    //       newMonthEndingCategories[monthYearTimestamp] = {}
    //     }

    //     // Add entry to category for that month.
    //     const categoryToEntries = newMonthEndingCategories[monthYearTimestamp]
    //     const processedEntries = categoryToEntries[categoryKey]?.entries
    //     if (!processedEntries) {
    //       categoryToEntries[categoryKey] = {
    //         entries: [entry],
    //         max: maxForCategory,
    //       }
    //     } else {
    //       categoryToEntries[categoryKey] = {
    //         entries: [...processedEntries, entry],
    //         max: maxForCategory,
    //       }
    //     }
    //   }
    // }

    // // Merge into history.
    // const monthYearTimestamps = Object.keys(
    //   newMonthEndingCategories
    // ) as Array<MonthYearTimestamp>

    // // Will replace the current history instance.
    // const updatedHistoryLedger = { ...history }

    // for (const monthYearTimestamp of monthYearTimestamps) {
    //   const newHistory = newMonthEndingCategories[monthYearTimestamp]
    //   const existingHistory = updatedHistoryLedger[monthYearTimestamp]

    //   // There should never be an existing history entry for unprocessed entries.
    //   if (existingHistory) {
    //     console.error(
    //       "Somehow had a partially unprocessed category",
    //       monthYearTimestamp,
    //       JSON.stringify(existingHistory, null, 2)
    //     )
    //     continue
    //   }

    //   // Create history entry and mutate obj.
    //   const someMonthEndingCategories =
    //     newHistoryToMonthEndingCategories(newHistory)
    //   updatedHistoryLedger[monthYearTimestamp] = someMonthEndingCategories
    // }

    // const updatedCategories = removeEntriesFromCategories(
    //   categories,
    //   processedEntryIds
    // )

    // // Delete all processed history items.
    // setCategories(updatedCategories)

    // // Update the history to latest version.
    // setHistory(updatedHistoryLedger)
  }

  // function removeEntriesFromCategories(
  //   categories: RunningMonthCategories,
  //   idsToRemove: Set<string>
  // ): RunningMonthCategories {
  //   const keys = Object.keys(categories) as Array<Category>
  //   const updatedCategories = {} as Partial<RunningMonthCategories>
  //   for (const category of keys) {
  //     updatedCategories[category] = {
  //       max: categories[category].max,
  //       entries: categories[category].entries.filter(
  //         (entry) => !idsToRemove.has(entry.id)
  //       ),
  //     }
  //   }

  //   return updatedCategories as RunningMonthCategories
  // }

  function clearCategories(): void {
    setCategories(initialCategories)
  }

  function clearHistory(): void {
    setHistory(initialHistory)
  }

  return {
    // Categories
    categories,
    categoriesList,
    changeCategoryMax,
    addEntryToCategory,
    editEntryFromCategory,
    removeEntryFromCategory,
    clearEntriesFromCategory,
    clearCategories,

    // History
    history,
    completeAndRecordCateoriesForPastMonths,
    clearHistory,
  }
}

// function newHistoryToMonthEndingCategories(
//   newHistory: Partial<NewHistory>
// ): Partial<MonthEndingCategories> {
//   const mec: Partial<MonthEndingCategories> = {}

//   const categories = Object.keys(newHistory) as Array<Category>
//   for (const category of categories) {
//     const vals = newHistory[category]

//     // ts wants this, prob don't need it
//     if (!vals) {
//       continue
//     }

//     const { entries, max } = vals
//     const sum = sumOfEntries(entries)
//     const endingVal: MonthEndingValue = {
//       ending: sum,
//       max,
//     }

//     mec[category] = endingVal
//   }

//   return mec
// }
