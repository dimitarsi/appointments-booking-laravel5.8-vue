import { week, cloneDate } from "../../helpers/date";
import { searchParams } from "../../helpers/url";
import { isSameDay } from "date-fns";
import { load as loadAppointments, deleteAppointment } from "../../services/appointments";
// import { load as loadSettings } from "../../services/settings";
// import  settings from "./settings";
// import groupBy from "lodash/groupBy";
// import { getMinutes } from "../../helpers/date";

function defaultFilter() {
    return {
        employeeId: '',
        confirmed: 'all'
    };
}

function defaultState() {
    //const w = (location.search.match(/(\?|\&)week=(\d+)/) || [0, null, null])[2];
    return {
        selected: null,
        appointments: [],
        week: null,
        workday: null,// week(parseFloat(w))
        filter: defaultFilter(),
        today: new Date()
    }
}

// function timeBetween(date, range) {
//     const hour = Math.floor(getMinutes(range) / 60);
//     return date.getHours() === hour;
// }

const getters = {
    appointmentsByDay: state => day => {
        return [...state.appointments].filter(a => {
            return isSameDay(a.date, day);
        });
    },
    appointments: state => {
        return [...state.appointments];
    },
    days: state => {
        const days = state.week ? state.week.days() : [];
        return days;
    },
    passed: (state, getters) => {
        const days = getters.days;
        return days.reduce((memo, day) => {
            return {
                ...memo,
                [day]: getters.isPassed(day)
            }
        }, {});
    },
    // appointmentsByDayAndHour: (state) => (day, hour) => {
    //     return state.appointments.filter(a => {
    //         return isSameDay(a.date, day) && timeBetween(a.date, hour);// a.date.getHours() == hour
    //     });
    // }
    isPassed: state => date => {
        const today = cloneDate(state.today);
        const checkDate = cloneDate(date);

        return today.getTime() - checkDate.getTime() > 0 ? true : false;
    },
    filterByEmployee: state => {
        if(!state.filter.employeeId && state.filter.confirmed == 'all') return state.appointments;
        const { employeeId, confirmed } = state.filter;

        return state.appointments.filter(a => {
            // const hasEmployee = a.employeeId.indexOf(employeeId) > -1);
            return (employeeId == '' || a.employeeId.indexOf(employeeId) > -1) && (confirmed == 'all' || a.confirmed == confirmed);
        });
    },
    dataByDays: (state, getters) => {
        const byDate = getters.filterByEmployee.reduce((memo, d) => {
            const day = cloneDate(d.date);
            const date = (memo[day] || [])
            date.push(d);

            return {
                ...memo,
                [day]: date
            };

        }, {});
    
        return byDate;
    },
    hasFilter: state => !!state.filter.employeeId,
    indexByEmployeeId: (state, getters, rootState) => {
        const allEmployees = rootState['employees'].list.reduce((memo, e) => {
            return {
                ...memo,
                [e.id]: []
            }
        }, {});
        
        return state.appointments.reduce((memo, apt) => {
            const eId = apt.employee_id;
            return {
                ...memo,
                [eId]: [...memo[eId], apt]
            }
        }, allEmployees);

        // return state.appointments.reduce((memo, app) => {
            
        //     if(app.employeeId.length == 0) return memo;

        //     const byEmployeeId = app.employeeId.reduce((innerMemo, id) => {
        //         const prev = memo[id];
        //         return {
        //             ...innerMemo,
        //             [id]: !!prev ? [...prev, app] : [ app ]
        //         };
        //     }, {});

        //     return {
        //         ...memo,
        //         ...byEmployeeId
        //     }
        // }, {});
    }
}

const actions =  {
    async setWeek({ commit, state }, { workday }){
        let w = null;
        const params = searchParams();

        if(params['week']) {
            w = week(parseFloat(params['week']));
        } else {
            w = week(new Date(workday));
        }
        
        commit('changeWeek', w);
        commit('workday', workday);
    },
    
    async loadAppointments({ commit, state }) {
        commit('changeAppointments', await loadAppointments(state.week));
    },

    async currentWeek({ commit, state }) {
        const w = week(new Date(state.workday));
        commit('changeWeek', w);
        history.pushState(null, document.title, location.protocol + "//" + location.host + location.pathname);
        const appts = await loadAppointments(w);
        commit('changeAppointments', appts);
    },

    async nextWeek({ commit, state}) {
        const week = state.week.nextWeek();
        //location.href = location.protocol + "//" + location.host + location.pathname + "?week="+week.start.getTime();
        commit('changeWeek', week);
        history.pushState(null, document.title, location.protocol + "//" + location.host + location.pathname + "?week="+week.start.getTime());
        const appts = await loadAppointments(week);
        commit('changeAppointments', appts);
    },
    async prevWeek({ commit, state}) {
        const week = state.week.previousWeek();
        //location.href = location.protocol + "//" + location.host + location.pathname + "?week="+week.start.getTime();
        history.pushState(null, document.title, location.protocol + "//" + location.host + location.pathname + "?week="+week.start.getTime());
        commit('changeWeek', week);
        const appts = await loadAppointments(week);
        commit('changeAppointments', appts);
    },
    async approve({ commit, state }, payload) {
        await appointmentsService.update({
            id: payload.appointment.id,
            approved: 1
        });
        commit('approve', { id: payload.appointment.id });
    },

    async deleteAppointment({ commit, state, dispatch }, payload) {
        await deleteAppointment(payload.appointment);
        return dispatch('loadAppointments');
    },

    // async editAppointment({ commit, state }, payload) {
    //     console.log(payload)
    // }
    // dragStart({ commit, state }, appointment) {
        
    // },
    // dragEnd({ commit, state}, appointment) {

    // }
}

const mutations = {
    workday(state, workday) {
        state.workday = workday;
    },
    changeWeek(state, week) {
        state.week = week;
    },
    changeAppointments(state, payload) {
        state.appointments = payload;
    },
    approve(state, payload) {
        state.appointments.forEach(appt => {
            if( appt.id == payload.id) appt.approved = true;
        });
    },
    setFilter(state, payload) {
        const filter = {
            ...state.filter,
            ...payload
        };

        Object.keys(filter).forEach((k,i) => {
            state.filter[k] = filter[k];
        });
    },
    clearFilter(state, payload) {
        state.filter = defaultFilter();
    }
}



export default {
    namespaced: true,
    state: defaultState(),
    getters,
    actions,
    mutations,
    // modules: {
    //     settings
    // }
}