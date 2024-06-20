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

export function HistoryTab() {
  const { categories } = useCategories()

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
    <div className="tab-container">
      <div className="tab-header-container">{"History"}</div>

      {sortedDateKeys.map((key) => {
        const entries = entriesByMonth[key]
        const date = entries[0].date

        const sum = sumOfEntries(entries)

        const maxFormatted = formatCurrency(max, true) //.split("$")[1]
        const costsFormatted = formatCurrency(sum, true) //.split("$")[1]

        const entriesByDay = entries.reduce((map, entry) => {
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

        return (
          <div className="history-group">
            <div className="history-group-title-container">
              <div className="history-group-title">{date.toFormat("LLLL")}</div>
              <div className="history-group-costs">
                <span>{`+`}</span>
                <span>{`${maxFormatted}`}</span>
                <span>{`–`}</span>
                <span>{`${costsFormatted}`}</span>
              </div>
            </div>
            {sortedDateKeysInner.map((key) => {
              const entries = entriesByDay[key]

              return (
                <div className="history-inner-group">
                  <div className="history-inner-group-title-outer">
                    <div className="history-inner-group-title">
                      {entries[0].date.toFormat("LLL d yyyy")}
                    </div>
                  </div>

                  {entries.map((entry) => {
                    const cost = formatCurrency(entry.cost)

                    return (
                      <div className="history-item">
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
