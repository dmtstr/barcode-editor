<!--
    Styles
-->

<style>

    .r-template .bar {
        position: relative;
        z-index: 1;
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
    .r-template .canvas > * {
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

        <div class="u-flex u-row" v-if="template">
            <item-toolbar class="bar" v-show="editing" @action="action"/>
            <div class="canvas u-flex">
                <item-canvas :template="template" ref="canvas" @activate="activate"/>
            </div>
            <item-aside class="bar" :active="active" @update="update" />
        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>


    // imports

    import {mapState, mapActions} from 'vuex'
    import Axios from '@/common/modules/axios'
    import Config from '@/common/configs/canvas'
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

        data () {
            return {
                editing: false,
                loading: false,
                cache: null,
                template: null,
                active: null
            }
        },

        computed: {

            fresh () {
                return this.$route.meta.type === 'fresh';
            },

            canvas () {
                return this.$refs.canvas;
            },

        },

        methods: {

            ...mapActions('toasts', [
                'success'
            ]),

            init () {
                if (this.fresh) {
                    this.editing = true;
                    this.template = Object.assign({}, Config.template);
                    this.active = this.template;
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
                if (this.fresh) return this.$router.push('/');
                this.editing = false;
                this.template = this.cache;
            },

            edit () {
                this.editing = true;
                this.cache = JSON.parse(JSON.stringify(this.template));
            },

            remove () {
                this.loading = 'Deleting...';
                Axios.call('remove', this.template.id)
                    .then(() => this.success('The template has been successfully deleted'))
                    .finally(() => this.$router.replace('/'));
            },

            name (value) {
                this.template.name = value;
            },

            action (type) {
                this.canvas.add(Config[type]());
            },

            activate (object) {
                this.active = object;
            },

            update (prop, value) {
                this.canvas.update(prop, value);
            }

        },


        mounted () {
            this.init();
        }


    }

</script>
