<template>
  <div class="px-15">

    <div class="subpage-title">
        <a href="#" class="back-link" @click.prevent="handleBack">
            <i class="fa fa-angle-left"></i>
            Визуализация
        </a>
    </div>

    <form @submit.prevent="saveWidgetSettings">
        
        <div class="hr mb-5">
            <div class="fz-16 mb-5">Цветове</div>
            <div class="d-flex mb-15">
                <color-input title="Фон" v-model="settings.bgcolor" />
                <color-input title="Акцент" v-model="settings.fgcolor" class="mx-15" />
                <color-input title="Текст" v-model="settings.text" />
            </div>
            <a href="/dashboard/preview">
                <i class="fa fa-eye mr-5"></i>
                Преглед
            </a>
        </div>
        <div class="hr">
            <div class="fz-16">Позиция</div>
            <input-select 
                :suggestions="suggestions.positions"
                v-model="settings.position"
                class="tx--8 zi-1"
            />
        </div>       

        <div class="d-flex space-between">
            <a href="#" class="btn-cancel">Откажи</a>
            <network-button namespace="settings">Запази</network-button>
        </div>
    </form>

  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { mapState } from "vuex";

// const acceptJson = { headers: { Accept: "application/json" } };
// const icons = [
//   "noun_booking_907087.svg",
//   "noun_reminder_1195055.svg",
//   "noun_Haircut_660382.svg",
//   "noun_service_2212630.svg"
// ];
// const colorPresets = [
//   { name: "Зелен", bgcolor: "#00FF5A", fgcolor: "#fff" },
//   { name: "Оранжев", bgcolor: "#FFA400", fgcolor: "#fff" },
//   { name: "Син", bgcolor: "#515AFF", fgcolor: "#fff" },
//   { name: "Избери", bgcolor: "", fgcolor: "" }
// ];
// const secondaryColorPresets = [
//   { name: "Зелен", bgcolor: "#B4E662", fgcolor: "#fff" },
//   { name: "Оранжев", bgcolor: "#FFE48A", fgcolor: "#fff" },
//   { name: "Син", bgcolor: "#B99EFF", fgcolor: "#fff" },
//   { name: "Избери", bgcolor: "", fgcolor: "" }
// ];

const positions = [
    {text: "долу ляво", value: "bottom-left" },
    {text: "долу дясно", value: "bottom-right" },
    {text: "долу среда", value: "bottom-middle" },
    {text: "линк", value: "link" }
];

export default {
    data() {
        return {
        suggestions: {
            positions
        }
        }  
    },
    async mounted() {
        this.$store.dispatch('widgets/load');
    },
    computed: {
        ...mapState('widgets', ['settings'])
    },
    methods: {
        saveWidgetSettings() {
            this.$store.dispatch('widgets/save');
        },
        handleBack() {
            window.history.go(-1);
        }
    }
};
</script>
