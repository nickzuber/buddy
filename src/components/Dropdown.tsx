export interface Item<T> {
  id: string
  title: string
  value: T
}

export interface DropdownProps<T> {
  selectedItem: Item<T>
  items: Array<Item<T>>
  onChange: (item: Item<T>) => void
  style?: React.CSSProperties
}

export function Dropdown<T>({
  selectedItem,
  items,
  onChange,
  style,
}: DropdownProps<T>) {
  return (
    <div
      className="secondary-rounded-container dropdown-core-outer"
      style={style}
    >
      <select
        className="secondary-rounded-container dropdown-core"
        style={style}
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
}
