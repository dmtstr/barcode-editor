import Vue from 'vue'
import Vuex from 'vuex'

import header from '@/common/stores/header';
import toasts from '@/common/stores/toasts';
import session from '@/common/stores/session';

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        header,
        toasts,
        session
    }

});
