import Vue from "vue";

import WeeklyAppointments from "./WeeklyAppointments.vue";
// import WidgetSettings from "./WidgetSettings.vue";
import EmbedSettings from "./EmbedSettings.vue";
import EmployeePage from "./EmployeesPage.vue";
import WorktimeSettings from "./WorktimeSettings.vue";
import ServicesPage from "./ServicesPage.vue";
import PaymentDetails from "./PaymentDetails.vue";
import Subscriptions from "./Subscriptions.vue";
import Customers from "./Customers.vue"

import Grid from "../grid/Grid.vue";

Vue.component("worktime-settings", WorktimeSettings);
Vue.component("appointments-weekly", WeeklyAppointments);
// Vue.component("widget-settings", WidgetSettings);
Vue.component("embed-settings", EmbedSettings);
Vue.component("employees-page", EmployeePage);
Vue.component('payment-details', PaymentDetails)
Vue.component('subscriptions', Subscriptions);
Vue.component("services-page", ServicesPage);

Vue.component("Customers", Customers);

Vue.component("grid", Grid);


// import Storybook from "./Storybook.vue";
// Vue.component("storybook", Storybook);