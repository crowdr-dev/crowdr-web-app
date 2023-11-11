export function getDuration(startDate: IDate, endDate: IDate) {
  [startDate, endDate] = [new Date(startDate), new Date(endDate)]
  const durationInMs = endDate.getTime() - startDate.getTime()
  const days = Math.floor(durationInMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (durationInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const formattedDuration = `${days}d ${hours}h`

  return formattedDuration
}

type IDate = Date | string
