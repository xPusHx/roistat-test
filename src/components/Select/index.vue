<template>
    <select class="select" :id="id" v-model="valueLocal" @change="change">
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
            valueLocal: this.value
        }
    },

    watch: {
        value() {
            this.valueLocal = this.value;
            return this.value;
        }
    },

    methods: {
        change() {
            this.$emit('change', this.valueLocal);
        }
    }
};
</script>