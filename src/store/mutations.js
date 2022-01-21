const mutations = {
    setUsersToState(state, users) {
        state.users = users;
    },

    setUsersToStorage(state, users) {
        localStorage.users = JSON.stringify(users);
    }
};

export default mutations;