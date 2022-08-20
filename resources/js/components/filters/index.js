import Vue from "vue";

import SidebarFilter from "./SidebarFilter.vue";
import FilterByEmployee from "./FilterByEmployee.vue";
import FilterByConfirmed from "./FilterByConfirmed.vue";
import SidebarFilterBadge from "./SidebarFilterBadge.vue";

Vue.component('sidebar-filter', SidebarFilter);
Vue.component('filter-by-employee', FilterByEmployee);
Vue.component('sidebar-filter-badge', SidebarFilterBadge);
Vue.component('filter-by-confirmed', FilterByConfirmed);