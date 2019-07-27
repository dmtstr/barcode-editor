import {fabric} from 'fabric'
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
    let canvas = new fabric.Canvas();
    canvas.setWidth(template.width);
    canvas.setHeight(template.height);
    canvas.loadFromJSON(template, () => canvas.renderAll());
    return canvas;
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
            state.canvas = canvasFromJSON(state.template);
            state.active = state.template;
        },

        load ({state}, id) {
            state.loading = 'Loading...';
            return Axios.call('get', id)
                .then(response => {
                    state.template = response.data.data;
                    state.canvas = canvasFromJSON(state.template);
                    state.loading = false;
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
            state.active = state.template;
            state.cache = JSON.parse(JSON.stringify(state.template));
        },

        cancel ({state}) {
            state.editing = false;
            state.active = null;
            state.template = state.cache;
            // state.canvas = canvasFromJSON(state.template);
        },

        activate ({state}, object) {
            // console.log(object)
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