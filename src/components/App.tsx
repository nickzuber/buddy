import { useNavigation } from "../hooks/useNavigation"
import { Tab } from "../types/core"
import { BottomNavigation } from "./BottomNavigation"
import { EntryTab } from "./EntryTab"
import { HistoryTab } from "./HistoryTab"

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
    <div className="primary-container">
      {renderContent()}
      <BottomNavigation activeTab={tab} setTab={setTab} />
    </div>
  )
}

export default App
