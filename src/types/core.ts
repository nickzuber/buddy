import { DateTime } from "luxon"

export const DEFAULT_MAX_RUNNING_MONETH_VALUE = 100 // usd
export enum PersistedState {
  Navigation = "navigation",
  HistoryLedger = "history-ledger",
  RunningMonthCategories = "running-month-categories",
}

export type FormattedDateTime = string & { _opaque: true }

export enum Category {
  Groceries = "groceries",
  Transport = "transport",
  Clothes = "clothes",
  Restaurants = "restaurants",
  Fun = "fun",
  Other = "other",
}

export type Entry = {
  id: string
  date: FormattedDateTime
  cost: number
  memo?: string
}

export type RunningMonthValue = {
  entries: Array<Entry>
  max: number
}

export type RunningMonthCategories = Record<Category, RunningMonthValue>

export type MonthEndingValue = {
  ending: number
  max: number
}

export type MonthEndingCategories = Record<Category, MonthEndingValue>

export type HistoryLedger = Record<
  MonthYearTimestamp,
  Partial<MonthEndingCategories>
>

export type MonthYearTimestamp = string & { _opaque: true }

export enum Tab {
  Entry = "entry",
  Analytics = "analytics",
  History = "history",
  Settings = "settings",
}

export enum Month {
  Jan = "jan",
  Feb = "feb",
  Mar = "mar",
  Apr = "apr",
  May = "may",
  Jun = "jun",
  Jul = "jul",
  Aug = "aug",
  Sept = "sept",
  Oct = "oct",
  Nov = "nov",
  Dev = "dev",
}

// Used for grouping the entries by day.
export function getKeyForDay(date: DateTime) {
  return date.ordinal
}

// Used for grouping the entries by month.
export function getKeyForMonth(date: DateTime) {
  return date.get("month") - 1 // 0-indexed
}

export type HydratedEntry = Entry & {
  date: DateTime
  max: number
  category: Category
}
