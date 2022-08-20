import Vue from "vue";

import "./router";
import Router from "./Router.vue";
import RouterLink from "./RouterLink.vue";

import Home from "../routes/Home.vue";
import Appointment from "../routes/Appointment.vue";
import AppointmentsList from "../routes/AppointmentsList.vue";
import ServiceProvider from "../routes/ServiceProvider.vue";
import Dashboard from "../routes/Dashboard.vue";
import Login from "../routes/Login.vue";

Vue.component('home', Home);
Vue.component('service-provider', ServiceProvider);
Vue.component('appointment-form', Appointment);
Vue.component('appointments-list', AppointmentsList);
Vue.component('dashboard', Dashboard);


Vue.component('router-view', Router);
Vue.component('router-link', RouterLink);

Vue.component('login', Login);