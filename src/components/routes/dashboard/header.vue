<!--
    Styles
-->

<style>
    
</style>



<!--
    Template
-->

<template>
    <layout-header :loading="loading">


        <!-- icon -->

        <template v-slot:icon>
            <icon-dashboard />
        </template>


        <!-- title -->

        <template v-slot:title>
            Dashboard
        </template>


        <!-- button -->

        <template v-slot:buttons>
            <router-link class="f-button primary" to="/login">Logout</router-link>
        </template>


    </layout-header>
</template>



<!--
    Scripts
-->

<script>

    import layoutHeader from '@/components/layout/header.vue'
    import iconDashboard from '@/assets/icons/dashboard.svg'
    
    export default {

        components: {
            layoutHeader,
            iconDashboard
        },

        props: [
            'loading'
        ]

    }

</script>
