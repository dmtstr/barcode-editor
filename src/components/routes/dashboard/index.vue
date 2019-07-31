<!--
    Styles
-->

<style>


    /* main */

    .r-dashboard .container {
        overflow: auto;
        padding: 64px 80px;
    }


    /* grid */

    .r-dashboard .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, 266px);
        grid-gap: 32px;
        justify-content: space-between;
    }
    .r-dashboard .grid  .tile {
        height: 186px;
        padding: 12px;
    }


    /* create */

    .r-dashboard .create {
        position: relative;
        border: 1px dashed #3a84ff;
        background: #d8e6ff;
    }
    .r-dashboard .create svg {
        width: 48px;
        height: 48px;
        fill: #3a84ff;
    }
    .r-dashboard .create:hover {
        background: #c4daff;
    }


    /* template */

    .r-dashboard .template img {
        width: 242px;
        height: 137px;
        border: 1px solid #F0F0F0;
        object-fit: contain;
    }
    .r-dashboard .template p {
        padding-top: 12px;
        line-height: 13px;
        font-size: 13px;
        font-weight: 500;
    }


</style>



<!--
    Template
-->

<template>
    <div class="r-dashboard u-col">
        <item-header :loading="loading" />
        <div class="container u-flex">
            <div class="grid" v-show="!loading">


                <!-- create -->

                <router-link class="tile create u-fl" to="/new">
                    <icon-plus class="u-center" />
                </router-link>


                <!-- template -->

                <router-link class="tile template u-tile u-fl" v-for="template in templates" :to="`/${template.id}`" :key="template.id">
                    <img :src="template.image"/>
                    <p>{{template.name}}</p>
                </router-link>


            </div>
        </div>
    </div>
</template>



<!--
    Scripts
-->

<script>


    import Axios from '@/common/modules/axios'
    import itemHeader from './header.vue'
    import iconPlus from '@/assets/icons/plus.svg'
    import uiLoader from '@/components/ui/loader.vue'


    export default {

        components: {
            itemHeader,
            iconPlus,
            uiLoader
        },

        data () {
            return {
                templates: [],
                loading: true
            }
        },

        mounted () {
            Axios.call('list')
                .then(response => {
                    this.templates = response.data.data;
                })
                .finally(() => {
                    this.loading = false;
                })
        }

    }

</script>
