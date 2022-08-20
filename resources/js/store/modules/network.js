import { excludeKey } from "../../helpers/collection";

function networkState() {
    return {
        pipes: {
            create: {
                status: "done"
            },
            edit: {
                status: "done"
            },
            services: {
                status: "done"
            },
            employee: {
                status: "done"
            },
            settings: {
                status: "done"
            }
        },
        pending: {

        },
        errors: {

        }
    }
};

const actions = {
    load({ commit, state}, pipe) {
        commit("pipeState", {
            pipe,
            status: "loading"
        });
    },

    done({ commit, state}, pipe) {
        commit("pipeState", {
            pipe,
            status: "done"
        });
    },
}

const mutations = {
    pipeState(state, payload) {
        state.pipes[payload.pipe] = {
            status: payload.status
        };
    },
    addPending(state, payload) {
        const current = state.pending[payload.namespace] || [];

        state.pending = {
            ...state.pending,
            [payload.namespace]: [...current, payload]
        }
    },
    removePending(state, payload) {
        if(state.pending[payload.namespace] === undefined) return; //nothing to remove
        state.pending = excludeKey(state.pending, payload.namespace);
    },
    addError(state, payload) {
        const current = state.errors[payload.namespace] || [];

        state.errors = {
            ...state.errors,
            [payload.namespace]: [...current, {
                ...payload,
                seen: 0
            }]
        }
    },

}

const networkModule =  {
    namespaced: true,
    state: networkState(),
    mutations,
    getters: {
        isDisabled: state => pipe => !state.pipes[pipe] ? false : state.pipes[pipe].status === 'disabled',
        isLoading: state => pipe => !state.pipes[pipe] ? false : state.pipes[pipe].status === 'loading',
        isNamespaceActive: state => namespace => {
            return !!state.pending[namespace];
        },
        namespaceErrors: state => namespace => (state.errors[namespace] || []).filter(e => e.seen == 0)
    },
    actions
}

export default networkModule;