<template>
    <div id="app">
        <div class="content">
            <UsersTable/>
        </div>
    </div>
</template>

<script>
import UsersTable from '@/layout/UsersTable/index.vue';

export default {
    name: 'App',

    components: {
        UsersTable
    }
};
</script>

<style lang="scss">
*,
*::before,
*::after{
    box-sizing: border-box;
}
html,
body{
    min-height: 100vh;
}
body{
    display: flex;
    justify-content: center;
    padding: 12px;
    margin: 0;
}

#app{
    width: 100%;
    max-width: 600px;
}

.error{
    color: red;
}
</style>
