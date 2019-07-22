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
            <input type="text" v-show="!loading" :value="template && template.name" :disabled="!editing" @input="$emit('name', $event.target.value)"/>
        </template>


        <!-- buttons -->

        <template v-slot:buttons>
            <a class="f-button default" v-show="!editing" @click="$emit('remove')">Delete</a>
            <a class="f-button primary" v-show="!editing" @click="$emit('edit')">Edit</a>
            <a class="f-button default" v-show="editing" @click="$emit('cancel')">Cancel</a>
            <a class="f-button primary" v-show="editing" @click="$emit('save')">Save</a>
        </template>


    </layout-header>
</template>



<!--
    Scripts
-->

<script>


    import layoutHeader from '@/components/layout/header.vue'
    import iconBack from '@/assets/icons/back.svg'


    export default {

        components: {
            layoutHeader,
            iconBack
        },

        props: [
            'editing',
            'loading',
            'template'
        ]

    }
</script>
