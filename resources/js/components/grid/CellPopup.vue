<template>
    <div
        class="cell-popup p-15" 
        :class="{[`index-${index}`]: true}"
        :style="{top}"
        @click.stop
    >   
        <a href="#" @click.stop="hidePopup" class="close">
            <i class="fa fa-close"></i>
        </a>

        <template v-if="!editNotes">
            <popup-fields 
                @editNotes="editNotes=true"
                @submit="handleSubmit"
                @cancel="hidePopup">
            </popup-fields>
        </template>
        <popup-notes v-else
            @cancel="editNotes=!editNotes">
        </popup-notes>
    </div>
</template>

<script>
    import PopupNotes from "./CellPopupNotes.vue";
    import PopupFields from "./CellPopupFields.vue";
    import Appointment from "../models/Appointment";

    export default {
        props: ['index'],
        data() {
            return {
                top: 0,
                sid: 0,
                editNotes: false
            }
        },
        components: {
            'popup-fields': PopupFields,
            'popup-notes': PopupNotes
        },
        mounted() {
            this.top = this.getTop();
            window.addEventListener('resize', event => {
                this.top = this.getTop();
            });
        },
        methods: {
            getTop() {
                const bbox = this.$el.getBoundingClientRect();
                const offset = (window.innerHeight - (bbox.y + bbox.height) - 20);

                return Math.min(0, offset) + 'px';
            },
            hidePopup() {
                this.$store.commit('dialog/hidePopup');
            },
            handleSubmit() {
                this.$store.dispatch('dialog/create');
            }
        }
    }
</script>

<style lang="css">
    .cell-popup {
        position: absolute;
        right: 100%;
        margin-right: 15px;
        width: 350px;
        background: #fff;
        box-shadow: 0px 3px 10px rgba(90,90,90, .1);
    }
    .cell-popup.index-0 {
        right: -350px;
        margin-right: -45px;
    }
</style>