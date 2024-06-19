import { iconOfTab, stringOfTab } from "../helpers/core"
import { useNavigation } from "../hooks/useNavigation"
import { Tab } from "../types/core"

export function BottomNavigation() {
  const { tab: activeTab, setTab } = useNavigation()

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
