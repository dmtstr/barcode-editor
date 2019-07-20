export default {

    namespaced: true,

    state: {
        token: localStorage.getItem('token')
    },

    actions: {

        destroy ({state}) {
            state.token = null;
            localStorage.removeItem('token');
        },

        create ({state}, token) {
            state.token = token;
            localStorage.setItem('token', token);
        }

    }

}