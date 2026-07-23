export const getHours = (date: Date) => {
  const defineDate = new Date(date)
  const formattedHours = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(defineDate)

  return `${formattedHours}`
}

export const getFullDate = (date: Date) => {
  const defineDate = new Date(date)

  return `${defineDate.toLocaleDateString()} ${getHours(date)}`
}
