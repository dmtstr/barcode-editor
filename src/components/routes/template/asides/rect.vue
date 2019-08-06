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
            <p class="u-fl">Rectangle</p>
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

        <div class="u-fl field small">
            <label class="label">Width</label>
            <ui-number :value="active.width * active.scaleX" @change="resize('scaleX', $event)" />
        </div>

        <div class="u-fl field small">
            <label class="label">Height</label>
            <ui-number :value="active.height * active.scaleY" @change="resize('scaleY', $event)" />
        </div>

        <div class="u-fl field large">
            <label class="label">Color</label>
            <ui-color :value="active.fill" @change="prop('fill', $event)" />
        </div>

    </div>
</template>


<!--
    Scripts
-->

<script>


    import asideMixin from '@/common/mixins/aside'
    import uiNumber from '@/components/ui/number.vue'
    import uiColor from '@/components/ui/color.vue'


    export default {

        components: {
            uiNumber,
            uiColor
        },

        mixins: [
            asideMixin
        ],

        methods: {

            resize (name, value) {
                let size;
                if (name === 'scaleX') size = this.active.width;
                if (name === 'scaleY') size = this.active.height;
                this.prop(name, value / size);
            },
        }

    }

</script>

