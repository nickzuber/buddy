import { useNavigation } from "../hooks/useNavigation"
import { Tab } from "../types/core"
import { BottomNavigation } from "./BottomNavigation"
import { EntryTab } from "./EntryTab"
import { HistoryTab } from "./HistoryTab"

// If we just set the overflow to always be scroll, this will give Safari
// that annoying "bouncy scroll" behavior even when there is no scrollable
// content.
const TABS_THAT_SCROLL_VERTICALLY: Array<Tab> = [Tab.History]

function App() {
  const { tab, setTab } = useNavigation()

  function renderContent() {
    switch (tab) {
      case Tab.Entry:
        return <EntryTab />
      case Tab.History:
        return <HistoryTab />
      default:
        return <div>{"not supported!"}</div>
    }
  }

  return (
    <div
      className="primary-container"
      style={{
        overflowY: TABS_THAT_SCROLL_VERTICALLY.includes(tab)
          ? "auto"
          : undefined,
      }}
    >
      {renderContent()}
      <BottomNavigation activeTab={tab} setTab={setTab} />
    </div>
  )
}

export default App
