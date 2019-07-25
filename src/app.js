import '@/assets/styles/app.css';
import Vue from 'vue';
import router from '@/common/modules/router';
import store from '@/common/modules/store';
import app from '@/components/app.vue';

import '@/common/directives/value-round';

new Vue({
    store,
    router,
    el: '#app',
    render: function(h) {
        return h(app);
    }
});