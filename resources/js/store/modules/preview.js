import { save, load } from "../../services/preview";
import defaultSettings from "./data/previewState";
import { deepMerge } from "../../helpers/collection";

function defaultState() {
    return {
        settings: defaultSettings(),
        fields: [
            { text: 'Избери поле', value: '' },
            { text: 'Служител', value: 'employee' },
            { text: 'Услуга', value: 'service' },
            { text: 'Дата', value: 'date' },
            { text: 'Емайл', value: 'email' },
            { text: 'Телефон', value: 'phone' },
            { text: 'Други въпроси', value: 'custom' }
        ]
    }
}

const setStepUuid = (s, i) => {
    if(s.uuid) return s;
    return {...s, uuid: i}
}

const actions = {
    async load({ commit }) {
        const { data } = await load();
        commit('load', {
            ...defaultSettings(),
            ...data,
            steps: data.steps.map(setStepUuid)
        });
    },
    
    async update({ commit, state, dispatch }, payload) {
        const { data } = await save({ settings: payload});
        commit('update', {
            ...data,
            steps: data.steps.map(setStepUuid)
        });
    }
};

const mutations = {
    load(state, payload) {
        state.settings = payload;
    },
    update(state, payload) {
        const settings = state.settings;
        state.settings = deepMerge(settings, payload);
    }
};

export default {
  namespaced: true,
  actions,
  mutations,
  state: defaultState()
}