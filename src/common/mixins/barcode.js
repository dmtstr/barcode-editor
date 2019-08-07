import {mapActions} from 'vuex'
import {fabric} from 'fabric'
import bwipjs from 'bwip-js';
let canvas = document.createElement('canvas');


export default {

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
                    this.active.setCoords();
                    this.canvas.requestRenderAll();
                    this.active.trigger('scaling');
                });
            });

        }

    }

}
