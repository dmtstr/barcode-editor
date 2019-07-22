const clone = object => {
    return JSON.parse(JSON.stringify(object));
};


export default {

    namespaced: true,

    state: {

        editing: false,
        cache: null,
        template: null

    },

    actions: {

        edit ({state}) {
            state.cache = clone(state.template);
            state.editing = true;
        },

        cancel ({state}) {
            state.template = state.cache;
            state.cache = null;
            state.editing = false;
        },

        save () {

        },



        set ({state}, params) {
            Object.assign(state, params);
        }


    }

}