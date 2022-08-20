<template>
<div class="d-flex w-100">
    <div class="preview-options p-15" v-if="loaded">
        <div class="hr mb-5">
            <div>Рамка</div>
            <text-input :value="state.container.border" @input="update({container:{border:$event}})" />
            <div>Радиус</div>
            <text-input :value="state.container.borderRadius" @input="update({container:{borderRadius:$event}})" />
            <div>Сянка</div>
            <text-input :value="state.container.boxShadow" @input="update({container:{boxShadow:$event}})" />
            <div>Цвят на сянката</div>
            <div class="d-flex">
                <color-input :value="state.container.boxShadowColor" @input="update({container:{boxShadowColor:$event}})" title="Цвят на сянката" />
                <text-input :value="state.container.boxShadowAlpha" @input="update({container:{boxShadowAlpha:$event}})" />
            </div>
            <div>Ширина</div>
            <text-input :value="state.container.width" @input="update({container:{width:$event}})" />
            <div>Отстояние</div>
            <text-input :value="state.container.padding"  @input="update({container:{padding:$event}})" />
        </div>
        <div class="hr mb-5">
            <div>Рамка</div>
            <text-input :value="state.title.borderBottom" @input="update({title:{borderBottom:$event}})" />
            <div>Размер на шрифта</div>
            <text-input :value="state.title.fontSize" @input="update({title:{fontSize:$event}})" />
            <div>Отстояние</div>
            <text-input :value="state.title.padding" @input="update({title:{padding:$event}})" />
            <div>Цветове</div>
            <div class="d-flex">
                <color-input :value="state.title.color" @input="update({title:{color:$event}})" title="Текст" class="mr-5" />
                <color-input :value="state.title.background"  @input="update({title:{background:$event}})" title="Фон" />
            </div>
        </div>
        <div class="hr mb-5">
            <div>Размер на Текст</div>
            <text-input :value="state.text.fontSize" @input="update({text:{fontSize:$event}})" />
            <div>Цветове</div>
            <div class="d-flex">
                <color-input :value="state.text.color" @input="update({text:{color:$event}})" title="Текст" class="mr-5" />
                <color-input :value="state.text.background" @input="update({text:{background:$event}})" title="Фон" />
            </div>
        </div>
        <div class="d-flex justify-content-right">
            <network-button namespace="theme.update" @save="handleSubmit">Запази</network-button>
        </div>
    </div>
    <transition @enter="backgroundBlink">
        <div class="d-flex preview-options" v-show="labelSelected">
            <div class="p-15" ref="editArea">
                <div class="hr">
                    <div>Въведете текст</div>
                    <text-input :value="labels[labelSelected]" @input="update({labels:{[labelSelected]: $event}})"  />
                </div>
            </div>
        </div>
    </transition>
    <div class="d-flex align-items-center justify-content-center w-100 rel">
        <div class="p-5 widget-top-toolbar d-flex align-items-center justify-content-center">
            <div class="d-flex">
                <input-select :suggestions="remainingFields[step]" v-model="newField" class="mr-5" />
                <button @click="addField">Добави</button>
            </div>
        </div>
        <div class="d-flex-cols">
            <embed-widget-edit
                :step="step"
                :steps="steps"
                :labels="labels"
                @change="handleStepChange"
                @label="handleLabelSelected"
                ref="widget-steps"
            />
            <preview-steps-utils
                :steps-count="steps.length"
                @delete="handleStepDelete"
                @add="handleAddStep"
            />
        </div>
        <prev-next-steps
            :steps="steps"
            :active="step"
            @step="step = $event"
            @prev="prev"
            @next="next"
        />
    </div>
    <css-compiler :css="css" ref="compiler" v-if="loaded" />
</div>
</template>

