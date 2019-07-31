import {fabric} from 'fabric'
import Config from '@/common/configs/canvas'
import Axios from '@/common/modules/axios'


const defaults = {
    editing: false,
    loading: false,
    template: null,
    active: null,
    canvas: null,
    events: {}
};


const canvasToJSON = canvas => {
    const {objects} = canvas.toJSON();
    return {
        objects,
        width: canvas.width,
        height: canvas.height,
        image: canvas.toDataURL()
    }
};

const canvasFromJSON = template => {
    return new Promise(resolve => {
        let canvas = new fabric.Canvas();
        canvas.setWidth(template.width);
        canvas.setHeight(template.height);
        canvas.loadFromJSON(template, () => {
            canvas.renderAll();
            resolve(canvas);
        });
    });
};



export default {

    namespaced: true,


    // state

    state: {
        ...defaults
    },


    // mutations

    mutations: {

        setName ({template}, value) {
            template.name = value;
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
            canvasFromJSON(state.template).then(canvas => {
                state.active = state.template;
                state.canvas = canvas;
            });
        },

        load ({state}, id) {
            state.loading = 'Loading...';
            return Axios.call('get', id)
                .then(response => {
                    state.template = response.data.data;
                    return canvasFromJSON(state.template);
                })
                .then(canvas => {
                    state.loading = false;
                    state.canvas = canvas;
                })
        },

        create ({state}, callback) {

            state.editing = false;
            state.loading = 'Saving...';

            return Axios
                .call('create', Object.assign(
                    {},
                    state.template,
                    canvasToJSON(state.canvas)
                ))
                .then(response => {
                    state.template = response.data.data;
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
            return Axios
                .call('update', Object.assign(
                    {},
                    state.template,
                    canvasToJSON(state.canvas)
                ))
                .then(response => {
                    state.template = response.data.data;
                    callback(response);
                })
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
            state.active = state.template;
            state.cache = JSON.parse(JSON.stringify(state.template));
        },

        cancel ({state}) {
            state.editing = false;
            state.active = null;
            state.template = state.cache;

            state.canvas.setWidth(state.template.width);
            state.canvas.setHeight(state.template.height);
            state.canvas.loadFromJSON(state.template, () => state.canvas.renderAll());
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