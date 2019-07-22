<!--
    Styles
-->

<style>



    .r-template .toolbar {
        position: relative;
        z-index: 1;
        width: 80px;
        background: #ffffff;
        box-shadow: 0 0 5px 0 rgba(232, 232, 232, 0.53);
    }
    .r-template .toolbar a {
        width: 32px;
        height: 32px;
        padding: 4px;
        margin: 32px 24px;
    }
    .r-template .toolbar a svg {
        fill: #94979b;
    }
    .r-template .toolbar a:hover svg {
        fill: #2979FF;
    }

    .r-template .aside {
        position: relative;
        z-index: 1;
        width: 320px;
        background: #ffffff;
        box-shadow: 0 0 5px 0 rgba(232, 232, 232, 0.53);
    }

    .r-template .canvas {
        font-size: 0;
        padding: 32px;
        text-align: center;
        overflow: auto;
        white-space: nowrap;
    }
    .r-template .canvas:before {
        content: '';
        height: 100%;
        display: inline-block;
        vertical-align: middle;
    }
    .r-template .canvas canvas {
        display: inline-block;
        vertical-align: middle;
        background: #ffffff;
        box-shadow: 0 0 5px 0 rgba(232, 232, 232, 0.53);
    }



</style>



<!--
    Template
-->

<template>
    <div class="r-template u-col">


        <!-- header -->

        <item-header :editing="editing"
                     :template="template"
                     :loading="loading"
                     @edit="edit"
                     @remove="remove"
                     @save="save"
                     @cancel="cancel"
                     @name="name"/>






        <!-- content -->

        <div class="u-flex u-row">

            <item-toolbar v-show="editing"/>

            <div class="canvas u-flex">

                <canvas width="800" height="600"></canvas>

            </div>

            <div class="aside"></div>


        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import Axios from '@/common/modules/axios'
    import {mapState, mapActions} from 'vuex'

    import itemHeader from './header.vue'
    import itemToolbar from './toolbar.vue'


    const defaults = {
        name: 'New template',
        width: 800,
        height: 600,
        content: []
    };


    export default {

        components: {
            itemHeader,
            itemToolbar
        },

        computed: {

            fresh () {
                return this.$route.meta.type === 'fresh';
            }

        },

        data () {
            return {
                editing: false,
                loading: false,
                cache: null,
                template: null
            }
        },

        methods: {

            ...mapActions('toasts', [
                'success'
            ]),


            init () {
                if (this.fresh) {
                    this.editing = true;
                    this.template = Object.assign({}, defaults);
                }
                else {
                    this.loading = 'Loading...';
                    Axios.call('get', this.$route.params.id)
                        .then(response => {
                            this.template = response.data.data;
                            this.loading = false;
                        })
                        .catch(error => {
                            error && this.$router.replace('/');
                        })

                }
            },

            save () {
                const key = this.fresh ? 'create' : 'update';
                this.editing = false;
                this.loading = 'Saving...';
                Axios.call(key, this.template)
                    .then(response => {
                        this.loading = false;
                        this.success('The template has been successfully saved');
                        if (this.fresh) {
                            this.template.id = response.data.data.id;
                            this.$router.replace('/' + this.template.id);
                        }
                    })
            },

            cancel () {
                if (this.fresh) {
                    this.$router.push('/');
                }
                else {
                    this.editing = false;
                    this.template = this.cache;
                }
            },

            edit () {
                this.editing = true;
                this.cache = JSON.parse(JSON.stringify(this.template));
            },

            remove () {
                this.loading = 'Deleting...';
                Axios.call('remove', this.template.id)
                    .then(() => {
                        this.success('The template has been successfully deleted');
                    })
                    .finally(() => {
                        this.$router.replace('/');
                    })
            },

            name (value) {
                this.template.name = value;
            }


        },

        mounted () {

            console.log('here');
            this.init();

//            this[this.type].init();

//            init();


//            if (this.$route.name === 'template') {
////                this.set({edit: false});
////
////                Axios.call('get', this.$route.params.id)
////                    .then(response => {
////                        console.log(response)
////                    })
////                    .catch(error => {
////                        this.$router.replace('/');
////                    })
//            }
//            else {
//                this.set({
//                    edit: false,
//                    template: []
//                });
//
//                // edit true
//                // set blank template
//            }

        }


    }

</script>
