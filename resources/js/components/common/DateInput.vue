<template>
  <div class="d-flex align-items-center date-input-form-control">
      <input type="date" class="form-control" :value="formatedDate" @change="changeDate($event)" />
      <i class="fa fa-clock-o mr-10 show-time-icon" v-if="showTime"></i>
      <input-select 
        :value="hours"
        :suggestions="range(minHours, maxHours, 1)"
        class="mr-2"
        :small="true"
        @change="changeTime($event)"
        v-if="showTime"
      />
      <input-select 
        :value="minutes"
        :suggestions="range(minMinutes, maxMinutes, 15)"
        :small="true"
        @change="changeMinutes($event)"
        v-if="showTime"
      />
  </div>
</template>

<script>
  import Vue from 'vue';
  import format from '../../helpers/date';
  import { range } from "../../helpers/collection";
  import InputSelect from "./InputSelect.vue";
  import padStart from "lodash/padStart";
  
  function getDate(val) {
    return typeof val === 'string' ? new Date(val) : val;
  }

  function cloneDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0);
  }

  export default Vue.extend({
    props: {
      value: [Date, String],
      from: {
        type: [String],
        default: '00:00',
      },
      to: {
        type: [String],
        default: '24:00',
      },
      showTime: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      hours() {
        const hours = getDate(this.value).getHours();
        return padStart(hours, 2, '0');
      },
      minutes() {
        const minutes = getDate(this.value).getMinutes();
        return padStart(minutes, 2, '0');
      },
      formatedDate: function() {
        return format(getDate(this.value)); // f ts
      },
      minHours() {
        const h = parseFloat(this.from.split(':')[0].replace(/^0/, ''));
        return isNaN(h) ? 0 : Math.max(h, 0);
      },
      maxHours() {
        const h = parseFloat(this.to.split(':')[0].replace(/^0/, ''));
        return isNaN(h) ? 24 : Math.min(24, h);
      },
      minMinutes() {
        const h = getDate(this.value).getHours();
        if(h == this.minHours) return parseFloat(this.from.split(':')[1].replace(/^0/, ''));
        return 0;
      },
      maxMinutes() {
        const h = getDate(this.value).getHours();
        if(this.maxHours == 24) return 0; // something like 24:30 does not make sense
        if(h == this.maxHours) return parseFloat(this.to.split(':')[1].replace(/^0/, ''));
        return 60;
      }
    },
    methods: {
      range,
      changeDate: function({ target }) {
        const d = target.value.match(/(\d\d\d\d)-(\d\d)-(\d\d)/);
        const year = parseInt(d[1]);
        const month = parseInt(d[2]);
        const days = parseInt(d[3]);

        // months start from 0 ???
        let date = new Date(year, month - 1, days, 0, 0, 0);

        if(this.showTime) {
          date.setHours(this.hours)  
          date.setMinutes(this.minutes);
        }       
        
        this.$emit('input', date);
      },
      changeTime(val) {
        let d = cloneDate(getDate(this.value));
        d.setHours(val);
        this.$emit('input', d);
      },
      changeMinutes(val) {
        let d = cloneDate(getDate(this.value));
        d.setMinutes(val);
        this.$emit('input', d);
      }
    }
  });
</script>