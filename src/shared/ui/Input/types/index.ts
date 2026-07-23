export interface InputProps {
  placeholder?: string
  maxLength?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
