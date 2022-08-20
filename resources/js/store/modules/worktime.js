import { load, update } from "../../services/worktime";
import { addHours, getMinutes } from "../../helpers/date";
import { timeRange } from "../../helpers/collection";
import { last } from "lodash";

function toInt(field) {
    return parseFloat(field.replace(':', ''));
}

function sortByTime(wt1, wt2) {
    return toInt(wt1.from) - toInt(wt2.from) > 0 ? -1 : 1;
}

function sortByFrom(wt1, wt2) {
    return toInt(wt1.from) - toInt(wt2.from) > 0 ? 1 : -1;
}
function sortByTo(wt1, wt2) {
    return toInt(wt1.to) - toInt(wt2.to) > 0 ? -1 : 1;
}

function defaultState()
{
    return {
        worktime: [],
        days: [1,2,3,4,5,6,0] // start from Monday
    }
}

const actions = {
    async load({state, commit}, payload) {
        const data = await load();
        commit('setWorktime', data);
    },

    async save({ state }) {
        await update({worktime: state.worktime});
        actions.load();
    }
}

const mutations = {
    setWorktime(state, payload) {
        state.worktime = payload;
    },
    addWorktime(state, payload) {

        const worktimeOther = state.worktime.filter(wt => wt.day == payload.day).sort((wt1, wt2) => toInt(wt1.from) - toInt(wt2.from));
        const lastFrom = worktimeOther.length ? addHours(worktimeOther[worktimeOther.length - 1].to, '01:00') : '9:00';
        const lastTo = addHours(lastFrom, '04:00');

        state.worktime = [...state.worktime, {
            id: `_${state.worktime.length}`,
            day: payload.day,
            from: lastFrom,
            to: lastTo,
            workday: true
        }]
    },
    remove(state, payload) {
        const { id } = payload;
        state.worktime = state.worktime.reduce((memo, wt) => {
        if(wt.id == id) return memo;
        return [...memo, wt];
        }, [])
    },
    removeAllWorktime(state, payload) {
        state.worktime = state.worktime.filter(wt => wt.day != payload.day);
    },
    update(state, payload) {
        const { original, change } = payload;
        state.worktime = state.worktime.reduce((memo, wt) => {
            if(original.id === wt.id) {
                return [...memo, change];
            }
            return [...memo, wt];
        }, []);
    }
    }

    const getters = {
    dayWorktime: state => day => state.worktime.filter(wt => wt.day == day).sort(sortByTime),
    weekWorktime: state => {
        if(!state.worktime.length) return { from: 0, to: 0 };

        // const times = [...state.worktime].sort(sortByTime);
        // console.log(times);
        // console.log([
        //     Math.min.apply(Math, state.worktime.map(t => toInt(t.from))),
        //     Math.max.apply(Math, state.worktime.map(t => toInt(t.to)))
        // ]);
        const start = state.worktime.sort(sortByFrom)[0].from;
        const end = state.worktime.sort(sortByTo)[0].to;

        console.log(start);
        console.log(end);

        return {
            from: start,
            to: end
        };
    },
    // hours: state => {
    //     console.log([...state.worktime].sort(sortByTime));
    //     return [...state.worktime].sort(sortByTime)
    // },
    absoluteMinutes: state => {
        if(!state.worktime.length) return { from: 0, to: 0 };

        const times = [...state.worktime].sort(sortByTime);
        return {
            from: getMinutes(times[0].from),
            to: getMinutes(last(times).to)
        };
    },
    // hoursRanges: state => day => {    
    //     const absoluteHours = [...state.worktime].sort(sortByTime);

    //     console.log(absoluteHours);

    //     if(!absoluteHours.length) {
    //         return [{
    //             from: "09:00",
    //             to: "18:00",
    //             workday: false
    //         }];
    //     }

    //     const realStartOfDay = absoluteHours[0];
    //     const realEndOfDay = last(absoluteHours);

    //     const timeinterval = state.worktime.filter(wt => wt.day == day).sort(sortByTime);
    //     const _workIntervals = [];

    //     if(!timeinterval.length) {
    //         return [{
    //             from: absoluteHours[0].from,
    //             to: last(absoluteHours).to,
    //             workday: false
    //         }];
    //     }

    //     if(realStartOfDay.from != timeinterval[0].from) {
    //         _workIntervals.push({
    //             workday: false,
    //             from: realStartOfDay.from,
    //             to: timeinterval[0].from
    //         });
    //     }

    //     timeinterval.forEach((interval, index) => {
    //         _workIntervals.push(interval);

    //         if(index + 1 >= timeinterval.length) return;
    //         const next = timeinterval[index+1];
    //         _workIntervals.push({
    //             workday: false,
    //             from: interval.to,
    //             to: next.from
    //         });
    //     });

    //     if(last(timeinterval).to != realEndOfDay.to) {
    //         _workIntervals.push({
    //             workday: false,
    //             from: last(timeinterval).to,
    //             to: realEndOfDay.to
    //         })
    //     }
    //     return _workIntervals;    
    // }
}


export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state: defaultState()
}