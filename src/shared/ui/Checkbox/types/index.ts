export interface Checkbox {
  checked: boolean
  size?: "small" | "medium" | "big"
  disabled?: boolean
  onChange: () => void
}
