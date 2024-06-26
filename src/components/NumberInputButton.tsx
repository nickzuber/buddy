import { useMemo, useState } from "react"
import { v4 } from "uuid"
import { formatCurrency } from "../helpers/core"

export interface NumberInputButtonProps {
  value: number
  setValue: (value: number) => void
}

export function NumberInputButton({ value, setValue }: NumberInputButtonProps) {
  const inputNodeId = useMemo(() => `uuid-${v4()}`, [])

  const [active, setActive] = useState(false)

  function focusLocalInput() {
    const elem = document.querySelector(
      `#${inputNodeId}`
    ) as HTMLInputElement | null

    if (!elem) return

    // Focuses input to pull up drawer.
    elem.focus()

    // Makes sure that the cursor is at end of input.
    // This is so when we start typing, we're not adding numbers to the middle
    // of the current value.
    elem.setSelectionRange(-1, -1)

    // Highlight the contents so we can overwrite it, instead of appending to it.
    elem.select()
  }

  return (
    <div style={{ height: 37 }}>
      <button
        className={`primary-button settings-button button-fit-size ${
          active ? "focused-outline" : ""
        }`}
        onClick={focusLocalInput}
      >
        <span>{`${formatCurrency(value)}`}</span>
      </button>
      <input
        id={inputNodeId}
        className="hidden-input"
        autoComplete="off"
        type="tel"
        value={value}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChange={(event) => {
          const nextNum = Number(event.target.value ?? 0)
          if (!isNaN(nextNum)) {
            // Don't go over 5 digits. We don't need to (mr big spender) and
            // trying to handle more than 5 digits gives us layout headaches.
            setValue(Math.min(nextNum, 99999))
          }
        }}
      />
    </div>
  )
}
