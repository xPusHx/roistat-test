<template>
    <div class="popup" v-show="isShownLocal">
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
            isShownLocal: this.isShown
        };
    },

    watch: {
        isShown() {
            this.isShownLocal = this.isShown;
        }
    },

    methods: {
        hide() {
            this.isShownLocal = false;
            this.$emit('hide');
        }
    }
};
</script>

<style lang="scss">
.popup{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow: 0 0 16px 0 rgba(0,0,0, .4);
    width: 300px;
    padding: 20px;
    &__close{
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
}
</style>