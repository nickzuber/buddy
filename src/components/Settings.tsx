import { useCategories } from "../hooks/useCategories"

export function SettingsTab() {
  const { categories } = useCategories()

  return (
    <div className="tab-container">
      <div className="tab-header-container">{"Settings"}</div>

      <div>hi</div>
    </div>
  )
}
