import { DateTime } from "luxon"
import { useRef, useState } from "react"

// Magic perspective number.
const PERSPECTIVE_PX = 400
const SCALE_RATIO = "0.95"
const ANIMATION_SPEED = 230

function App() {
  // return <DebugSkeleton />

  const [cost, setCost] = useState(0)
  const animationCycleCounterRef = useRef(0)
  const numChars = cost.toString().length

  function focusInput() {
    const elem = document.querySelector(
      "#hidden-input"
    ) as HTMLInputElement | null
    if (!elem) return

    elem.focus()
  }

  function getTiltCoordinates(event: React.TouchEvent<HTMLDivElement>) {
    const elem = document.querySelector(
      "#number-container"
    ) as HTMLInputElement | null
    if (!elem) {
      return {
        rx: 0,
        ry: 0,
        angle: 0,
      }
    }

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
    // Always divide the smaller r value.
    // Note entirely sure why this works to be completely honest.
    let force =
      Math.abs(rx) > Math.abs(ry)
        ? Math.abs(rx) + Math.abs(ry) / 2
        : Math.abs(rx) / 2 + Math.abs(ry)

    // NOTE: If you change this, you must tweak the max force value.
    const thrust = 10

    // If force gets too strong, take the difference and flatten the curve.
    const maxForceValue = 3
    if (force > maxForceValue) {
      const overflow = force - maxForceValue
      force = maxForceValue + Math.log10((overflow + 1) * 2)
    }

    return {
      rx,
      ry,
      angle: force * thrust,
    }
  }

  function resetStyles() {
    const elem = document.querySelector(
      "#number-container"
    ) as HTMLInputElement | null
    if (!elem) return

    // Reset the cycle counter since we've ended an animation.
    animationCycleCounterRef.current = 0

    setTimeout(() => {
      elem.style.transform = ""
      elem.style.transitionDuration = "1400ms"
      elem.style.opacity = "1"
    }, 100)
  }

  return (
    <div className="primary-container">
      <div
        id="number-container"
        className="primary-number-input-container"
        style={{
          width: numChars > 4 ? "85%" : numChars > 3 ? "75%" : undefined,
        }}
        onClick={focusInput}
        onTouchStart={(event) => {
          const elem = document.querySelector(
            "#number-container"
          ) as HTMLInputElement | null
          if (!elem) return

          // Focus on touch start to get instant drawer pull.
          focusInput()

          // Calculate the tilt.
          const { rx, ry, angle } = getTiltCoordinates(event)

          // Apply the tilt with an animation.
          elem.style.transitionDuration = `${ANIMATION_SPEED}ms`
          elem.style.transform = `scale(${SCALE_RATIO}) perspective(${PERSPECTIVE_PX}px) rotate3d(${-ry}, ${rx}, 0, ${angle}deg)`
          elem.style.opacity = "0.95"

          // Increment the cycle counter.
          animationCycleCounterRef.current =
            animationCycleCounterRef.current + 1
        }}
        onTouchMove={(event) => {
          const elem = document.querySelector(
            "#number-container"
          ) as HTMLInputElement | null
          if (!elem) return

          // Focus on touch start to get instant drawer pull.
          focusInput()

          // Calculate the tilt.
          const { rx, ry, angle } = getTiltCoordinates(event)

          // Calculate the active animation delay.
          const animationDelay = Math.max(
            0,
            ANIMATION_SPEED - ++animationCycleCounterRef.current * 50
          )

          // Apply the tilt with an animation.
          elem.style.transitionDuration = `${animationDelay}ms`
          elem.style.transform = `scale(${SCALE_RATIO}) perspective(${PERSPECTIVE_PX}px) rotate3d(${-ry}, ${rx}, 0, ${angle}deg)`
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
}

export default App
