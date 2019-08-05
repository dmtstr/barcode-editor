<!--
    Styles
-->

<style>

</style>


<!--
    Template
-->

<template>

    <div class="u-clear">

        <div class="title">
            <p>Canvas</p>
        </div>

        <div class="u-fl field large">
            <label class="label">Width</label>
            <ui-number :value="active.width" @change="resize('width', $event)" />
        </div>

        <div class="u-fl field large">
            <label class="label">Height</label>
            <ui-number :value="active.height" @change="resize('height', $event)" />
        </div>

    </div>

</template>


<!--
    Scripts
-->

<script>


    import {mapState} from 'vuex'
    import uiNumber from '@/components/ui/number.vue'


    export default {

        components: {
            uiNumber
        },

        computed: mapState('template', [
            'active'
        ]),

        methods: {

            resize () {
                console.log('here')
            }

        }

    }

</script>

