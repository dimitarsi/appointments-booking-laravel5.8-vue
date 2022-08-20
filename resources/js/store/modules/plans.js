import { load, subscribe, getCurrentPlan, unsubscribe } from "../../services/plans";

function defaultState() {
    return {
        plans: [],
        current: null,
        pending_plan_id: null,
        status: 'unknown'
    }
}


const actions = {
    async load({ commit }) {
        const plans = await load();
        commit('addPlans', { plans });
    },
    async current({ commit }) {
        const current = await getCurrentPlan();
        commit('current', { plan_id: current.plan_id, pending_plan_id: current.pending_plan_id, status: current.status });
    },
    async subscribe({ commit }, payload) {
        const response = await subscribe(payload.plan_id, payload.nonce);
    },
    async unsubscribe({ commit, dispatch}) {
        await unsubscribe();
    }
};

const mutations = {
    addPlans(state, payload) {
        state.plans = state.plans.concat(payload.plans)
    },
    current(state, { plan_id, pending_plan_id, status, paid_through }) {
        state.current = plan_id;
        state.pending_plan_id = pending_plan_id;
        state.status = status;
        state.paid_through = paid_through;
    }
};

const getters = {};


export default {
    namespaced: true,
    mutations,
    actions,
    getters,
    state: defaultState()
}