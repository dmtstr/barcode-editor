<!--
    Styles
-->

<style scoped>

    .canvas {
        font-size: 0;
        white-space: nowrap;
        text-align: center;
        padding: 24px;
        overflow: auto;
    }
    .canvas:before {
        content: '';
        height: 100%;
        display: inline-block;
        vertical-align: middle;
    }
    .canvas > * {
        display: inline-block;
        vertical-align: middle;
    }

</style>



<!--
    Template
-->

<template>
    <div class="canvas" @click="deselect">
        <div class="u-tile" ref="canvas"></div>
    </div>
</template>



<!--
    Scripts
-->

<script>


    // imports

    import {fabric} from 'fabric'
    import {mapState, mapActions} from 'vuex'


    // fabric prototypes

    fabric.Canvas.prototype.getBarcode = function() {
        return this.getObjects().find(object => object.type === 'group');
    };

    fabric.Object.prototype.set({
        transparentCorners: false,
        borderColor: '#3a84ff',
        cornerColor: '#3a84ff',
        cornerSize: 6,
        padding: 2,
        lockRotation: true,
        hasRotatingPoint: false
    });

    fabric.Image.prototype.set({
        lockUniScaling: true
    });


    // exports

    export default {

        computed: mapState('template', [
            'canvas',
            'editing'
        ]),

        data () {
            return {
                barcode: null
            }
        },

        methods: {

            ...mapActions('template', [
                'activate'
            ]),

            deselect (event) {
                if (event.target !== this.$el) return;
                this.canvas.discardActiveObject(event);
                this.canvas.renderAll();
            },

            fit () {
                let image = this.barcode.item(0);
                const sw = this.barcode.getScaledWidth() / image.width;
                const sh = this.barcode.getScaledHeight() / image.height;
                const scale = Math.min(sw, sh);
                image.set('scaleX', 1 / this.barcode.scaleX * scale);
                image.set('scaleY', 1 /this.barcode.scaleY * scale);
            },

        },

        watch: {

            editing: {
                immediate: true,
                handler (value) {
                    if (!value) {
                        this.canvas.discardActiveObject();
                    }
                    this.canvas.forEachObject(object => {
                        object.selectable = value;
                        object.evented = value;
                    });
                    this.canvas.renderAll();
                }
            }

        },

        mounted () {
            this.canvas.selection = false;
            this.canvas.backgroundColor = '#ffffff';
            this.canvas.on('selection:created', object => this.activate(object.target));
            this.canvas.on('selection:updated', object => this.activate(object.target));
            this.canvas.on('selection:cleared', ({e}) => e && this.activate(this.canvas));
            this.barcode = this.canvas.getBarcode();
            this.barcode.on('scaling', this.fit);
            this.$refs.canvas.appendChild(this.canvas.wrapperEl);
        }

    }

</script>
