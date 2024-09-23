import {DateTime, DateTimeMaybeValid} from "luxon";
import appConfig from "../../../configs/app";
import DateFactory from "../../factories/DateFactory";

class LuxonDateBuilder {
    private date: DateTimeMaybeValid;

    constructor(date = DateTime.local()) {
        date = date ?? DateTime.local()
        this.date = DateTime.fromJSDate(date.toJSDate()).setZone(appConfig.timeZone);
    }

    setIsoDate(isoDate) {
        isoDate = isoDate ?? DateTime.local()
        this.date = DateTime.fromISO(isoDate);
        return this;
    }

    format(format: string) {
        return this.date.setZone(DateTime.local().zoneName).toFormat(format);
    }

    diffForHumans() {
        return this.date.setZone(DateTime.local().zoneName).toRelative()
    }

    currentIsoDate(): string {
        const now = DateTime.now()

        return  <string>now.setZone('UTC').toISO({includeOffset: false, suppressMilliseconds: false});
    }

    dateTimeFormatted() {
        return this.format(DateFactory.DEFAULT_DATE_TIME_FORMAT)
    }
}

export default LuxonDateBuilder