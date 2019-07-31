import Axios from '@/common/modules/axios';
const REFRESH = 5 * 60 * 1000;


export default {

    namespaced: true,

    state: {
        token: localStorage.getItem('token'),
        date: +localStorage.getItem('date')
    },

    actions: {

        destroy ({state}) {
            state.token = null;
            state.date = null;
            localStorage.removeItem('token');
            localStorage.removeItem('date');
        },

        create ({state}, token) {
            state.token = token;
            state.date = Date.now();
            localStorage.setItem('token', token);
            localStorage.setItem('date', state.date);
        },

        refresh ({state, dispatch}) {
            if (!state.token) return;
            if (Date.now() - state.date < REFRESH) return;
            return Axios.request('refresh', state.token).then(response => {
                dispatch('create', response.data.data.token)
            })
        }

    }

}