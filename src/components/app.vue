<!--
    Styles
-->

<style>

    #app {
        height: 100%;
    }
    #app .l-header {
        z-index: 2;
    }
    #app .l-section {
        z-index: 1;
    }
    #app .l-toasts {
        z-index: 3;
    }

</style>



<!--
    Template
-->

<template>
    <div id="app" class="u-col">
        <layout-header />
        <layout-section class="u-flex" />
        <layout-toasts />
    </div>
</template>



<!--
    Scripts
-->

<script>


    import layoutHeader from '@/components/layout/header.vue'
    import layoutSection from '@/components/layout/section.vue'
    import layoutToasts from '@/components/layout/toasts.vue'


    export default {

        components: {
            layoutHeader,
            layoutSection,
            layoutToasts
        }

    }

</script>
