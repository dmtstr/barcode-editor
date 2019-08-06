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


    import {fabric} from 'fabric'
    import bwipjs from 'bwip-js';
    import {mapActions} from 'vuex'
    import asideMixin from '@/common/mixins/aside'
    import uiNumber from '@/components/ui/number.vue'
    import uiSelect from '@/components/ui/select.vue'


    let canvas = document.createElement('canvas');


    export default {

        components: {
            uiNumber,
            uiSelect
        },

        mixins: [
            asideMixin
        ],

        data () {
            return {
                barcodes: [
                    {value: 'code128', label: 'Code 128'},
                    {value: 'code39', label: 'Code 39'},
                    {value: 'ean13', label: 'EAN-13'},
                    {value: 'ean8', label: 'EAN-8' },
                    {value: 'upca', label: 'UPC-A'},
                    {value: 'upce', label: 'UPC-E'}
                ]
            }
        },

        methods: {

            ...mapActions('toasts', [
               'error'
            ]),

            size (name, value) {
                let size;
                if (name === 'scaleX') size = this.active.width;
                if (name === 'scaleY') size = this.active.height;
                this.prop(name, value / size);
                this.active.trigger('scaling');
            },

            generate (type, text) {
                bwipjs(canvas, {
                    bcid: type,
                    text: text,
                    includetext: true
                }, err => {
                    if (err) this.error(err.split('at')[0]);
                    const image = err ? '/error.png' : canvas.toDataURL('image/png');
                    this.active.set('barcodeType', type);
                    this.active.set('barText', text);
                    fabric.Image.fromURL(image, image => {
                        image.set('originX', 'center');
                        image.set('originY', 'center');
                        this.active.remove(this.active.item(0));
                        this.active.add(image);
                        this.render();
                        this.active.trigger('scaling');
                    });
                });

            },

        }

    }

</script>

