export default class Calculator {

    formatter;

    constructor(formatter) {
        this.formatter = formatter;
    }

    calc(startTimeString, endTimeString, breakDurationString) {

        const breakDuration = this.formatter.convertDuration(breakDurationString);
        const startDate = this.formatter.convertTime(startTimeString);
        const endDate = this.formatter.convertTime(endTimeString);

        const duration = endDate.subtract(breakDuration).diff(startDate);

        return this.formatter.convertMilliSeconds(duration);
    }
}