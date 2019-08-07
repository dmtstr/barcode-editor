// ------------------
// Imports
// ------------------

import axios from 'axios';
import Store from '@/common/modules/store';
import Router from '@/common/modules/router';
import Config from '@/common/configs/api';



// ------------------
// Instance
// ------------------

const Axios = axios.create({
    baseURL: API_ORIGIN
});



// ------------------
// Interceptors
// ------------------

Axios.interceptors.response.use(undefined, error => {
    if (axios.isCancel(error)) {
        return Promise.reject(null);
    }
    if (error.response && error.response.status === 401) {
        Router.push('/login');
        return Promise.reject(null);
    }
    if (error.response && error.response.data) {
        Store.dispatch('toasts/error', error.response.data.error.message);
    }
    else {
        Store.dispatch('toasts/error', error.message);
    }
    return Promise.reject(error);
});



// ------------------
// Canceller
// ------------------

const Canceller = {

    store: {},

    get (key) {
        if (!this.store[key]) this.store[key] = axios.CancelToken.source();
        return this.store[key];
    },

    abort (key) {
        if (!this.store[key]) return;
        this.store[key].cancel();
        delete this.store[key];
    },

    reset () {
        const keys = Object.keys(this.store);
        for (const key of keys) this.abort(key);
    }

};



// ------------------
// Exports
// ------------------

export default {

    call (...args) {
        const key = args.shift();
        const config = Config[key].apply(null, args);
        const canceller = Canceller.get(key);
        return Axios(Object.assign(config, {
            cancelToken: canceller.token,
            headers: {
                'Authorization': 'Bearer ' + Store.state.session.token
            }
        }));
    },

    abort (key) {
        if (key) Canceller.abort(key);
        else Canceller.reset();
        return this;
    }

}