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
        <span
          // key={Math.random()}
          className="primary-number-input big-text-primary"
        >
          {"$"}
          {parts.map((char, idx) => {
            return (
              <span
                key={char}
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
          type="tel"
          value={cost}
          onChange={(event) => {
            const nextNum = Number(event.target.value ?? 0)
            if (!isNaN(nextNum)) {
              setCost(nextNum)
            }
          }}
        />
      </div>
    </>
  )
}
