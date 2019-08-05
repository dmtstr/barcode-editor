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
    const {objects} = canvas.toJSON();
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

        edit ({state}) {
            state.editing = true;
            state.active = state.canvas;
        },

        cancel ({state}) {
            canvasFromJSON(state.canvas, state.template).then(() => {
                state.editing = false;
                state.active = null;
            })
        },

        activate ({state}, object) {
            state.active = object;
        },


        // saving

        create ({state}, name) {
            state.editing = false;
            state.loading = 'Saving...';
            return Axios.call('create', canvasToJSON(state.canvas, name))
                .then(response => (state.template = response.data.data))
                .catch(() => state.editing = false)
                .finally(() => state.loading = false);
        },

    }

}