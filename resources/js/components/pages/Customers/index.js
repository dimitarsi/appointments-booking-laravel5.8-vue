import Vue from "vue";
import List from "./List.vue";
import Edit from "./Edit.vue";
import Autocomplete from "./Autocomplete.vue";
import Pick from "./Pick.vue";

Vue.component("customers-list", List);
Vue.component("customers-edit", Edit);
Vue.component("customers-pick", Pick);
Vue.component("customer-autocomplete", Autocomplete);