<template>
    <div class="d-flex w-100">
        <div class="col">
            <h3>On/Off</h3>
            
            <switch-input @change="handleSwitchChange" :active="switchActive">
                <template v-slot:on><i class="fa fa-smile-o"></i></template>
                <template v-slot:off><i class="fa fa-frown-o"></i></template>
            </switch-input>

            <toggle-anonymouse 
                @change="handleSwitchChange"
                :active="switchActive">
            </toggle-anonymouse>


            <h3>Radio Select</h3>
            <div>
                <radio-select
                    :suggestions="radioTextSuggestions"
                    :value="radioTextSelected"
                    @change="handleRadioChange"
                />
            </div>
            <h3>Bulk Text</h3>

            <big-text 
                :value="textText" 
                :max="400"
                @input="handleTextChange">
            </big-text>
            {{ textText }}

            <h3>Текстови полета</h3>
            <div>
                <text-input
                    :value="textInput"
                    @change="handleTextInputChange"
                    @input="handleInputText"
                />
                {{ textInput }} | {{ theTextInput }}
            </div>
            <div>
                <text-input
                    :value="`Fooobar`"
                >
                    <template v-slot:prefix>Prefix</template>
                    <template v-slot:sufix>Sufix</template>
                </text-input>
            </div>
            <h3>Дропдоун</h3>
            <div>
                <input-select
                    :value="dropdownValue"
                    :suggestions="suggestions"
                    @input="handleDropdownValue"
                />
                {{ dropdownValue }}
                <hr />
                <input-select
                    :value="dropdownValue"
                    :suggestions="suggestions"
                    :allow-input="false"
                    @input="handleDropdownValue"
                />
            </div>
            <h3>Дати</h3>
            <div>
                <date-input
                    :value="inputDate"
                    @input="handleInputDate" 
                />
            </div>
            <div>
                <date-input
                    :value="inputDate"
                    show-time
                    @input="handleInputDate"
                />
                {{ inputDate.getMinutes() }} - {{ inputDate.getHours() }}
            </div>
        </div> <!-- class col -->
    
        <div class="col">
            <div>
                <div class="heading">Запази час</div>
                <div class="hr d-flex flex-cols">
                    <toggle-anonymouse :active="1" />
                    <text-input class="mr-15">
                        <template v-slot:label>Име:</template>
                    </text-input>
                    <text-input class="mr-15">
                        <template v-slot:prefix><i class="fa fa-phone"></i></template>
                    </text-input>
                    <text-input>
                        <template v-slot:prefix><i class="fa fa-envelope-o"></i></template>
                    </text-input>
                </div>
                <div class="hr d-flex flex-cols">
                    <input-select
                        :value="employee"
                        :suggestions="employees"
                        :allow-input="false"
                    >
                        <template v-slot:label>
                            <span class="mr-15">Служител:</span>
                        </template>
                    </input-select>
                    <date-input
                        :value="inputDate"
                        show-time
                    >
                    </date-input>
                </div>
                <div class="hr d-flex flex-cols">
                    <input-select
                        :value="employee"
                        :suggestions="employees"
                        :allow-input="false"
                    >
                        <template v-slot:label>
                            <span class="mr-15">Услуга:</span>
                        </template>
                    </input-select>
                    <div>
                        <div class="px-15">Продължителност:</div>
                        <div class="d-flex flex-cols">
                            <radio-select
                                :suggestions="durationValues"
                            />
                            <div>
                                <div class="align-to-options">45 min</div>
                                <div>
                                    <text-input>
                                        <template v-slot:sufix>мин.</template>
                                    </text-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hr">
                    <big-text max="400" class="w-100"></big-text>
                </div>
            </div>
            <div>
                <div class="heading">Редакция на час</div>
                <div class="hr d-flex flex-cols">
                    <!-- <toggle-anonymouse :active="1" />
                    <text-input class="mr-15">
                        <template v-slot:label>Име:</template>
                    </text-input>
                    <text-input class="mr-15">
                        <template v-slot:prefix><i class="fa fa-phone"></i></template>
                    </text-input>
                    <text-input>
                        <template v-slot:prefix><i class="fa fa-envelope-o"></i></template>
                    </text-input> -->
                    <div>Име: Петър Петров</div>
                    <div class="d-flex flex-cols">
                        <div><i class="fa fa-phone"></i> +359894386103</div>
                        <action-list></action-list>
                    </div>
                    <div class="d-flex flex-cols">
                        <div><i class="fa fa-envelope-o"></i> thisemail@example.com</div>
                        <action-list></action-list>
                    </div>
                </div>
                <div class="hr d-flex flex-cols">
                    <input-select
                        :value="employee"
                        :suggestions="employees"
                        :allow-input="false"
                    >
                        <template v-slot:label>
                            <span class="mr-15">Служител:</span>
                        </template>
                    </input-select>
                    <date-input
                        :value="inputDate"
                        show-time
                    >
                    </date-input>
                </div>
                <div class="hr d-flex flex-cols">
                    <input-select
                        :value="employee"
                        :suggestions="employees"
                        :allow-input="false"
                    >
                        <template v-slot:label>
                            <span class="mr-15">Услуга:</span>
                        </template>
                    </input-select>
                    <div>
                        <div class="px-15">Продължителност:</div>
                        <div class="d-flex flex-cols">
                            <radio-select
                                :suggestions="durationValues"
                            />
                            <div>
                                <div class="align-to-options">45 min</div>
                                <div>
                                    <text-input>
                                        <template v-slot:sufix>мин.</template>
                                    </text-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hr">
                    <big-text max="400" class="w-100"></big-text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputDate: new Date(),
            textInput: 'foobar',
            theTextInput: '',
            dropdownValue: 256,
            suggestions: [0,16,32,128,256,512],
            textText: "Foooobar",
            radioTextSuggestions: [
                { text: "Option 1", value: 1},
                { text: "Option 2", value: 2},
                { text: "Option 3", value: 3},
            ],
            radioTextSelected: 1,
            switchActive: true,
            employee: '',
            employees: [{
                text: 'Employee 01',
                value: 1
            },{
                text: 'Employee 02',
                value: 2
            }],
            durationValues: [
                {text: 'Стандартна', value: 0},
                {text: 'Индивидиална', value: 1}
            ]
        }
    },
    methods: {
        handleTextInputChange(val) {
            this.textInput = val;
        },
        handleInputText(val) {
            this.theTextInput = val;
        },
        handleInputDate(val) {
            this.inputDate = val;
        },
        handleDropdownValue(val) {
            this.dropdownValue = val;
        },
        handleTextChange(val) {
            this.textText = val;
        },
        handleRadioChange(val) {
            this.radioTextSelected = val;
        },
        handleSwitchChange(val) {
            this.switchActive = val;
        }
    }
}
</script>

<style lang="css">
    .align-to-options {
        padding-top: 3px;
        padding-bottom: 7px;
    }
</style>