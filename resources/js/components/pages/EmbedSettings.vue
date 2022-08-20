<template>
    <div class="h-100 w-100">
        <div class="top-toolbar p-15 shadow-underline">Настойки за вграждане</div>
        <form @submit.prevent="handleSubmit" class="p-15">
            <div class="row">
                <div class="col">
                <div>Разрешен домейн</div>
                <div>
                    https://
                    <text-input v-model="domain" />
                </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                <div>Начин на вграждане</div>
                <div>
                    <select v-model="embed_type" class="form-control">
                    <option
                        v-for="option in options"
                        :key="option.val"
                        :value="option.val"
                    >{{ option.text }}</option>
                    </select>
                </div>
                </div>
            </div>
            <template v-if="embed_type == 1 || embed_type == 4">
                <div class="row" v-if="embed.embedCode">
                    <div class="col">
                        Код за вграждане
                        <code class="w-50">{{ embed.embedCode }}</code>
                    </div>
                </div>
                <div class="row" v-if="embed.secret">
                    <div class="col">
                        Код за достъп
                        <code class="w-50">{{ embed.secret }}</code>
                    </div>
                </div>
                <div class="row" v-if="embed_type == 4">
                    <div class="col">
                        Token URL
                        <text-input v-model="token_url" />
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col">
                        Инсталирайте
                        <a href="#">нашия Wordpress Plugin</a>
                    </div>
                </div>
            </template>
            <template v-if="embed_type == 2">
                <div class="row">
                <div class="col">
                    <code>{{ '&lt;iframe src="http://some/embed/url"&gt;&lt;/iframe&gt;' }}</code>
                </div>
                </div>
            </template>

            <template v-if="embed_type == 3">
                <div class="row">
                <div class="col">
                    <code>{{ 'http://some/embed/url' }}</code>
                </div>
                </div>
            </template>

            <div class="row">
                <div class="col">Часова зона:</div>
                <div class="col">
                    <input-select
                        :suggestions="timezones"
                        v-model="tz_offset"
                    />
                </div>
            </div>

            <div class="row">
                <div class="col" title="Not implemented">* Web Hooks</div>
            </div>
            <div class="row">
                <div class="col">
                    Create
                    <text-input v-model="create_hook" title="Not implemented" />
                </div>
                <div class="col">
                    <div class="col">
                        Cancel
                        <text-input v-model="cancel_hook" title="Not implemented" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    Hook Authorization
                    <text-input v-model="hook_authorization" title="Not implemented" />
                </div>
                <div class="col">
                    <div class="col">
                        Hook Authorization Params
                        <text-input v-model="hook_params" title="Not implemented" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <network-button namespace="embed.update">Запази</network-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { timezones } from "../../helpers/collection";

const options = ["Wordpress", "IFrame", "Link", "Advanced"].map((w,i) => { return {val: i+1, text: w}});

export default {
    created() {
        this.load();
    },
    methods: {
        async handleSubmit() {
            await this.$store.dispatch("embed/save");
            this.load();
        },
        async load() {
            await this.$store.dispatch("embed/load");
        }
    },
    computed: {
        ...mapState('embed', { embed: state => state.params }),
        domain: {
            get() { return this.embed.domain },
            set(value) { 
                console.log(value);
                this.$store.commit('embed/update', { domain: value })
            }
        },
        hook_params: {
            get() { return this.embed.hook_params },
            set(value) { this.$store.commit('embed/update', { hook_params: value })}
        },
        hook_authorization: {
            get() { return this.embed.hook_authorization },
            set(value) { this.$store.commit('embed/update', { hook_authorization: value })}
        },
        cancel_hook: {
            get() { return this.embed.cancel_hook },
            set(value) { this.$store.commit('embed/update', { cancel_hook: value })}
        },
        create_hook: {
            get() { return this.embed.create_hook },
            set(value) { this.$store.commit('embed/update', { create_hook: value })}
        },
        tz_offset: {
            get() { return this.embed.tz_offset },
            set(value) { this.$store.commit('embed/update', { tz_offset: value })}
        },
        embed_type: {
            get() { return this.embed.embed_type },
            set(value) { this.$store.commit('embed/update', { embed_type: value })}
        },
        url_token: {
            get() { return this.embed.url_token },
            set(value) { this.$store.commit('embed/update', { url_token: value })}
        },
        timezones: () => timezones,
        options: () => options
    }
};
</script>
