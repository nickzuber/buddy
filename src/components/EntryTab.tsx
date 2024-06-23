import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import {
  formatCurrency,
  makeEntry,
  remainingSumOfRunningMonthCategoriesMax,
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

  const currentMonthIndex = DateTime.now().get("month")
  const budget = remainingSumOfRunningMonthCategoriesMax(
    categories,
    currentMonthIndex
  )

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
        <span className="secondary-rounded-container">
          {budget < 0 ? (
            <svg
              width="22px"
              height="22px"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M20.0429 21H3.95705C2.41902 21 1.45658 19.3364 2.22324 18.0031L10.2662 4.01533C11.0352 2.67792 12.9648 2.67791 13.7338 4.01532L21.7768 18.0031C22.5434 19.3364 21.581 21 20.0429 21Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              ></path>
              <path
                d="M12 9V13"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              ></path>
              <path
                d="M12 17.01L12.01 16.9989"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          ) : null}
          {formatCurrency(budget)}
        </span>
      </div>
      <PrimaryCostInput cost={cost} setCost={setCost} />

      <div className="primary-interaction-container ">
        <CategorySelector
          cost={cost}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="primary-submittions">
          <button
            className="primary-button"
            style={{ width: "fit-content" }}
            disabled={!Boolean(selectedCategory || cost > 0)}
            onClick={() => {
              setSelectedCategory(undefined)
              setCost(0)
            }}
          >
            {"Cancel"}
          </button>
          <button
            className="primary-button"
            disabled={Boolean(!selectedCategory || cost === 0)}
            onClick={onSubmit}
          >
            {"Confirm entry"}
          </button>
        </div>
      </div>
    </>
  )
}
