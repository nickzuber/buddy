import {
  colorOfCategory,
  emojiOfCategory,
  nodeIdOfCategory,
  stringOfCategory,
} from "../helpers/core"
import { focusInput } from "../helpers/dom"
import { useCategories } from "../hooks/useCategories"
import { useTilt } from "../hooks/useTilt"
import { Category } from "../types/core"

export interface CategorySelectorProps {
  selectedCategory: Category | undefined
  setSelectedCategory: (category: Category | undefined) => void
}

export function CategorySelector({
  selectedCategory,
  setSelectedCategory,
}: CategorySelectorProps) {
  const { categoriesList } = useCategories()

  function onClickCategory(category: Category) {
    setSelectedCategory(category)
    focusInput()
  }

  // We have to do this manually unfortunately.
  const touchEventsGroceries = useTilt({
    nodeId: nodeIdOfCategory(Category.Groceries),
    onTouchStart: () => onClickCategory(Category.Groceries),
  })
  const touchEventsTransport = useTilt({
    nodeId: nodeIdOfCategory(Category.Transport),
    onTouchStart: () => onClickCategory(Category.Transport),
  })
  const touchEventsClothes = useTilt({
    nodeId: nodeIdOfCategory(Category.Clothes),
    onTouchStart: () => onClickCategory(Category.Clothes),
  })
  const touchEventsRestaurants = useTilt({
    nodeId: nodeIdOfCategory(Category.Restaurants),
    onTouchStart: () => onClickCategory(Category.Restaurants),
  })
  const touchEventsFun = useTilt({
    nodeId: nodeIdOfCategory(Category.Fun),
    onTouchStart: () => onClickCategory(Category.Fun),
  })
  const touchEventsOther = useTilt({
    nodeId: nodeIdOfCategory(Category.Other),
    onTouchStart: () => onClickCategory(Category.Other),
  })

  function getTouchEventsForCategory(category: Category) {
    switch (category) {
      case Category.Groceries:
        return touchEventsGroceries
      case Category.Transport:
        return touchEventsTransport
      case Category.Clothes:
        return touchEventsClothes
      case Category.Restaurants:
        return touchEventsRestaurants
      case Category.Fun:
        return touchEventsFun
      case Category.Other:
        return touchEventsOther
      default:
        return null
    }
  }

  return (
    <div className="primary-categories">
      {categoriesList.map(({ category, val }) => {
        const nonSelectedClassName = selectedCategory
          ? selectedCategory !== category
            ? "item-not-selected"
            : ""
          : ""

        return (
          <div
            className={`primary-category-item ${nonSelectedClassName}`}
            id={nodeIdOfCategory(category)}
            key={category}
            style={{ color: colorOfCategory(category) }}
            onClick={() => onClickCategory(category)}
            {...getTouchEventsForCategory(category)}
          >
            <span style={{ fontSize: 42 }}>{emojiOfCategory(category)}</span>
            <span>{stringOfCategory(category)}</span>
          </div>
        )
      })}
    </div>
  )
}