<script>
    import './Preview';
    import { gsap, CSSPlugin, TweenLite as tl } from "gsap";
    
    gsap.registerPlugin(CSSPlugin);

    export default {
        async created() {
            const s = document.querySelector('#kl-style-container');
            
            if(!s) {
                const c = document.createElement('style');
                c.id = 'kl-style-container';
                document.body.appendChild(c);
            }

            await Promise.all([
                this.$store.dispatch('employees/load'),
                this.$store.dispatch('services/load'),
                this.$store.dispatch('preview/load')
            ]);
        },
        updated() {
            const css = this.$refs['compiler'].$el.innerText;
            document.querySelector('#kl-style-container').innerText = css.replace('\n', '').replace('\r', '');
        },
        mounted() {
            this.loaded = true;
        },
        data() {
            return {
                step: 0,
                newField: '',
                labelSelected: '',
                loaded: false,
            }
        },
        methods: {
            update(val) {
                this.$store.commit('preview/update', val);
            },
            handleSubmit() {
                const css = this.$refs['compiler'].$el.innerText
                            .replace("\n", "")
                            .replace("\r", "");
                this.$store.dispatch('preview/update', {...this.state, css });
            },
            handleStepChange({ index, step }) {
                const steps = this.steps.map((s,i) => {
                    return i == index ? step : s;
                });
                this.$store.commit('preview/update', { steps });
            },
            addField() {
                const current = this.step;
                const steps = this.steps.reduce((steps, s, i) => {
                    let newStep = current == i ? {
                        ...s, 
                        fields: [...s.fields, this.newField]
                    } : s;

                    if(this.newField === 'custom') {
                        newStep['questions'] = [{
                            text: '[Въпрос 1]?',
                            type: 'text'
                        }];
                    }

                    return [
                        ...steps,
                        newStep
                    ]
                }, []);

                this.$store.commit('preview/update', { steps });

                this.newField = '';
            },
            prev() {
                this.step = Math.max(0, this.step - 1)
                this.labelSelected = false;
            }, 
            next() {
                this.step = Math.min(this.steps.length - 1, this.step + 1);
                this.labelSelected = false;
            },
            handleStepDelete(index) {
                
                const steps = this.steps.filter((s,i) => i != this.step);
                const onComplete = () => this.$store.commit('preview/update', { steps })

                gsap.timeline()
                        .fromTo(this.$refs['widget-steps'].$el, .3, {css:{x:0, opacity: 1}}, {css:{x: 150, opacity:0}, onComplete })
                        .fromTo(this.$refs['widget-steps'].$el, .3, {css:{x:-150, opacity: 0}}, {css:{x: 0, opacity: 1}})

                // gsap.fromTo(this.$refs['widget-steps'], .3, {css:{x:0, opacity: 1}}, {css:{x: 150, opacity:0}}, {
                //     completed: () => {
                //         this.$store.commit('preview/update', { steps });
                //         gsap;
                //     }
                // });
                    
            }, 
            handleAddStep() {
                const steps = [
                    ...this.steps.slice(0, this.step + 1),
                    {fields: [], uuid: Date.now() }, // new step has empty fields
                    ...this.steps.slice(this.step + 1)
                ];
                this.$store.commit('preview/update', { steps });
            },
            handleLabelSelected(label) {
                this.labelSelected = label;
            },
            backgroundBlink(el) {
                tl.fromTo(el, 2.5, { css:{background: 'rgba(174, 208, 234, 1)'}}, {css:{background: 'rgba(174, 208, 234, 0)'}}, .5 );
            }
        },
        computed: {
            css() {
                return {
                    container: this.state.container,
                    text: this.state.text,
                    title: this.state.title
                }
            },
            state() {
                return this.$store.state['preview'].settings;
            },
            steps() {
                return this.$store.state['preview'].settings.steps || [];
            },
            labels() {
                return this.$store.state['preview'].settings.labels || {};
            },
            fields() {
                return this.$store.state['preview'].fields;
            },
            remainingFields() {
                return this.steps.map(s => {
                    return this.fields.filter(f => s.fields.indexOf(f.value) == -1)
                })
            }
        }
    }
</script>