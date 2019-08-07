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
            <p class="u-fl">Barcode</p>
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
            <ui-number :value="active.width * active.scaleX" @change="size('scaleX', $event)" />
        </div>

        <div class="u-fl field small">
            <label class="label">Height</label>
            <ui-number :value="active.height * active.scaleY" @change="size('scaleY', $event)" />
        </div>

        <div class="u-fl field large">
            <label class="label">Barcode type</label>
            <ui-select :value="active.barcodeType" :options="barcodes" @change="generate($event, active.barText)"/>
        </div>

        <div class="u-fl field large">
            <label class="label">Bar text</label>
            <input class="f-input" type="text" :value="active.barText" @change="generate(active.barcodeType, $event.target.value)"/>
        </div>

    </div>
</template>


<!--
    Scripts
-->

<script>


    import {mapActions} from 'vuex'
    import barcodeMixin from '@/common/mixins/barcode'
    import asideMixin from '@/common/mixins/aside'
    import uiNumber from '@/components/ui/number.vue'
    import uiSelect from '@/components/ui/select.vue'


    export default {

        components: {
            uiNumber,
            uiSelect
        },

        mixins: [
            asideMixin,
            barcodeMixin
        ],

        methods: {

            size (name, value) {
                let size;
                if (name === 'scaleX') size = this.active.width;
                if (name === 'scaleY') size = this.active.height;
                this.prop(name, value / size);
                this.canvas.trigger('object:scaling', {target: this.active});
            }

        }

    }

</script>

