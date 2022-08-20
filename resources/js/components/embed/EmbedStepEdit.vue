<template>
    <div>
        <div class="kl-container-outer">
            <div class="kl-container-head d-flex">
                <div class="w-100">{{ labels.title }}</div>
                <a href="#" @click.prevent="$emit('label', `title`)" class="a-fa-pencil">
                    <i class="fa fa-pencil"></i>
                </a>
            </div>
            <div class="kl-container-body">
            
                <div class="kl-field-row d-flex">
                    <div class="w-100">{{ labels[`title-${index}`]  || `[Кратък текст към стъпка ${index+1}]` }}</div>
                    <a href="#" @click.prevent="$emit('label', `title-${index}`)" class="a-fa-pencil">
                        <i class="fa fa-pencil"></i>
                    </a>
                </div>
                <div class="kl-field-row" v-if="step.description">{{ step.description }}</div>

                <template v-for="(field,i) in step.fields">

                    <template v-if="field == 'date'">
                        <div :key="`${field}-${i}-services`" class="kl-field-row">
                            <div class="d-flex">
                                <div class="w-100">{{ labels.date }}</div>
                                <a href="#" @click.prevent="$emit('label', 'date')" class="a-fa-pencil">
                                    <i class="fa fa-pencil"></i>
                                </a>
                            </div>
                            <input type="date" />
                            <a href="#" @click.prevent="remove('date')" class="kl-field-row-trash">
                                <i class="fa fa-trash"></i>
                            </a>
                        </div>
                    </template>

                    <template v-if="field == 'service'">
                        <div :key="`${field}-${i}-services`" class="kl-field-row">
                            <div class="d-flex">
                                <div class="w-100">{{ labels.service }}</div>
                                <a href="#" @click.prevent="$emit('label', 'service')" class="a-fa-pencil">
                                    <i class="fa fa-pencil"></i>
                                </a>
                            </div>
                            <input-select :suggestions="service" />
                            <a href="#" @click.prevent="remove('service')" class="kl-field-row-trash">
                                <i class="fa fa-trash"></i>
                            </a>
                        </div>
                    </template>

                    <template v-if="field == 'employee'">
                        <div :key="`${field}-${i}-employee`" class="kl-field-row">
                            <div class="d-flex">
                                <div class="w-100">{{ labels.employee }}</div>
                                <a href="#" @click.prevent="$emit('label', 'employee')" class="a-fa-pencil">
                                    <i class="fa fa-pencil"></i>
                                </a>
                            </div>
                            <input-select :suggestions="employee" />
                            <a href="#" @click.prevent="remove('employee')" class="kl-field-row-trash">
                                <i class="fa fa-trash"></i>
                            </a>
                        </div>
                    </template>

                    <template v-if="field == 'phone'">
                        <div :key="`${field}-${i}-phone`" class="kl-field-row">
                            <div class="d-flex">
                               <div class='w-100'>{{ labels.phone }}</div>
                                <a href="#" @click.prevent="$emit('label', 'phone')" class="a-fa-pencil">
                                    <i class="fa fa-pencil"></i>
                                </a> 
                            </div>
                            <text-input />
                            <a href="#" @click.prevent="remove('phone')" class="kl-field-row-trash">
                                <i class="fa fa-trash"></i>
                            </a>
                        </div>
                    </template>

                    <template v-if="field == 'email'">
                        <div :key="`${field}-${i}-email`" class="kl-field-row">
                            <div class="d-flex">
                                <div class='w-100'>{{ labels.email }}</div>
                                <a href="#" @click.prevent="$emit('label', 'email')" class="a-fa-pencil">
                                    <i class="fa fa-pencil"></i>
                                </a> 
                            </div>
                            <text-input />
                            <a href="#" @click.prevent="remove('email')" class="kl-field-row-trash">
                                <i class="fa fa-trash"></i>
                            </a>
                        </div>
                    </template>

                    <div v-if="field == 'custom'" :key="`${field}-${i}-custom`">
                        <div v-for="(q,i) in step.questions" :key="`q-${i}`" class="kl-field-row">
                            <label>
                                <span>{{ q.text }} <i class="fa fa-pencil"></i></span>
                                <text-input
                                    :value="q.text"
                                    @input="handleContentChange($event, { question: q, index: i })"
                                />
                            </label>
                        </div>

                        <div class="d-flex space-between ">
                            <div>
                                <a href="#" @click.prevent="remove('custom')">
                                    <i class="fa fa-icon"></i>
                                </a>
                            </div>
                        </div>


                        <div class="kl-field-row">
                            <a href='#' @click.prevent="addQuestion" :key="`${field}-custom`">
                                <i class="fa fa-plus"></i> Добави дръг въпрос
                            </a>
                        </div>
                    </div>
                </template>
                <div class="kl-field-row-send">
                    <button class="btn" v-show="index != 0" :class="{clicked: clicked['backward'] }"  @click.prevent="btnClick('backward')">
                        {{ labels.backward }}
                        <a href="#" @click.prevent="$emit('label', 'backward')"  class="a-fa-pencil">
                            <i class="fa fa-pencil"></i>
                        </a>
                    </button>
                    <button v-show="!last" class="btn" :class="{clicked: clicked['forward'] }" @click.prevent="btnClick('forward')">
                        {{ labels.forward }}
                        <a href="#" @click.prevent="$emit('label', 'forward')"  class="a-fa-pencil">
                            <i class="fa fa-pencil"></i>
                        </a>
                    </button>
                    <button class="btn" v-show="last" :class="{clicked: clicked['send'] }" @click.prevent="btnClick('send')">
                        {{ labels.send }}
                        <a href="#" @click.prevent="$emit('label', 'send')" class="a-fa-pencil">
                            <i class="fa fa-pencil"></i>
                        </a>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['step', 'labels', 'index', 'last'],
    data() {
        return {
            btn: null,
            newField: ''
        }
    },
    computed: {
        clicked() {
            return {
                forward: this.btn == 'forward',
                backward: this.btn == 'backward',
                send: this.btn == 'send',
            }
        },
        employee() {
            return this.$store.getters['employees/suggestion'];
        },
        service() {
            return  this.$store.getters['services/suggestion'];
        },
        remainingFields() {
            const addedFields = this.step.fields;

            return this.fields.filter(f => {
                return addedFields.indexOf(f.value) == -1
            });
        }
    },
    methods: {
        btnClick(which) {
            if(this.btn == which) this.btn = false;
            else this.btn = which;
        },
        addField() {
            this.$emit('add', { name: this.newField });
            this.newField = '';
        },
        remove(field) {
            this.$emit('remove', { name: field });
        },
        addQuestion() {
            this.$emit('update',
                { name: 'custom', action: 'addQuestion' }
            );
        },
        handleContentChange(event, payload) {
            this.$emit('update', {
                name: 'custom',
                action: 'updateQuestion',
                text: event,
                ...payload
            });
        }
    }
}
</script>

<style>
.a-fa-pencil, .btn .a-fa-pencil {
    border-radius: 20px;
    width: 35px;
    height: 32px;
    border: 1px solid #000;
    background: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-size: 14px;
    text-decoration: none;
    transition: .3sa all;
    align-self: flex-end;
    box-sizing: border-box;
}
.a-fa-pencil:hover {
    background: #ddd;
    border-color: #fff;
}
.btn .a-fa-pencil {
    position: absolute;
    right: 0;
    top: -2px;
    opacity: 0;
    transition: .3s all;
    z-index: 2;
}
.btn.clicked .a-fa-pencil {
    opacity: 1;
    right: -42px;
}
</style>
