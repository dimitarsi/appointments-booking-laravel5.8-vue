import Vue from "vue";
import Vuex from "vuex";
import network from "./modules/network";
import calendar from "./modules/calendar";
import dialog from "./modules/dialog";
import preview from "./modules/preview";
import embed from "./modules/embed";
import employees from "./modules/employees";
import worktime from "./modules/worktime";
import services from "./modules/services";
import plans from "./modules/plans";
import customers from "./modules/customers";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        network,
        calendar,
        dialog,
        preview,
        embed,
        employees,
        worktime,
        services,
        plans,
        customers
    },
    actions: {
        async init({ dispatch }, payload) {
            await Promise.all([
                dispatch('calendar/setWeek', { workday: payload.workday }),
                dispatch('employees/load'),
                dispatch('worktime/load'),
                dispatch('services/load'),
                dispatch('customers/load')
            ]);

            await dispatch("calendar/loadAppointments");
        }
    }
});