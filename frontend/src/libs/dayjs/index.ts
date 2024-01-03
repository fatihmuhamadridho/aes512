import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

export { dayjs };
