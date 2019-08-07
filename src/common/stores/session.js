import Axios from '@/common/modules/axios';
const REFRESH = 3 * 60 * 1000;


export default {

    namespaced: true,

    state: {
        timeout: null,
        token: localStorage.getItem('token')
    },

    actions: {

        destroy ({state}) {
            state.token = null;
            clearTimeout(state.timeout);
            localStorage.removeItem('token');
        },

        create ({state, dispatch}, token) {
            state.token = token;
            state.timeout = setTimeout(() => dispatch('refresh'), REFRESH);
            localStorage.setItem('token', token);
        },

        refresh ({state, dispatch}) {
            return Axios.call('refresh', state.token).then(response => {
                dispatch('create', response.data.data.token)
            })
        },

        restore ({state, dispatch}) {
            if (state.token) state.timeout = setTimeout(() => dispatch('refresh'), REFRESH);
        }

    }

}