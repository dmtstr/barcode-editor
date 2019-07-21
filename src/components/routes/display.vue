<!--
    Styles
-->

<style>

    /*.r-dashboard .view {*/
        /*padding-top: 1px;*/
    /*}*/

    /*.r-dashboard .tools {*/

        /*width: 80px;*/
        /*background: #ffffff;*/
        /*box-shadow: 1px 0 10px 0 rgba(0, 0, 0, 0.03);*/
    /*}*/
    /*.r-dashboard .aside {*/

        /*width: 320px;*/
        /*background: #ffffff;*/
        /*box-shadow: 1px 0 10px 0 rgba(0, 0, 0, 0.03);*/
    /*}*/

</style>



<!--
    Template
-->

<template>
    <div class="r-dashboard u-col">


        <!-- header -->

        <layout-header>

            <template v-slot:icon>

                <router-link to="/">
                    <icon-back />
                </router-link>

            </template>

            <template v-slot:title>
                Tamplate name
            </template>

            <template v-slot:buttons>
                <a class="f-button default">
                    Delete
                </a>
                <router-link class="f-button primary" to="/login">
                    Edit
                </router-link>

            </template>

        </layout-header>


        <div class="view u-flex u-row">

            <div class="tools"></div>
            <div class="canvas u-flex"></div>
            <div class="aside"></div>


        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>


    import layoutHeader from '@/components/layout/header.vue'
    import iconDashboard from '@/assets/icons/dashboard.svg'
    import iconBack from '@/assets/icons/back.svg'


    export default {

        components: {
            layoutHeader,
            iconDashboard,
            iconBack
        }

    }

</script>
