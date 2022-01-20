<template>
    <div class="popup" v-show="stateShown">
        <button class="popup__close" type="button" title="Закрыть попап" @click="hide">&times;</button>

        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'AppPopup',

    props: {
        isShown: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            stateShown: false
        };
    },

    watch: {
        isShown() {
            this.stateShown = this.isShown;
        }
    },

    created() {
        this.stateShown = this.isShown;
    },

    methods: {
        hide() {
            this.stateShown = false;
            this.$emit('hide');
        }
    }
};
</script>

<style>
.popup{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow: 0 0 16px 0 rgba(0,0,0, .4);
    width: 300px;
    padding: 20px;
}
.popup__close{
    position: absolute;
    top: 15px;
    right: 15px;
    width: 20px;
    height: 20px;
    background: none;
    border: none;
    padding: 0;
    font-size: 32px;
    line-height: 20px;
    cursor: pointer;
}
</style>