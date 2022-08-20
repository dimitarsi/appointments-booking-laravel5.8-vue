import Vue from "vue";
import List from "./List.vue"
import Edit from "./Edit.vue";
import Pick from "./Pick.vue";

Vue.component("employee-list", List);
Vue.component("employee-edit", Edit);
Vue.component("employee-pick", Pick);