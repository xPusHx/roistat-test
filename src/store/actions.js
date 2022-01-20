import {getUniqueUserId} from '@/base/util.js';

const setUserId = users => {
    users.forEach(user => {
        user.id = getUniqueUserId();
        if (user.users) {
            setUserId(user.users);
        }
    });
};

const mockJson = 'https://api.npoint.io/c3277fda8171ef6d6bc1';

const actions = {
    getUsers({state, commit}) {
        return new Promise((resolve, reject) => {
            //Берём из стора
            if (state.users) {
                resolve(state.users);
                return;
            }

            //Или берём из localStorage
            const usersData = localStorage.getItem('users');
            if (usersData) {
                const users = JSON.parse(usersData);
                state.users = users;
                resolve(users);
                return;
            }

            //Или берём с сервера
            return fetch(mockJson)
                .then(response => response.json())
                .then(data => {
                    const {users} = data;
                    setUserId(users);
                    resolve(users);
                    commit('saveUsers', users);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};

export default actions;