import { list, create, update, deleteService } from "../../services/services";

function defaultState() {
    return {
        list: []
    }
}

const actions = {
    async create({ dispatch }, payload) {
        await create({
            status: payload.status,
            name: payload.name,
            price: payload.price
        });

        dispatch('load');
    },
    async load({ commit }) {
        const data = await list();
        commit('load', data);
    },
    async deleteService({ dispatch }, { id }) {
        await deleteService(id);
        return dispatch('load');
    },
    async update({ dispatch }, service) {

        await update(service.id, {
            name: service.name,
            status: service.status,
            price: service.price
        });

        dispatch('load');
    }
}

const mutations = {
    load(state, payload) {
        state.list = payload;
    }
}

const getters = {
    getById: state => id => {
        const filtered = state.list.filter(s => s.id == id);
        return filtered.length ? filtered[0] : null
    },
    suggestion: state => state.list.filter(s => s.status === 'available').map(s => {
        return {
            value: s.id,
            text: s.name
        };
    }),
}

export default {
    namespaced: true,
    state: defaultState(),
    mutations,
    actions,
    getters
}