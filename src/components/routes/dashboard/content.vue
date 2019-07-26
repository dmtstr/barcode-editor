<!--
    Styles
-->

<style scoped>


    /* main */

    .content {
        margin: 0 auto;
        /*width: 950px;*/
        padding: 0 16px;
    }


    /* image */

    .content .image {
        position: relative;
        width: 240px;
        height: 135px;
        /*box-shadow: 0 0 5px 0 rgba(232, 232, 232, 0.53);*/
        border-radius: 3px;
        /*border: 1px solid #D6D6D6;*/
    }


    /* tile */

    .content .tile {
        margin: 0 16px 16px 16px;
        padding: 12px;
    }
    .content .tile p {
        font-size: 13px;
        font-weight: 500;
        padding: 12px 8px;
    }


    /* create */

    .content .create .image {
        background: #4e90ff;
    }
    .content .create .image svg {
        width: 48px;
        height: 48px;
        fill: #fff;
    }


    /* template */

    .content .template .image {
        /*padding: 4px;*/
        background: #F5F7FA;
    }

    .content .template .image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }


</style>



<!--
    Template
-->

<template>
    <div class="content u-clear">


        <!-- create -->

        <router-link class="tile create u-fl" to="/new">
            <div class="image">
                <icon-plus class="u-center" />
            </div>
            <p>Create new</p>
        </router-link>


        <!-- template -->

        <router-link class="tile u-tile template u-fl" v-for="template in templates" :to="`/${template.id}`" :key="template.id">
            <div class="image">
                <img :src="template.image"/>
            </div>
            <p>{{template.name}}</p>
        </router-link>


    </div>
</template>



<!--
    Scripts
-->

<script>


    import iconPlus from '@/assets/icons/plus.svg'
    import uiLoader from '@/components/ui/loader.vue'


    export default {

        components: {
            iconPlus,
            uiLoader,
        },

        props: [
            'templates'
        ]

    }

</script>
