export default {

    namespaced: true,

    state: {

        show: false,
        title: null

    },

    actions: {

        title ({state}, value) {
            state.title = value;
        }

    }

}