import Vue from 'vue'
import Vuex from 'vuex'
import toasts from '@/common/stores/toasts';
import session from '@/common/stores/session';
import template from '@/common/stores/template';

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        toasts,
        session,
        template
    }

});
