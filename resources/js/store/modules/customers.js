import { list, create, update } from "../../services/customers";

function defaultState() {
    return {
        list: []
    }
}

const actions = {
    async load({ commit}) {
        const customers = await list();
        
        commit("load", { customers });
    },

    async create({ commit, dispatch }, { customer }) {
        await create(customer);
        dispatch("load");
    },

    async update({ commit }, { customer }) {
        await update(customer);
    }
}

const getters = {
    filter: state => filter => {
        if(!filter && filter.length < 3) return state.list;

        const list = state.list.filter(c => {
            const match = 
                c.name.indexOf(filter) > -1 || 
                c.email.indexOf(filter) > -1 ||
                c.phone.indexOf(filter) > -1;

            return match;
        });
        return list;
    },
    anonymous: state => state.list.filter(c => c.id == 1)[0],
    getById: (state, getters) => id => {
        const found = state.list.filter(c => c.id == id);

        if(found.length) return found[0];
        return getters['anonymous'];
    }
}

const mutations = {
    load(state, { customers }) {
        state.list = customers;
        console.log(state.list);
    }
}

export default {
    state: defaultState(),
    actions,
    mutations,
    getters,
    namespaced: true
}