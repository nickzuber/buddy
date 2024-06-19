export function focusInput() {
  const elem = document.querySelector(
    "#hidden-input"
  ) as HTMLInputElement | null

  if (!elem) return
  elem.focus()
}
