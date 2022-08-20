<template>
  <div class="px-15">
    <div class="subpage-title space-between">
      <a href="#" class="back-link" @click.prevent="handleBack">
        <i class="fa fa-angle-left"></i>
        Служители
      </a>
      <button @click.prevent="createNew" class="btn-sm" v-if="!hasSelected">
        <i class="fa fa-plus"></i>
      </button>
      <button @click.prevent="handleDelete" class="btn-sm btn-dissabled" v-else>
        <i class="fa fa-trash"></i>
      </button>
    </div>

    <employee-edit
      v-if="hasSelected"
      :employee="state.selectedEmployee"
      @save="handleSave"
      @cancel="handleListSelect(null)"
    />
    <template v-else>
        <employee-pick v-if="state.pick" :employees="filteredList" @select="handlePick" />
        <employee-list v-else :employees="list" @select="handleListSelect" @delete="handleDelete" />
    </template>
    
  </div>
</template>

<script>
import "./Employees";
import { mapState } from "vuex";
import Employee from "../models/Employee";

export default {
    data() {
        return {
            state: {
                selectedEmployee: null,
                pick: false,
                filter: false
            }
        };
    },
    created() {
        window.addEventListener('hashchange', e => {
            this.checkHash();
        });
        this.checkHash();
    },
    mounted() {
        if(this.$store.state['employees'].list.length == 0) {
            this.$store.dispatch('employees/load');
        }
    },
    computed: {
        ...mapState("employees", {
            list: "list"
        }),
        hasSelected() {
            return this.state.selectedEmployee != null;
        },
        filteredList() {
            const { filter } = this.state;
            if(!filter) return this.list;
            
            return this.list.filter(employee => {
                return employee.services.map(s => s.id).indexOf(filter) > -1;
            })
        }
    },
    methods: {
        checkHash() {
            const res = location.hash.match(/\?id=(\d+)/);
            const createNew = location.hash.match(/(\&|\?)new/);
            const pick = location.hash.match(/(\&|\?)pick/);

            this.state.pick = !!pick;

            if (res && res[1]) {
                this.state.selectedEmployee = this.$store.getters["employees/getById"](res[1]);
            }

            if (createNew && createNew.length) {
                this.state.selectedEmployee = new Employee();
                this.state.dialog = this.$store.getters["dialog/visible"];
            }
        },
        handleListSelect(employee) {
            this.state.selectedEmployee = employee;
        },
        handleDelete(employee) {
            this.$store.dispatch("employees/delete", this.state.selectedEmployee);
        },
        async handleSave({ employee, services }) {
            if (employee.id) {
                await this.$store.dispatch("employees/update", {...employee, services });
            } else {
                await this.$store.dispatch("employees/create", {...employee, services });
            }
            // this.$store.dispatch("employees/load");
            this.handleListSelect(null);
        },
        createNew() {
            this.state.selectedEmployee = new Employee();
        },
        handlePick(employee) {
            this.$store.commit('dialog/updateAppointment', { employee_id: employee.id });
        },
        handleBack() {
            if(this.state.selectedEmployee) {
                this.state.selectedEmployee = null;
            } else {
                window.history.go(-1);
            }
        }
    }
};
</script>