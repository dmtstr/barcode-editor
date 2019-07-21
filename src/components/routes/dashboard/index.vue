<!--
    Styles
-->

<style>

    .r-dashboard .header {
        position: relative;
        z-index: 1;
    }
    .r-dashboard .loader {
        top: 100%;
    }
    .r-dashboard .container {
        overflow: auto;
        padding: 64px 0;
    }

</style>



<!--
    Template
-->

<template>
    <div class="r-dashboard u-col">

        <div class="header">
            <item-header />
            <ui-loader class="loader" v-show="loading" />
        </div>

        <div class="container u-flex">
            <item-content :templates="templates" v-show="!loading" />
        </div>

    </div>
</template>



<!--
    Scripts
-->

<script>


    import Axios from '@/common/modules/axios'
    import uiLoader from '@/components/ui/loader.vue'
    import itemHeader from './header.vue'
    import itemContent from './content.vue'


    export default {

        components: {
            uiLoader,
            itemHeader,
            itemContent
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
