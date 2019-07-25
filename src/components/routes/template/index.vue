<!--
    Styles
-->

<style>


</style>



<!--
    Template
-->

<template>
    <div class="r-template u-col">


        <!-- header -->

        <item-header />


        <!-- content -->

        <div class="u-flex u-row" v-if="template">
            <item-toolbar class="bar" v-show="editing" />
            <div class="canvas u-flex">
                <item-canvas />
            </div>
            <item-aside class="bar"  />
        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>


    // imports

    import {mapState, mapActions} from 'vuex'
    import itemHeader from './header.vue'
    import itemToolbar from './toolbar.vue'
    import itemCanvas from './canvas.vue'
    import itemAside from './aside.vue'




    // exports

    export default {

        components: {
            itemHeader,
            itemToolbar,
            itemCanvas,
            itemAside
        },

        computed: {

            ...mapState('template', [
                'template',
                'editing'
            ]),

            fresh () {
                return this.$route.meta.type === 'fresh'
            }

        },

        methods: mapActions('template', [
            'reset',
            'init',
            'load'
        ]),

        mounted () {
            this.reset();
            if (this.fresh) this.init();
            else this.load(this.$route.params.id).catch(error => {
                error && this.$router.replace('/');
            });
        }


    }

</script>
