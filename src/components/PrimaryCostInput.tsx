import { DateTime } from "luxon"
import { focusInput } from "../helpers/dom"
import { useTilt } from "../hooks/useTilt"

export interface PrimaryCostInputProps {
  cost: number
  setCost: (cost: number) => void
}

export function PrimaryCostInput({ cost, setCost }: PrimaryCostInputProps) {
  const numChars = cost.toString().length

  const touchEvents = useTilt({
    nodeId: "number-container",
  })

  const parts = cost.toLocaleString().split("")

  return (
    <>
      <div
        id="number-container"
        className="primary-number-input-container"
        style={{
          width: numChars > 4 ? "85%" : numChars > 3 ? "75%" : undefined,
        }}
        onClick={focusInput}
        {...touchEvents}
      >
        <span className="text-color-secondary"></span>
        <span className="primary-number-input big-text-primary">
          {"$"}
          {parts.map((char, idx) => {
            return (
              <span
                key={`${idx}-${char}`}
                style={{ display: "inline-block" }}
                className={idx === parts.length - 1 ? "pop-press" : undefined}
              >
                {char}
              </span>
            )
          })}
        </span>
        <span className="text-color-secondary">
          {DateTime.now().toFormat("cccc, LLL d")}
        </span>
        <input
          id="hidden-input"
          className="hidden-input"
          autoComplete="off"
          type="tel"
          value={cost}
          onChange={(event) => {
            const nextNum = Number(event.target.value ?? 0)
            if (!isNaN(nextNum)) {
              // Don't go over 5 digits. We don't need to (mr big spender) and
              // trying to handle more than 5 digits gives us layout headaches.
              setCost(Math.min(nextNum, 99999))
            }
          }}
        />
      </div>
    </>
  )
}
