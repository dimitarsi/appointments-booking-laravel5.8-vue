import { save, load } from "../../services/embed";
import omit from "lodash/omit";

function defaultState() {
    return {
        params: {
            embed_type: 3,
            token_url: '',
            create_hook: '',
            cancel_hook: '',
            hook_authorization: '',
            hook_params: '',
            domain: '',
            tz_offset: 7200,
            secret: '',
            embed_code: ''
        }
    }
}

const actions = {
    async load({commit, state}) {
        const { data } = await load();       
        commit('load', { ...state.params, ...data });
    },
    async save({ commit, state }) {
        await save(omit(state.params, ['embed_code', 'secret', 'id']));
    }
}

const mutations = {
    update(state, field) {
        state.params = {
            ...state.params,
            ...field
        };
    },
    load(state, payload) {
        state.params = payload;
    }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state: defaultState()
}