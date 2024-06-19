import { iconOfTab, stringOfTab } from "../helpers/core"
import { Tab } from "../types/core"

export interface BottomNavigationProps {
  activeTab: Tab
  setTab: (tab: Tab) => void
}

export function BottomNavigation({ activeTab, setTab }: BottomNavigationProps) {
  // Sorted by left-to-right within the navigation UI.
  const tabs: Array<Tab> = [Tab.Entry, Tab.Analytics, Tab.History, Tab.Settings]

  return (
    <div className="primary-footer">
      {tabs.map((tab) => {
        return (
          <div
            key={tab}
            className={`primary-footer-item ${
              tab === activeTab ? "primary-footer-item-active" : ""
            }`}
            onClick={() => setTab(tab)}
          >
            {iconOfTab(tab)}
            {stringOfTab(tab)}
          </div>
        )
      })}
    </div>
  )
}
