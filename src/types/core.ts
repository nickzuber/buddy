import { DateTime } from "luxon"

export const DEFAULT_MAX_RUNNING_MONETH_VALUE = 100 // usd
export enum PersistedState {
  Navigation = "navigation",
  HistoryLedger = "history-ledger",
  RunningMonthCategories = "running-month-categories",
  Theme = "theme",
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
  Overview = "overview",
  Analytics = "analytics",
  History = "history",
  Settings = "settings",
}

export enum Month {
  Jan = 1,
  Feb = 2,
  Mar = 3,
  Apr = 4,
  May = 5,
  Jun = 6,
  Jul = 7,
  Aug = 8,
  Sept = 9,
  Oct = 10,
  Nov = 11,
  Dev = 12,
}

// Used for grouping the entries by day.
export function getKeyForDay(date: DateTime) {
  return date.ordinal
}

// Used for grouping the entries by month.
export function getKeyForMonth(date: DateTime) {
  return date.get("month")
}

export type HydratedEntry = Entry & {
  date: DateTime
  max: number
  category: Category
}

export type Theme = {
  primary: string
  primaryAlt: string
  footerBackground: string
}

export enum SupportedTheme {
  Purple = "purple",
  Green = "green",
  Orange = "orange",
  Red = "Red",
}

export const ThemeProvider: Record<SupportedTheme, Theme> = {
  [SupportedTheme.Purple]: {
    primary: "#a97cf0",
    primaryAlt: "#9971dc",
    footerBackground: "#352e4f",
  },
  [SupportedTheme.Green]: {
    primary: "#31C023",
    primaryAlt: "#27ac1b",
    footerBackground: "#284932",
  },
  [SupportedTheme.Orange]: {
    primary: "#F28D27",
    primaryAlt: "#DC8123",
    footerBackground: "#443022",
  },
  [SupportedTheme.Red]: {
    primary: "#F05A4B",
    primaryAlt: "#e34c3d",
    footerBackground: "#3c1c1c",
  },
} as const
