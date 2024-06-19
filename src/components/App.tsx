import { useEffect, useState } from "react"
import { Category } from "../types/core"
import { CategorySelector } from "./CategorySelector"
import { PrimaryCostInput } from "./PrimaryCostInput"

function App() {
  const [cost, setCost] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >()

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
      <PrimaryCostInput cost={cost} setCost={setCost} />
      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="primary-submittions">
        <div
          className="primary-button"
          onClick={() => {
            setSelectedCategory(undefined)
            setCost(0)
          }}
        >
          {"Cancel"}
        </div>
        <div className="primary-button">{"Submit"}</div>
      </div>

      <div className="primary-footer"></div>
    </div>
  )
}

export default App
