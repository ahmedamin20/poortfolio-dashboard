import LuxonDateBuilder from "../builders/date/LuxonDateBuilder";
import appConfig from "../../configs/app";

class DateFactory {
    static DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd hh:mm";
    static DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    static DEFAULT_TIME_FORMAT = "HH:mm";
    static DEFAULT_AM_PM_FORMAT = "a";
    static DEFAULT_TIME_ZONE = appConfig.timeZone;

    static createInstance(isoDate?: string) {
        return new LuxonDateBuilder().setIsoDate(isoDate)
    }

    static fromIsoDate(isoDate: string) {
        return this.createInstance(isoDate)
    }
}

export default DateFactory;