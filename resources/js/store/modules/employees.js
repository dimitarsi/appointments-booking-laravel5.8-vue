import { create, list, update } from "../../services/employees";
import uniq from "lodash/uniq";

function defaultState() {
    return {
        list: [],
        selected: 0,
        services: {},
        loading: false
    }
}

const mutations = {
    load(state, payload) {
        state.list = payload;
        state.services = payload.reduce((memo, empl) => {
            return {
                ...memo,
                [empl.id]: empl.services.map(s => s.id)
            }
        }, { });
    },
    select(state, payload) {
        state.selected = payload;
    }
}

const actions = {
    async create({ dispatch }, payload) {
        let data = {
            email: payload.email,
            service: payload.service,
            first_name: payload.first_name,
            last_name: payload.last_name,
            phone: payload.phone,
            allow_add: payload.allow_add,
            allow_login: payload.allow_login,
            visible: payload.visible,
        };

        if (payload.allow_login) {
            data.password = payload.password;
            data.password_confirm = payload.password_confirm;
        }

        await create(data);
        dispatch('load');
    },
    async load({ commit }) {
        const data = await list();
        commit("load", data);
    },
    async update({ state, dispatch }, payload) {

        let data = {
            service: payload.service,
            first_name: payload.first_name,
            last_name: payload.last_name,
            phone: payload.phone,
            allow_add: payload.allow_add,
            visible: payload.visible,
            password: payload.password,
            password_confirm: payload.password_confirm,
            services: payload.services
        };

        await update(payload.id, data);
        dispatch('load');
    }
}

const getters = {
    availableEmployees: state => state.list.filter(e => e.visible && !e.admin && e.unavailable == 0),
    hasService: state => (employeeId, serviceId) => {
        if (Object.keys(state.services).length = 0) return false;
        if (!state.services[employeeId]) return false;

        return state.services[employeeId].indexOf(serviceId) > -1;
    },
    suggestion: state => state.list.filter(e => e.visible).map(s => {
        return {
            value: s.id,
            text: `${s.first_name} ${s.last_name}`
        };
    }),
    suggestionWithAppointmentsCount: (state, getters, rootState, rootGetters) => state.list.filter(e => e.visible).map(s => {

        const appointments = rootGetters['calendar/indexByEmployeeId'][s.id];
        return {
            value: s.id,
            text: `${s.first_name} ${s.last_name} (${!!appointments ? appointments.length : 0})`
        };
    }),
    getById: state => id => {
        const filtered = state.list.filter(e => e.id == id);
        return filtered.length > 0 ? filtered[0] : null;
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state: defaultState(),
    getters
};