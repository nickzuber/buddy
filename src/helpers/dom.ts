export function focusInput() {
  const elem = document.querySelector(
    "#hidden-input"
  ) as HTMLInputElement | null

  if (!elem) return

  // Focuses input to pull up drawer.
  elem.focus()

  // Makes sure that the cursor is at end of input.
  // This is so when we start typing, we're not adding numbers to the middle
  // of the current value.
  elem.setSelectionRange(-1, -1)
}
