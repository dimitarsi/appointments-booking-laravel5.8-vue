import { padStart, reduce } from "lodash";
import { addDays, subDays, startOfWeek, endOfWeek } from "date-fns";

const date = d => padStart(d.getDate()+"", 2, "0");
const month = d => padStart((d.getMonth()+1)+"", 2, "0");
export const hour = d => padStart(d.getHours()+"", 2, "0");
export const minutes = d => padStart(d.getMinutes()+"", 2, "0");

export function time(d) { return `${hour(d)}:${minutes(d)}`; }

export default d => `${d.getFullYear()}-${month(d)}-${date(d)}`;

export const bgFormat = d => `${date(d)}.${month(d)}.${d.getFullYear()}`;
export const sqlFormat = d => `${d.getFullYear()}-${month(d)}-${date(d)} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
export const dateFormat = d => `${date(d)}.${month(d)}`;

export const tomorrow = () =>  {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
}

export const range = (from, to) => {
    const diff = to - from;
    let arr = new Array(diff);
    for(let i = 0; i < arr.length; i++) {
        arr[i] = i + diff;
    }

    return arr;
}

export const dayOfTheWeek = (ind) => {
    return [
        "Неделя",
        "Понеделник",
        "Вторник",
        "Сряда",
        "Четвъртък",
        "Петък",
        "Събота"
    ][ind];
}

export const shortDayNames = [
    "sun",
    "mon",
    "thu",
    "wed",
    "tur",
    "fri",
    "sat"
];

export const daysValue = {
    "sun": 6,
    "mon": 0,
    "thu": 1,
    "wed": 2,
    "tur": 3,
    "fri": 4,
    "sat": 5
};


export const shortDayOfTheWeek = (ind) => {
    return shortDayNames[ind];
}

export const cloneDate = (date) => {
    let d = new Date();
    d.setDate(date.getDate());
    d.setMonth(date.getMonth());
    d.setFullYear(date.getFullYear());
    d.setHours(0,0,0);

    return d;
}


class Week {
    constructor(date) {
        const weekStartsOn = 1;
        this.start = startOfWeek(date, { weekStartsOn });
        this.end = endOfWeek(date, { weekStartsOn });
    }

    days() {
        return [0,1,2,3,4,5,6].map(amount => addDays(this.start, amount));
    }

    previousWeek() {
        return new Week(subDays(this.start, 1));
    }

    nextWeek() {
        return new Week(addDays(this.end, 1));
    }
}


export const week = (date) => new Week( !isNaN(date) && !!date ? new Date(date) : new Date());
export const sameDate = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate(); 
}

export function getMinutes(timestring)
{
    const split = timestring.split(':').map(parseFloat);
    return split[0] * 60 + split[1];
}

export function toHours(mins)
{
    const hours = Math.floor(mins/60);
    const left = mins%60;

    return padStart(hours, 2, "0") + ":" + padStart(left, 2, "0");
}

export function addHours(hour, timeToAdd) {
    const minutes = getMinutes(hour);
    const minutesToAdd = getMinutes(timeToAdd);
    return toHours(minutes + minutesToAdd);
}

export function setTime(date, hourMinutes) {
    if(date instanceof Date == false) throw `Date expected got ${typeof date} instead`;
    if(typeof hourMinutes != 'string') throw "hourMinutes should be string";
    if(hourMinutes.indexOf(':') != 2) throw "hourMinutes format should be hh:mm";
    // => string '09:15' => int[] [9: 15]
    const split = hourMinutes.split(':').map(d => parseFloat(d.replace(/^0/, '')));
    const hour = split[0];
    const minutes = split[1];
    const cloned = cloneDate(date);
    cloned.setHours(hour);
    cloned.setMinutes(minutes);

    return cloned;
}


export function sqlFormatData(data) {
    return reduce(data, (memo, curr, k) => {
        return {
            ...memo,
            [k]: curr instanceof Date ? sqlFormat(curr) : curr
        };
    }, {});
}

export function getTodayMinutes(date) {
    return date.getHours() * 60 + date.getMinutes();
}