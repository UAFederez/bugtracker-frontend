const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = MINUTES_PER_HOUR * 24;
const MINUTES_PER_WEEK = MINUTES_PER_DAY * 7;
const MINUTES_PER_MONTH = MINUTES_PER_WEEK * 4.34524; // approximate
const MINUTES_PER_YEAR = MINUTES_PER_MONTH * 12;

function formatPluralize(value, word) {
    return value != 1 ? `${word}s` : word;
}

export default function formatDateNatural(date) {
    const differenceInMinutes = Math.floor((new Date() - date) / (1000 * 60));
    if (differenceInMinutes < MINUTES_PER_HOUR) {
        const diff = Math.floor(differenceInMinutes);
        return `${diff} ${formatPluralize(diff, "minute")} ago`;
    }
    if (differenceInMinutes < MINUTES_PER_DAY) {
        const diff = Math.floor(differenceInMinutes / MINUTES_PER_HOUR);
        return `${diff} ${formatPluralize(diff, "hour")} ago`;
    }
    if (differenceInMinutes < MINUTES_PER_WEEK) {
        const diff = Math.floor(differenceInMinutes / MINUTES_PER_DAY);
        return `${diff} ${formatPluralize(diff, "day")} ago`;
    }
    if (differenceInMinutes < MINUTES_PER_MONTH) {
        const diff = Math.floor(differenceInMinutes / MINUTES_PER_WEEK);
        return `${diff} ${formatPluralize(diff, "week")} ago`;
    }
    if (differenceInMinutes < MINUTES_PER_YEAR) {
        const diff = Math.floor(differenceInMinutes / MINUTES_PER_MONTH);
        return `${diff} ${formatPluralize(diff, "month")} ago`;
    }
    const diff = Math.floor(differenceInMinutes / MINUTES_PER_YEAR);
    return `${diff} ${formatPluralize(diff, "year")} ago`;
}
