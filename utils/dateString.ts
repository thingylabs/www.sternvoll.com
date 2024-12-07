// utils/dateString.ts
const berlinDate = new Date().toLocaleString('en-GB', {
  timeZone: 'Europe/Berlin',
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
})

const [day, month, year] = berlinDate.split('/')

export const dateString = `${year}${month}${day}`
