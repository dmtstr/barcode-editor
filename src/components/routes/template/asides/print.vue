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
            <p>Print</p>
        </div>

        <div class="u-fl field small" v-if="canvas">
            <label class="label">Width</label>
            <ui-number :value="template.width" @change="zoom('width', $event)"/>
        </div>

        <div class="u-fl field small" v-if="canvas">
            <label class="label">Height</label>
            <ui-number :value="template.height" @change="zoom('height', $event)"/>
        </div>

        <div class="u-fl field large">
            <label class="label">Barcode type</label>
            <ui-select :value="active.barcodeType" :options="barcodes" @change="generate($event, active.barText)"/>
        </div>

        <div class="u-fl field large">
            <label class="label">Bar text</label>
            <input class="f-input" type="text" :value="active.barText" @change="generate(active.barcodeType, $event.target.value)"/>
        </div>

        <div class="u-fl field large">
            <a class="u-fr f-button primary" @click="print">Print</a>
            <a class="u-fr f-button default" @click="reset">Reset</a>
        </div>

    </div>
</template>


<!--
    Scripts
-->

<script>


    import {mapState, mapActions} from 'vuex'
    import {fabric} from 'fabric'
    import barcodeMixin from '@/common/mixins/barcode'
    import uiNumber from '@/components/ui/number.vue'
    import uiSelect from '@/components/ui/select.vue'


    export default {

        components: {
            uiNumber,
            uiSelect
        },

        mixins: [
            barcodeMixin
        ],

        computed: {

            ...mapState('template', [
                'template',
                'canvas'
            ])

        },

        data() {
            return {
                active: null
            }
        },

        methods: {

            ...mapActions('template', [
                'cancel'
            ]),

            print() {
                window.print();
            },

            reset() {
                this.canvas.setViewportTransform([1,0,0,1,0,0]);
                this.cancel();
            },

            zoom (prop, value) {
                if (prop === 'width') this.canvas.setWidth(value);
                if (prop === 'height') this.canvas.setHeight(value);
                this.canvas.calcOffset();
                const cx = (this.template.width - this.canvas.width) / 2;
                const cy = (this.template.height - this.canvas.height) / 2;
                const sw = this.canvas.width / this.template.width;
                const sh = this.canvas.height / this.template.height;
                const zoom = Math.min(sw, sh);
                this.canvas.setZoom(1);
                this.canvas.absolutePan(new fabric.Point(cx, cy));
                this.canvas.zoomToPoint({
                    x: this.canvas.width / 2,
                    y: this.canvas.height / 2
                }, zoom);
            }

        },

        created() {
            this.active = this.canvas.getBarcode();
        }

    }

</script>

