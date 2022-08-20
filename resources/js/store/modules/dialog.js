import { update, create, invite as sendInvite, sendConfirm, deleteAppointment} from "../../services/appointments";

function defaultParams() {
    return {
        date: null,
        duration: 0,
        notes: '',
        appointment: null
    };
}

function defaultState() {
    return {
        pickCustomer: false,
        dialog: {
            visible: false,
            row: -1,
            col: -1,
            appointment: null
        },
        // dialogs: {
        //     'edit': {
        //         visible: false,
        //         params: defaultParams()
        //     },
        //     'create': {
        //         visible: false,
        //         params: defaultParams()
        //     },
        //     'suggestions': {
        //         visible: false,
        //         params: []
        //     }
        // }
    }
}

const actions = {
    dialog({ commit, state}, { row, col, appointment }) {
        commit('dialog', { row, col, appointment });
    },
    async show({ commit, state}, { name }) {
        if(name === 'suggestions') {
            const { data } = await axios.get("/appointments/suggest");
            commit('show', {
                name,
                params: data
            });
        }
    },
    async create({ commit, state, dispatch}) {
        const { id, duration, employee_id, service_id, date, notes, customer_id } = state.dialog.appointment;

        if(id != -1) {
            dispatch('editSave');
            return;
        }

        dispatch('network/load', 'create', { root: true});

        try {
            const appointment = await create({ 
                duration,
                employee_id,
                service_id,
                date,
                notes,
                customer_id 
            });

            dispatch('sendConfirm', {appointment_id: appointment.id});
            await dispatch('calendar/loadAppointments', null, { root: true });
        } catch(exp) {
            // just catch the exception
            throw exp;
        }

        dispatch('network/done', 'create', { root: true});
        commit('hidePopup');
    },
    async editSave({ commit, state, dispatch, rootGetters }) {

        const { id, duration, employee_id, service_id, date, notes, customer_id } = state.dialog.appointment;

        // const { id } = dialogs.edit.params.appointment;
        // const { duration, employees } = payload;
        // const { date, invite, email, notes, appointment: { service_id } } = dialogs.edit.params;

        const customer = rootGetters['customers/getById'](customer_id);
        
        try {
            await update(id, { duration, date, notes, service_id, employee_id });
            
            if(customer.email) {
                sendInvite(id, { email: customer.email });
            }

            await dispatch('calendar/loadAppointments', null, { root: true });

            commit('hidePopup');
        } catch(exp) {
            // continue
        }        
    },
    async sendConfirm(store, payload) {
        await sendConfirm(payload.appointment_id);
    },
    async delete({ dispatch, commit}, payload) {
        const appointment = payload;

        const complete = () => {
            commit('hide');
            dispatch('calendar/loadAppointments', null, { root: true });
        }
        try {
            deleteAppointment(appointment).done(complete, complete);
        } catch(exp) {
            complete();
        }
    }
}

const mutations = {
    dialog(state, { row, col, appointment}) {
        state.dialog = {
            visible: true,
            row,
            col,
            appointment
        }
    },
    hidePopup(state) {
        state.dialog = {
            visible: false,
            row: -1,
            col: -1,
            appointment: null
        };
    },
    pickCustomer(state) {
        state.pick = true;
    },
    show(state, { name, params }) {
        Object.keys(state.dialogs).forEach((dialog) => {
            state.dialogs[dialog].visible = false;
        });
        
        state.dialogs[name].params = params;        
        state.dialogs[name].visible = true;
    },
    hide(state) {
        Object.keys(state.dialogs).forEach((dialog) => {
            state.dialogs[dialog].visible = false;
        });
    },
    updateAppointment(state, payload) {
        const { dialog: { appointment } } = state;

        state.dialog.appointment = {
            ...appointment,
            ...payload
        };

    }
}

const getters = {
    appointment: state => {
        if(state.dialog.visible) return state.dialog.appointment;
        return null;
    },
    customer: (state, getters, rootState, rootGetters) => {
        if(state.dialog.visible) return rootGetters['customers/getById'](state.dialog.appointment.customer_id)
        return rootGetters['customers/anonymous'];
    },
    popup: state => (row, col) => {
        return state.dialog.row == row && state.dialog.col == col && state.dialog.visible;
    },
    // appointmentService({ dialogs }) {
    //     if(dialogs.edit.visible == false) return null;
    //     if(!dialogs.edit.params.appointment) return null;
    //     return dialogs.edit.params.appointment.service_id;
    // },
    params: ({ dialogs }, getters, rootState, rootGetters) => dialog => {
        const params = dialogs[dialog].params;

        if(!params.appointment) return params;

        if(dialog === 'edit' && typeof params.durationType === 'undefined') {
            const service = rootGetters['services/getById'](params.appointment.service_id);
            
            return Object.assign({}, params, {
                durationType: (service && params.duration === ( service.duration || '')) ? 0 : 1
            });
        }

        return params;
    }
}

export default {
    namespaced: true,
    state: defaultState(),
    getters,
    mutations,
    actions
}