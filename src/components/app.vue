<!--
    Styles
-->

<style>

    #app {
        height: 100%;
    }

</style>



<!--
    Template
-->

<template>
    <div id="app">
        <layout-section />
        <layout-toasts />
    </div>
</template>



<!--
    Scripts
-->

<script>


    import {mapActions} from 'vuex'
    import layoutSection from '@/components/layout/section.vue'
    import layoutToasts from '@/components/layout/toasts.vue'


    export default {

        components: {
            layoutSection,
            layoutToasts
        },

        methods: mapActions('session', [
            'restore'
        ]),

        mounted () {
            this.restore();
        }

    }

</script>
