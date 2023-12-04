import moment, { Moment } from "moment"

export function getDuration(startDate: IDate, endDate: IDate) {
  [startDate, endDate] = [moment(startDate), moment(endDate)]
  const days = moment(endDate).diff(startDate, 'days')
  const hours = moment(endDate).diff(startDate, 'hours') % 24
  const formattedDuration = `${days}d ${hours}h`

  return formattedDuration
}

type IDate = Date | Moment | string
