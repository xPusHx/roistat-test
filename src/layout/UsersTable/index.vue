<template>
    <div class="users-table" :class="{disabled: loading}">
        <div class="error" v-if="getUsersError">Произошла ошибка</div>
        <template v-else>
            <AppButton @click.native="showUserAddPopup">Добавить</AppButton>

            <div class="loading" v-if="loading">Загрузка…</div>
            <AppTable v-else :header-cols="tableCols" :body-data="tableData"/>

            <AppPopup :is-shown="isPopupShown" @hide="hideUserAddPopup">
                <AppUsersAdd :is-shown="isPopupShown" @submit="userAdded"/>
            </AppPopup>
        </template>
    </div>
</template>

<script>
import {store, state} from '@/store';

import AppButton from '@/components/Button/index.vue';
import AppPopup from '@/components/Popup/index.vue';
import AppTable from '@/components/Table/index.vue';

import AppUsersAdd from '@/layout/UsersAdd/index.vue';

const populateTableData = (tableData, users) => {
    users.forEach(user => {
        const rowData = {
            cols: [
                user.name,
                user.phone
            ],
            id: user.id,
            collapsed: true
        };
        if (user.users) {
            rowData.inner = [];
            populateTableData(rowData.inner, user.users);
        }
        tableData.push(rowData);
    });
};

export default {
    name: 'AppUsersTable',

    components: {
        AppButton,
        AppPopup,
        AppTable,
        AppUsersAdd
    },

    data() {
        return {
            loading: true,
            getUsersError: false,
            isPopupShown: false,
            tableCols: [
                {
                    text: 'Имя',
                    width: 40
                },
                {
                    text: 'Телефон',
                    width: 60
                }
            ],
            tableData: []
        };
    },

    created() {
        store.dispatch('fetchUsers')
            .then(users => {
                this.populateTableData(users);
                this.loading = false;
            })
            .catch(error => {
                console.error(error);
                this.getUsersError = true;
            });
    },

    methods: {
        showUserAddPopup() {
            this.isPopupShown = true;
        },
        hideUserAddPopup() {
            this.isPopupShown = false;
        },

        populateTableData(users) {
            const tableData = [];
            populateTableData(tableData, users);
            this.tableData = tableData;
        },

        userAdded() {
            this.populateTableData(state.users);

            this.hideUserAddPopup();
        }
    }
};
</script>

<style>
.users-table{
    display: flex;
    flex-wrap: wrap;
}
.users-table.disabled{
    cursor: default;
    pointer-events: none;
    opacity: .65;
}
.users-table > .button{
    margin-left: auto;
}
.users-table > .loading{
    min-width: 100%;
    text-align: center;
}
.users-table > .table{
    margin-top: 1rem;
}
</style>