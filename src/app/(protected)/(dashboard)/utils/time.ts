export const time = {
  secs(noOfSecs: number) {
    return 1000 * noOfSecs
  },
  mins(noOfMins: number) {
    return this.secs(60) * noOfMins
  },
  hours(noOfHours: number) {
    return this.mins(60) * noOfHours
  },
  days(noOfDays: number) {
    return this.hours(24) * noOfDays
  },
  weeks(noOfWeeks: number) {
    return this.days(7) * noOfWeeks
  },
  months(noOfMonths: number) {
    return this.weeks(4) * noOfMonths
  },
  years(noOfYears: number) {
    return this.months(12) * noOfYears
  },
}
