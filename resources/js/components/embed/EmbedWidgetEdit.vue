<template>
    <div class="d-flex-cols">
        <embed-step-edit
            :step="steps[step]"
            :labels="labels"
            :index="step"
            :last="steps.length - 1 == step"
            @label="$emit('label', $event)"
            @add="addField($event, steps[step])"
            @remove="removeField($event, steps[step])"
            @update="updateField($event, steps[step])"
        />
    </div>
</template>
<script>
    export default {
        props: ['steps', 'step', 'labels'],
        methods: {
            removeField(field, step) {
                const newStep = {
                    ...step,
                    fields: step.fields.filter(f => f != field.name)
                }

                if(step.fields.indexOf('custom') == -1 && typeof step['questions'] != 'undefined') {
                    delete step['questions']
                }


                this.$emit('change', {
                    index: this.step,
                    step: newStep
                });
            },
            updateField(field, step) {
                if(field.action == 'addQuestion') {
                    this.$emit('change', {
                        index: this.step,
                        step: {
                            ...step,
                            questions: [...step.questions, {
                                text: `[Въпрос ${step.questions.length + 1}]?`,
                                type: 'text'
                            }]
                        }
                    });
                }

                if(field.action == 'updateQuestion') {
                    this.$emit('change', {
                        index: this.state.step,
                        step: {
                            ...step,
                            questions: step.questions.map((q,i) => {
                                return {
                                    ...q,
                                    text: field.index == i ? field.text : q.text
                                }
                            })
                        }
                    })
                }
            }
        }
    }
</script>