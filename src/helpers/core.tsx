import { DateTime } from "luxon"
import { v4 as uuidv4 } from "uuid"
import {
  Category,
  DEFAULT_MAX_RUNNING_MONETH_VALUE,
  Entry,
  FormattedDateTime,
  Month,
  MonthYearTimestamp,
  RunningMonthCategories,
  SupportedTheme,
  Tab,
  ThemeProvider,
} from "../types/core"

export function stringOfMonth(month: Month): string {
  switch (month) {
    case Month.Jan:
      return "January"
    case Month.Feb:
      return "February"
    case Month.Mar:
      return "March"
    case Month.Apr:
      return "April"
    case Month.May:
      return "May"
    case Month.Jun:
      return "June"
    case Month.Jul:
      return "July"
    case Month.Aug:
      return "August"
    case Month.Sept:
      return "September"
    case Month.Oct:
      return "October"
    case Month.Nov:
      return "November"
    case Month.Dev:
      return "December"
  }
}

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

export function stringOfTab(tab: Tab): string {
  switch (tab) {
    case Tab.Entry:
      return "Entry"
    case Tab.Analytics:
      return "Analytics"
    case Tab.Overview:
      return "Overview"
    case Tab.History:
      return "History"
    case Tab.Settings:
      return "Settings"
  }
}

export function emojiOfTheme(theme: SupportedTheme): string {
  switch (theme) {
    case SupportedTheme.Purple:
      return "🟣"
    case SupportedTheme.Green:
      return "🟢"
    case SupportedTheme.Orange:
      return "🟠"
    case SupportedTheme.Red:
      return "🔴"
    case SupportedTheme.Blue:
      return "🔵"
    case SupportedTheme.Black:
      return "⚫"
  }
}

export function stringOfTheme(theme: SupportedTheme): string {
  switch (theme) {
    case SupportedTheme.Purple:
      return "Purple"
    case SupportedTheme.Green:
      return "Green"
    case SupportedTheme.Orange:
      return "Orange"
    case SupportedTheme.Red:
      return "Red"
    case SupportedTheme.Blue:
      return "Blue"
    case SupportedTheme.Black:
      return "Black"
  }
}

export function iconOfTab(tab: Tab): React.ReactNode {
  switch (tab) {
    case Tab.Entry:
      return (
        <svg
          width="22px"
          height="22px"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
        >
          <path
            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M16.5 14.5C16.5 14.5 15 16.5 12 16.5C9 16.5 7.5 14.5 7.5 14.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M15.5 9C15.2239 9 15 8.77614 15 8.5C15 8.22386 15.2239 8 15.5 8C15.7761 8 16 8.22386 16 8.5C16 8.77614 15.7761 9 15.5 9Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M8.5 9C8.22386 9 8 8.77614 8 8.5C8 8.22386 8.22386 8 8.5 8C8.77614 8 9 8.22386 9 8.5C9 8.77614 8.77614 9 8.5 9Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      )
    case Tab.Overview:
      return (
        <svg
          width="22px"
          height="22px"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
        >
          <path
            d="M20 20H4V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M4 16.5L12 9L15 12L19.5 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      )
    case Tab.Analytics:
      return (
        <svg
          width="22px"
          height="22px"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
        >
          <path
            d="M20 20H4V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M4 16.5L12 9L15 12L19.5 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      )
    case Tab.History:
      return (
        <svg
          width="22px"
          height="22px"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
        >
          <path
            d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M3 10V6C3 4.89543 3.89543 4 5 4H7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7 2V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      )
    case Tab.Settings:
      return (
        <svg
          width="22px"
          height="22px"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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

export function filterEntriesByMonth(
  entries: Array<Entry>,
  monthIndex: number
): Array<Entry> {
  return entries.filter((entry) => {
    const entryMonthIndex = fromFormattedDateTime(entry.date).get("month")
    return monthIndex === entryMonthIndex
  })
}

export function sumOfEntries(
  entries: Array<Entry>,
  monthIndex?: number
): number {
  if (monthIndex !== undefined) {
    return filterEntriesByMonth(entries, monthIndex).reduce(
      (sum, entry) => sum + entry.cost,
      0
    )
  } else {
    return entries.reduce((sum, entry) => sum + entry.cost, 0)
  }
}

export function sumOfRunningMonthCategories(
  rmc: RunningMonthCategories,
  monthIndex: number
): number {
  return Object.values(rmc).reduce(
    (sum, rmv) => sum + sumOfEntries(rmv.entries, monthIndex),
    0
  )
}

export function sumOfRunningMonthCategoriesMax(
  rmc: RunningMonthCategories
): number {
  return Object.values(rmc).reduce((sum, rmv) => sum + rmv.max, 0)
}

export function remainingSumOfRunningMonthCategoriesMax(
  rmc: RunningMonthCategories,
  monthIndex: number
): number {
  const max = sumOfRunningMonthCategoriesMax(rmc)
  const expenses = Object.values(rmc).reduce(
    (sum, rmv) => sum + sumOfEntries(rmv.entries, monthIndex),
    0
  )
  return max - expenses
}

export function makeEntry(cost: number, memo?: string): Entry {
  return {
    id: uuidv4(),
    date: toFormattedDateTime(DateTime.now()),
    // date: toFormattedDateTime(DateTime.now().minus(1000 * 60 * 60 * 24 * 36)),
    cost,
    memo,
  }
}

export function makeEntryFromDate(
  cost: number,
  date: FormattedDateTime
): Entry {
  return {
    id: uuidv4(),
    date,
    cost,
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

export function formatCurrency(n: number, showCents = false): string {
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n)

  return showCents ? f : f.split(".")[0]
}

export function getThemeGlobalVariables(theme: SupportedTheme) {
  const selectedTheme = ThemeProvider[theme]
  if (!selectedTheme) {
    return {}
  }

  const keys = Object.keys(selectedTheme)
  const obj: Record<string, string> = {}
  for (const key of keys) {
    const variableKey = `--${camelCaseToKebabCase(key)}`
    obj[variableKey] = selectedTheme[key]
  }
  console.info(obj)
  return obj
}

function camelCaseToKebabCase(key: string): string {
  var result = key.replace(/([A-Z])/g, " $1")
  return result.split(" ").join("-").toLowerCase()
}
