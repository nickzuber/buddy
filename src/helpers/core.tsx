import { DateTime } from "luxon"
import { v4 as uuidv4 } from "uuid"
import {
  Category,
  DEFAULT_MAX_RUNNING_MONETH_VALUE,
  Entry,
  FormattedDateTime,
  MonthYearTimestamp,
  RunningMonthCategories,
  Tab,
} from "../types/core"

export function nodeIdOfCategory(category: Category): string {
  switch (category) {
    case Category.Groceries:
      return "id-category-groceries"
    case Category.Transport:
      return "id-category-transport"
    case Category.Clothes:
      return "id-category-clothes"
    case Category.Restaurants:
      return "id-category-food"
    case Category.Fun:
      return "id-category-fun"
    case Category.Other:
      return "id-category-other"
  }
}

export function stringOfCategory(category: Category): string {
  switch (category) {
    case Category.Groceries:
      return "Groceries"
    case Category.Transport:
      return "Transport"
    case Category.Clothes:
      return "Clothes"
    case Category.Restaurants:
      return "Food"
    case Category.Fun:
      return "Fun"
    case Category.Other:
      return "Other"
  }
}

export function emojiOfCategory(category: Category): string {
  switch (category) {
    case Category.Groceries:
      return "🥬"
    case Category.Transport:
      return "🚗"
    case Category.Clothes:
      return "👕"
    case Category.Restaurants:
      return "🍝"
    case Category.Fun:
      return "🍹"
    case Category.Other:
      return "🪨" // "🧽"
  }
}

export function colorOfCategory(category: Category): string {
  switch (category) {
    case Category.Groceries:
      return "#31C023"
    case Category.Transport:
      return "#F05A4B"
    case Category.Clothes:
      return "#319AFB"
    case Category.Restaurants:
      return "#FFD43B"
    case Category.Fun:
      return "#F28D27"
    case Category.Other:
      return "#A97CF0"
  }
}

export function stringOfTab(tab: Tab): React.ReactNode {
  switch (tab) {
    case Tab.Entry:
      return "Entry"
    case Tab.Analytics:
      return "Analytics"
    case Tab.History:
      return "History"
    case Tab.Settings:
      return "Settings"
  }
}

export function iconOfTab(tab: Tab): React.ReactNode {
  switch (tab) {
    case Tab.Entry:
      return (
        <svg
          width="22px"
          height="22px"
          stroke-width="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
        >
          <path
            d="M7 3H5C3.89543 3 3 3.89543 3 5V7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M17 3H19C20.1046 3 21 3.89543 21 5V7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M16 8L16 10"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M8 8L8 10"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M9 16C9 16 10 17 12 17C14 17 15 16 15 16"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M12 8L12 13L11 13"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M7 21H5C3.89543 21 3 20.1046 3 19V17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M17 21H19C20.1046 21 21 20.1046 21 19V17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      )
    case Tab.Analytics:
      return (
        <svg
          width="22px"
          height="22px"
          stroke-width="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
        >
          <path
            d="M20 20H4V4"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M4 16.5L12 9L15 12L19.5 7.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      )
    case Tab.History:
      return (
        <svg
          width="22px"
          height="22px"
          stroke-width="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
        >
          <path
            d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 10V6C3 4.89543 3.89543 4 5 4H7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M7 2V6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      )
    case Tab.Settings:
      return (
        <svg
          width="22px"
          height="22px"
          stroke-width="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      )
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

export function sumOfRunningMonthCategories(
  rmc: RunningMonthCategories
): number {
  return Object.values(rmc).reduce((sum, rmv) => sum + rmv.max, 0)
}

export function remainingSumOfRunningMonthCategories(
  rmc: RunningMonthCategories
): number {
  const max = sumOfRunningMonthCategories(rmc)
  const expenses = Object.values(rmc).reduce(
    (sum, rmv) => sum + sumOfEntries(rmv.entries),
    0
  )
  return max - expenses
}

export function makeEntry(cost: number, memo?: string): Entry {
  return {
    id: uuidv4(),
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

export function isEntryWithinCurrentCycle(entry: Entry): boolean {
  const dateTs = getMonthYearTimestampFromFormatted(entry.date)
  const curDateTs = getMonthYearTimestamp(DateTime.now())
  return dateTs === curDateTs
}

export function areAllEntriesWithinCurrentCycle(
  entries: Array<Entry>
): boolean {
  return entries.every((entry) => isEntryWithinCurrentCycle(entry))
}
