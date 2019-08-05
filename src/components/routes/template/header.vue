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
            <router-link to="/"><icon-back /></router-link>
        </template>


        <!-- title -->

        <template v-slot:title>
            <span v-show="loading">{{loading}}</span>
            <input type="text" v-show="!loading" :value="template && template.name" :disabled="!editing" ref="name" />
        </template>


        <!-- buttons -->

        <template v-slot:buttons>
            <div v-show="!loading">

                <a class="f-button default" v-show="!editing" @click="remove(removed)">Delete</a>
                <a class="f-button primary" v-show="!editing" @click="edit()">Edit</a>

                <router-link class="f-button default" v-show="fresh && editing" to="/">Cancel</router-link>
                <a class="f-button primary" v-show="fresh && editing" @click="create(name).then(created)">Save</a>

                <a class="f-button default" v-show="!fresh && editing" @click="cancel()">Cancel</a>
                <a class="f-button primary" v-show="!fresh && editing" @click="update(updated)">Save</a>

            </div>
        </template>


    </layout-header>
</template>



<!--
    Scripts
-->

<script>


    import {mapState, mapMutations, mapActions} from 'vuex'
    import layoutHeader from '@/components/layout/header.vue'
    import iconBack from '@/assets/icons/back.svg'


    export default {

        components: {
            layoutHeader,
            iconBack
        },

        computed: {

            ...mapState('template', [
                'editing',
                'loading',
                'template'
            ]),

            fresh () {
                return this.$route.meta.type === 'fresh'
            },

            name () {
                return this.$refs.name.value;
            },

        },

        methods: {

            ...mapMutations('template', [
                'setName'
            ]),

            ...mapActions({
                'create': 'template/create',
                'update': 'template/update',
                'cancel': 'template/cancel',
                'edit': 'template/edit',
                'remove': 'template/remove',
                'success': 'toasts/success'
            }),

            created ({id}) {
                this.success('The template has been successfully saved');
                this.$router.replace('/' + id);
            },

            updated () {
                this.success('The template has been successfully saved');
            },

            removed () {
                this.success('The template has been removed');
                this.$router.replace('/');
            }

        }

    }
</script>
