<template>
    <form class="users-add" @submit.prevent="addUser">
        <div class="form-title">Добавление пользователя</div>

        <div class="form-group">
            <label class="form-label" for="users-add-name">Имя</label>
            <input class="form-control" type="text" id="users-add-name" v-model.trim="name">
        </div>

        <div class="form-group">
            <label class="form-label" for="users-add-phone">Телефон</label>
            <input class="form-control" type="tel" id="users-add-phone" v-model.trim="phone">
        </div>

        <div class="form-group">
            <label class="form-label" for="users-add-head">Начальник</label>
            <div class="error" v-if="getUsersError">Произошла ошибка</div>
            <AppSelect
                id="users-add-head"
                v-else
                :key="head"
                :options="usersOptions"
                :value="head"
                @change="setHead"/>
        </div>

        <div class="form-group">
            <AppButton type="submit">Сохранить</AppButton>
        </div>
    </form>
</template>

<script>
import Vue from 'vue';
import {mapActions} from 'vuex';

import {getUniqueUserId} from '@/base/util.js';

import AppButton from '@/components/Button';
import AppSelect from '@/components/Select';

const populateOptions = (options, users) => {
    users.forEach(user => {
        options.push({
            text: user.name,
            value: user.id
        });
        if (user.users) {
            populateOptions(options, user.users);
        }
    });
};

const addNewInnerUser = (head, users, newUser) => {
    return users.find(user => {
        if (user.id === head) {
            if (!user.users) {
                Vue.set(user, 'users', []);
            }
            user.users.push(newUser);
            return true;
        }
        if (user.users) {
            return addNewInnerUser(head, user.users, newUser);
        }
    });
};

let usersLoaded = false;

export default {
    name: 'AppUsersAdd',

    components: {
        AppButton,
        AppSelect
    },

    props: {
        isShown: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            getUsersError: false,
            name: '',
            phone: '',
            head: '',
            users: [],
            usersOptions: []
        };
    },

    watch: {
        isShown() {
            if (usersLoaded) return;

            usersLoaded = true;
            this.fetchUsers()
                .then(users => {
                    this.users = users;
                })
                .catch(error => {
                    console.error(error);
                    this.getUsersError = true;
                });
        },

        users: {
            handler() {
                const usersOptions = [];
                populateOptions(usersOptions, this.users);
                this.usersOptions = usersOptions;
            },
            deep: true
        }
    },

    methods: {
        ...mapActions([
            'fetchUsers',
            'setUsers'
        ]),

        setHead(value) {
            this.head = value;
        },

        reset() {
            this.name = '';
            this.phone = '';
            this.head = '';
        },

        addUser() {
            if (!(this.name && this.phone)) return;

            const newUser = {
                name: this.name,
                phone: this.phone,
                id: getUniqueUserId()
            };
            if (this.head) {
                addNewInnerUser(this.head, this.users, newUser);
            } else {
                this.users.push(newUser);
            }

            this.reset();

            this.setUsers(this.users);
            this.$emit('submit');
        }
    }
};
</script>

<style lang="scss">
.users-add{
    .form-group{
        display: flex;
        flex-wrap: wrap;
        margin-top: 1.5rem;
    }
    .form-label{
        width: 40%;
    }
    .form-control,
    .select{
        width: 60%;
    }
}
</style>