import Vue from "vue";

import "./common";
import "./preview";
import "./filters";
import "./errors"

import NetworkButton from "./common/NetworkButton.vue";
// import ColorPicker from "./common/ColorPicker.vue";
import MainNavigation from "./common/navigation/Main.vue";
import SidebarNavigation from "./common/navigation/Sidebar.vue";
import AnonymouseSwitch from "./common/ToggleAnonymouse.vue";
import Braintree from "./common/Braintree.vue";
import ReloadButton from "./common/ReloadButton.vue";
import PageContainer from "./PageContainer.vue";

Vue.component('network-button', NetworkButton);
// Vue.component('color-picker', ColorPicker);
Vue.component('main-navigation', MainNavigation);
Vue.component('sidebar-navigation', SidebarNavigation);

Vue.component('toggle-anonymouse', AnonymouseSwitch);
Vue.component('braintree-form', Braintree);
Vue.component('reload-button', ReloadButton);

Vue.component('page-container', PageContainer);