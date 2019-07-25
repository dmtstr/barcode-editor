import Config from '@/common/configs/canvas'
import Axios from '@/common/modules/axios'


const defaults = {
    editing: false,
    loading: false,
    cache: null,
    template: null,
    active: null,
    canvas: null,
    events: {}
};


export default {

    namespaced: true,


    // state

    state: Object.assign({}, defaults),


    // mutations

    mutations: {

        setName ({template}, value) {
            template.name = value;
        },

        setCanvas (state, canvas) {
            state.canvas = canvas;
        }

    },


    // actions

    actions: {

        reset ({state}) {
            Object.assign(state, defaults);
        },

        init ({state}) {
            state.editing = true;
            state.template = Object.assign({}, Config.template);
            state.active = state.template;
        },

        load ({state}, id) {
            state.loading = 'Loading...';
            state.template = null;
            return Axios.call('get', id)
                .then(response => {
                    state.template = response.data.data;
                    state.loading = false;
                })
        },

        create ({state}, callback) {
            state.editing = false;
            state.loading = 'Saving...';
            state.template.content = state.canvas.toJSON();
            return Axios.call('create', state.template)
                .then(response => {
                    state.template.id = response.data.data.id;
                    callback(state.template);
                })
                .catch(() => {
                    state.editing = true;
                })
                .finally(() => {
                    state.loading = false;
                })
        },

        update ({state}, callback) {
            state.editing = false;
            state.loading = 'Saving...';
            state.template.content = state.canvas.toJSON();
            return Axios.call('update', state.template)
                .then(callback)
                .catch(() => {
                    state.editing = true;
                })
                .finally(() => {
                    state.loading = false;
                })
        },

        remove ({state}, callback) {
            state.loading = 'Deleting...';
            Axios.call('remove', state.template.id)
                .then(callback)
                .catch(() => {
                    state.loading = false
                });
        },

        edit ({state}) {
            state.editing = true;
            state.cache = JSON.parse(JSON.stringify(state.template));
        },

        cancel ({state}) {
            state.editing = false;
            state.template = state.cache;
        },

        activate ({state}, object) {
            state.active = object;
        },

        on ({state}, [event, callback]) {
            !state.events[event] && (state.events[event] = []);
            state.events[event].push(callback);
        },

        emit ({state}, data) {
            const name = data.shift();
            state.events[name].forEach(event => event.apply(null, data));
        }


    }

}