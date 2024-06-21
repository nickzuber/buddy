import { useState } from "react"

export interface Item<T> {
  id: string
  title: string
  value: T
}

export interface DropdownProps<T> {
  selectedItem: Item<T>
  items: Array<Item<T>>
  onChange: (item: Item<T>) => void
}

export function Dropdown<T>({
  selectedItem,
  items,
  onChange,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false)

  if (open) {
  }

  return (
    <div
      className="secondary-rounded-container dropdown-core"
      onClick={() => setOpen(true)}
    >
      {selectedItem.title}
      <svg
        width="22px"
        height="22px"
        strokeWidth="3"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="currentColor"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  )
}
