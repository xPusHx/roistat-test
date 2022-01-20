const mutations = {
    saveUsers(state, users) {
        state.users = users;

        localStorage.users = JSON.stringify(users);
    }
};

export default mutations;