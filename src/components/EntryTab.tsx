import { useEffect, useState } from "react"
import {
  makeEntry,
  remainingSumOfRunningMonthCategories,
} from "../helpers/core"
import { useCategories } from "../hooks/useCategories"
import { Category } from "../types/core"
import { CategorySelector } from "./CategorySelector"
import { PrimaryCostInput } from "./PrimaryCostInput"

export function EntryTab() {
  const { categories, addEntryToCategory } = useCategories()
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

  function onSubmit() {
    if (!selectedCategory || cost === 0) {
      return
    }

    const entry = makeEntry(cost)
    addEntryToCategory(selectedCategory, entry)

    // TODO(nickz): More fun submit animations
    setCost(0)
    setSelectedCategory(undefined)
  }

  return (
    <>
      <div className="primary-top-container">
        <span className="secondary-rounded-container">{`$${budget.toLocaleString()}`}</span>
      </div>
      <PrimaryCostInput cost={cost} setCost={setCost} />

      <div className="primary-interaction-container">
        <CategorySelector
          cost={cost}
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
          <button
            disabled={Boolean(!selectedCategory || cost === 0)}
            onClick={onSubmit}
            className="primary-button"
          >
            {"Confirm entry"}
          </button>
        </div>
      </div>
    </>
  )
}
