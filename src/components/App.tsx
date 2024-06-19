import { useNavigation } from "../hooks/useNavigation"
import { Tab } from "../types/core"
import { BottomNavigation } from "./BottomNavigation"
import { EntryTab } from "./EntryTab"

function App() {
  const { tab } = useNavigation()

  function renderContent() {
    switch (tab) {
      case Tab.Entry:
        return <EntryTab />
      default:
        return <div>{"not supported!"}</div>
    }
  }

  return (
    <div className="primary-container">
      {renderContent()}
      <BottomNavigation />
    </div>
  )
}

export default App
