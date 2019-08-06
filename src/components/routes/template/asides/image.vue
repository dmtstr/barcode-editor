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

        <div class="title u-clear">
            <p class="u-fl">Image</p>
            <a class="u-fr" @click="remove()"><icon-delete /></a>
            <a class="u-fr" :class="{disabled: last}" @click="backwards()"><icon-down /></a>
            <a class="u-fr" :class="{disabled: first}" @click="forwards()"><icon-up /></a>
        </div>

        <div class="u-fl field small">
            <label class="label">Left</label>
            <ui-number :value="active.left" @change="prop('left', $event)" />
        </div>

        <div class="u-fl field small">
            <label class="label">Top</label>
            <ui-number :value="active.top" @change="prop('top', $event)" />
        </div>

        <div class="u-fl field large">
            <label class="label">Scale</label>
            <ui-number :value="active.scaleX" @change="scale($event)" />
        </div>

    </div>
</template>


<!--
    Scripts
-->

<script>


    import asideMixin from '@/common/mixins/aside'
    import uiNumber from '@/components/ui/number.vue'


    export default {

        components: {
            uiNumber
        },

        mixins: [
            asideMixin
        ],

        methods: {

            scale (value) {
                this.active.set('scaleX', value);
                this.active.set('scaleY', value);
                this.render();
            },
        }

    }

</script>

