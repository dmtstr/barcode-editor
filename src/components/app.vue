<!--
    Styles
-->

<style>

    #app {
        height: 100%;
    }
    #app .l-section {
        z-index: 1;
        height: 100%;
    }
    #app .l-toasts {
        z-index: 2;
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


    import layoutSection from '@/components/layout/section.vue'
    import layoutToasts from '@/components/layout/toasts.vue'


    export default {

        components: {
            layoutSection,
            layoutToasts
        }

    }

</script>
