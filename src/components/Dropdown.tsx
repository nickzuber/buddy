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
  return (
    <div className="secondary-rounded-container dropdown-core-outer">
      <select
        className="secondary-rounded-container dropdown-core"
        onChange={(event) => {
          const newlySelectedId = event.target.value
          const newlySelectedItem = items.find(
            (item) => item.id === newlySelectedId
          )
          if (newlySelectedItem) {
            onChange(newlySelectedItem)
          }
        }}
      >
        {items.map((item) => {
          return (
            <option
              key={item.id}
              selected={item.id === selectedItem.id}
              value={item.id}
            >
              {item.title}
            </option>
          )
        })}
      </select>
    </div>
  )

  // return (
  //   <div
  //     className="secondary-rounded-container dropdown-core"
  //     onClick={() => setOpen(true)}
  //   >
  //     {selectedItem.title}
  //     <svg
  //       width="22px"
  //       height="22px"
  //       strokeWidth="3"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //       color="currentColor"
  //     >
  //       <path
  //         d="M6 9L12 15L18 9"
  //         stroke="currentColor"
  //         strokeWidth="3"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //       ></path>
  //     </svg>
  //   </div>
  // )
}
