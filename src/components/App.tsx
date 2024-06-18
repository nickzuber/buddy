import { DateTime } from "luxon"
import { useState } from "react"
import { DebugSkeleton } from "./DebugSkeleton"

// perspective(420px) rotate3d(0, 0, 0, 20deg)

function App() {
  const [cost, setCost] = useState(0)
  const [animateClass, setAnimateClass] = useState<string | undefined>()

  const numChars = cost.toString().length

  function focusInput() {
    const elem = document.querySelector(
      "#hidden-input"
    ) as HTMLInputElement | null
    if (!elem) return

    elem.focus()
  }

  function resetStyles() {
    const elem = document.querySelector(
      "#number-container"
    ) as HTMLInputElement | null
    if (!elem) return

    setTimeout(() => {
      elem.style.transform = ""
      elem.style.transitionDuration = "1800ms"
    }, 100)
  }

  return (
    <div className="primary-container">
      <div
        id="number-container"
        className={`primary-number-input-container ${animateClass}`}
        style={{
          width: numChars > 4 ? "85%" : numChars > 3 ? "75%" : undefined,
        }}
        onClick={focusInput}
        onTouchStart={(event) => {
          focusInput()

          const elem = document.querySelector(
            "#number-container"
          ) as HTMLInputElement | null
          if (!elem) return

          // Get coordinates of press on screen.
          const { clientX, clientY } = event.touches[0]
          const x = Math.max(0, clientX - elem.offsetLeft)
          const y = Math.max(0, clientY - elem.offsetTop)

          // Find midpoints of clickable node.
          const midWidth = elem.offsetWidth / 2
          const midHeight = elem.offsetHeight / 2

          // Create a cartesien grid using the midpoint of that node.
          const dx = x - midWidth
          const dy = y - midHeight

          // Normalize the grid points.
          const rx = dx / midWidth
          const ry = dy / midHeight

          // Construct "force" of the press (how much it pushes into the screen).
          const force = Math.abs(rx) + Math.abs(ry) / 2
          const thrust = 13

          elem.style.transitionDuration = "300ms"
          elem.style.transform = `perspective(400px) rotate3d(${-ry}, ${rx}, 0, ${
            force * thrust
          }deg)`
        }}
        onTouchEnd={resetStyles}
        onTouchCancel={resetStyles}
      >
        <span className="text-color-secondary"></span>
        <span className="primary-number-input big-text-primary">{`$${cost.toLocaleString()}`}</span>
        <span className="text-color-secondary">
          {DateTime.now().toFormat("cccc, LLL d")}
        </span>
      </div>

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

      <div className="primary-footer"></div>
    </div>
  )

  return <DebugSkeleton />
}

export default App
