import { DateTime } from "luxon"
import {
  Category,
  DEFAULT_MAX_RUNNING_MONETH_VALUE,
  Entry,
  FormattedDateTime,
  MonthYearTimestamp,
  RunningMonthCategories,
} from "../types/core"

export function stringOfCategory(category: Category): string {
  switch (category) {
    case Category.Groceries:
      return "Groceries"
    case Category.Transport:
      return "Transport"
    case Category.Clothes:
      return "Clothes"
    case Category.Restaurants:
      return "Restaurants"
    case Category.Fun:
      return "Fun"
    case Category.Other:
      return "Other"
  }
}

export function getMonthYearTimestamp(dateTime: DateTime): MonthYearTimestamp {
  return `${dateTime.year}-${dateTime.month}` as MonthYearTimestamp
}

export function getMonthYearTimestampFromFormatted(
  formattedDateTime: FormattedDateTime
): MonthYearTimestamp {
  const dateTime = fromFormattedDateTime(formattedDateTime)
  return `${dateTime.year}-${dateTime.month}` as MonthYearTimestamp
}

/**
 * Mutates(?) but also returns mutated instance
 */
export function addToRunningMonthValue(args: {
  entry: Entry
  category: Category
  runningMonthCategories: RunningMonthCategories
}): RunningMonthCategories {
  const { entry, category, runningMonthCategories } = args
  let rmv = runningMonthCategories[category]

  // edge case: dont think this should happen in theory
  if (!rmv) {
    rmv = {
      entries: [entry],
      max: DEFAULT_MAX_RUNNING_MONETH_VALUE,
    }
  }

  rmv.entries.push(entry)
  runningMonthCategories[category] = rmv
  return runningMonthCategories
}

export function sumOfEntries(entries: Array<Entry>): number {
  return entries.reduce((sum, entry) => sum + entry.cost, 0)
}

export function makeEntry(cost: number, memo?: string): Entry {
  return {
    id: crypto.randomUUID(),
    date: toFormattedDateTime(DateTime.now()),
    // date: toFormattedDateTime(DateTime.now().minus(1000 * 60 * 60 * 24 * 80)),
    cost,
    memo,
  }
}

export function getDaysRemainingInMonth() {
  const now = new Date()
  const totalDaysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate()
  const currentDay = now.getDate()

  return totalDaysInMonth - currentDay + 1 // +1 so we treat current day as active
}

export function toFormattedDateTime(dateTime: DateTime): FormattedDateTime {
  return dateTime.toISO() as FormattedDateTime
}

export function fromFormattedDateTime(
  formattedDateTime: FormattedDateTime
): DateTime {
  return DateTime.fromISO(formattedDateTime)
}
