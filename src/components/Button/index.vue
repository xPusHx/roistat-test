<template>
    <button class="button" :type="type">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'AppButton',

    props: {
        type: {
            type: String,
            default: 'button'
        }
    }
};
</script>

<style lang="scss">
.button{
    border: 1px solid #ddd;
    border-radius: 31px;
    padding: 8px 18px;
    cursor: pointer;
}
</style>