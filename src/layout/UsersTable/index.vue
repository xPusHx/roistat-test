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
import Vue from 'vue';
import {mapActions, mapState} from 'vuex';

import AppButton from '@/components/Button';
import AppPopup from '@/components/Popup';
import AppTable from '@/components/Table';

import AppUsersAdd from '@/layout/UsersAdd';

const populateTableData = (tableData, users) => {
    users.forEach((user, userIndex) => {
        let rowData = tableData[userIndex];
        if (!rowData || (rowData.id !== user.id)) {
            rowData = {
                cols: [
                    user.name,
                    user.phone
                ],
                id: user.id,
                collapsed: true
            };
            tableData.push(rowData);
        }

        if (user.users) {
            if (!rowData.inner) {
                Vue.set(rowData, 'inner', []);
            }
            populateTableData(rowData.inner, user.users);
        }
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

    computed: mapState([
        'users'
    ]),

    created() {
        this.fetchUsers()
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
        ...mapActions([
            'fetchUsers'
        ]),

        showUserAddPopup() {
            this.isPopupShown = true;
        },
        hideUserAddPopup() {
            this.isPopupShown = false;
        },

        populateTableData(users) {
            populateTableData(this.tableData, users);
        },

        userAdded() {
            this.populateTableData(this.users);

            this.hideUserAddPopup();
        }
    }
};
</script>

<style lang="scss">
.users-table{
    display: flex;
    flex-wrap: wrap;
    &.disabled{
        cursor: default;
        pointer-events: none;
        opacity: .65;
    }
    & > .button{
        margin-left: auto;
    }
    & > .loading{
        min-width: 100%;
        text-align: center;
    }
    & > .table{
        margin-top: 1rem;
    }
}
</style>