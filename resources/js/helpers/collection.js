import { addHours, getMinutes, toHours } from "./date";

export const last = (array, offset = 0) => {
    return array[Math.max(0, array.length - 1 - offset)];
}

export const range = (from, to, diff = 1) => {
    if(from === undefined || to === undefined) return [];

    let _from = Math.min(from, to);
    let _to = Math.max(from, to);

    let out = [];
    let current = _from;

    do {
        out.push(current);
        current += diff;
    } while(current <= _to);

    return out;
};

export const timezones = range(-12,12,1).map(h => {
    return {
        value: h * 3600,
        text:
        (h < 0 ? "- " : "+ ") +
        Math.abs(h)
            .toString()
            .padStart(2, "0") +
        ":00"
    }
});

export const timeRange = (from, to, interval = 15) => {
    let _from = getMinutes(from);
    let _to = getMinutes(to);
    let _range = [toHours(_from)];
    let _diff = _from % 60 ? _from % 60 : interval;
    
    while(_from < _to) {
        _from += _diff;
        _diff = interval;

        if(_from > _to) _range.push(toHours(_to));
        else _range.push(toHours(_from));
    }

    return _range;
}

export function excludeKey(obj, key) {
    return Object.keys(obj).reduce((memo, k) => {
        if(k === key) return memo;
        return {
            ...memo,
            [k]: obj[k]
        };
    }, {});
}

export function sortByAsc(attr) {
    return (a, b) => a.duration - b.duration > 0 ? -1 : 1;
}

export function sortByDesc(attr) {
    return (a, b) => a.duration - b.duration > 0 ? 1 : -1;
}

export const deepMerge = (current, update) => {
    let c = {...current};

    for(const p in update) {
        if(update.hasOwnProperty(p)) {
            if(update[p] instanceof Array) {
                c[p] = update[p];
                continue;
            }
            if(typeof update[p] == 'object') c[p] = deepMerge(c[p] || {}, update[p]);
            else c = {
                ...c,
                [p]: update[p]
            };
        }
    }

    return c;
};
