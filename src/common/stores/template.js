// -------------------
// Imports
// -------------------

import {fabric} from 'fabric'
import Config from '@/common/configs/canvas'
import Axios from '@/common/modules/axios'



// -------------------
// Defaults
// -------------------

const defaults = {
    editing: false,
    loading: false,
    template: null,
    active: null,
    canvas: null
};



// -------------------
// Helpers
// -------------------

const canvasToJSON = (canvas, name) => {
    const {objects} = canvas.toJSON(['barcodeType', 'barText']);
    return {
        name,
        objects,
        width: canvas.width,
        height: canvas.height,
        image: canvas.toDataURL()
    }
};

const canvasFromJSON = (canvas, template) => {
    return new Promise(resolve => {
        canvas = canvas || new fabric.Canvas();
        canvas.setWidth(template.width);
        canvas.setHeight(template.height);
        canvas.loadFromJSON(template, () => {
            canvas.renderAll();
            resolve({canvas, template});
        });
    });
};



// -------------------
// Exports
// -------------------

export default {

    namespaced: true,

    state: {
        ...defaults
    },

    actions: {


        // reset

        reset ({state}) {
            Object.assign(state, defaults);
        },


        // loading

        init ({state}) {
            canvasFromJSON(null, Config.template).then(({canvas, template}) => {
                state.template = template;
                state.canvas = canvas;
                state.active = canvas;
                state.editing = true;
            });
        },

        load ({state}, id) {
            state.loading = 'Loading...';
            return Axios.call('get', id)
                .then(response => canvasFromJSON(null, response.data.data))
                .then(({canvas, template}) => {
                    state.template = template;
                    state.canvas = canvas;
                    state.loading = false;
                });
        },


        // editing

        edit ({state}, value) {
            state.editing = value;
            state.active = value && state.canvas;
        },

        cancel ({state, dispatch}) {
            canvasFromJSON(state.canvas, state.template).then(() => dispatch('edit', false))
        },

        activate ({state}, object) {
            state.active = object;
        },


        // saving

        create ({state, dispatch}, name) {
            state.loading = 'Saving...';
            dispatch('edit', false);
            return Axios.call('create', canvasToJSON(state.canvas, name))
                .then(response => (state.template = response.data.data))
                .catch(() => dispatch('edit', true))
                .finally(() => state.loading = false);
        },

        update ({state, dispatch}, name) {
            state.loading = 'Saving...';
            dispatch('edit', false);
            return Axios.call('update', canvasToJSON(state.canvas, name), state.template.id)
                .then(response => (state.template = response.data.data))
                .catch(() => dispatch('edit', true))
                .finally(() => state.loading = false);
        },

        remove ({state}) {
            state.loading = 'Deleting...';
            return Axios.call('remove', state.template.id)
                .catch(() => state.loading = false);
        },

    }

}