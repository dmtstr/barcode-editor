<!--
    Styles
-->

<style>

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
        <item-header :loading="loading" />
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
    import itemHeader from './header.vue'
    import itemContent from './content.vue'


    export default {

        components: {
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
