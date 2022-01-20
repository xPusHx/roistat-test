<template>
    <select class="select" :id="id" v-model="stateValue" @change="change">
        <option value=""></option>
        <option
            v-for="(option, index) in options"
            :key="`${option.value}-${index}`"
            :value="option.value">
            {{option.text}}
        </option>
    </select>
</template>

<script>
export default {
    name: 'AppSelect',

    props: {
        id: {
            type: String,
            default: ''
        },

        value: {
            type: String,
            default: ''
        },

        options: {
            type: Array,
            default() {
                return [];
            }
        }
    },

    data() {
        return {
            stateValue: ''
        }
    },

    watch: {
        stateValue() {
            this.stateValue = this.value;
        }
    },

    created() {
        this.stateValue = this.value;
    },

    updated() {
        this.stateValue = this.value;
    },

    methods: {
        change() {
            this.$emit('change', this.stateValue);
        }
    }
};
</script>