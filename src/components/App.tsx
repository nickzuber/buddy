import { useEffect, useState } from "react"
import { remainingSumOfRunningMonthCategories } from "../helpers/core"
import { useCategories } from "../hooks/useCategories"
import { Category } from "../types/core"
import { CategorySelector } from "./CategorySelector"
import { PrimaryCostInput } from "./PrimaryCostInput"

function App() {
  const { categories } = useCategories()
  const [cost, setCost] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >()

  const budget = remainingSumOfRunningMonthCategories(categories)

  useEffect(() => {
    if (selectedCategory === undefined) {
      const nodes = document.querySelectorAll(
        ".primary-category-item"
      ) as NodeListOf<HTMLDivElement>
      nodes.forEach((node) => {
        node.style.transitionDuration = "500ms"
      })
    }
  }, [selectedCategory])

  return (
    <div className="primary-container">
      <div className="primary-top-container">
        <span className="secondary-rounded-container">{`$${budget.toLocaleString()}`}</span>
      </div>
      <PrimaryCostInput cost={cost} setCost={setCost} />

      <div className="primary-interaction-container">
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="primary-submittions">
          <button
            className="primary-button"
            style={{ width: "fit-content" }}
            onClick={() => {
              setSelectedCategory(undefined)
              setCost(0)
            }}
          >
            {"Cancel"}
          </button>
          <button className="primary-button funky-button-styles">
            {"Confirm entry"}
          </button>
        </div>
      </div>

      <div className="primary-footer"></div>
    </div>
  )
}

export default App
