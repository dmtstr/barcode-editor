// -------------------
// Defaults
// -------------------

const defaults = {
    type: 'success',
    duration: 3000
};



// -------------------
// Toast class
// -------------------

class Toast {

    constructor (options, hide) {
        Object.assign(this, defaults, options);
        this.hide = hide;
        this.play();
    }

    play () {
        this.timeout = setTimeout(() => this.hide(this), this.duration);
    }

    stop () {
        this.timeout && clearTimeout(this.timeout);
    }


}



// -------------------
// Exports
// -------------------

export default {

    namespaced: true,

    state: {
        toasts: []
    },

    actions: {

        notify ({state, dispatch}, options) {
            state.toasts.push(new Toast(options, toast => dispatch('hide', toast)));
        },

        hide ({state}, toast) {
            state.toasts.splice(state.toasts.indexOf(toast), 1);
        },

        success ({dispatch}, message) {
            dispatch('notify', {message, type: 'success'});
        },

        error ({dispatch}, message) {
            dispatch('notify', {message, type: 'error'});
        }


    }

}
