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
    .canvas.disabled {
        pointer-events: none;
    }

</style>



<!--
    Template
-->

<template>
    <div class="canvas" @click="deselect" :class="{disabled: !editing}">
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

        methods: {

            ...mapActions('template', [
                'activate'
            ]),

            deselect (event) {
                if (event.target !== this.$el) return;
                this.canvas.discardActiveObject(event);
                this.canvas.renderAll();
            },

            fit (barcode) {
                let image = barcode.item(0);
                const sw = barcode.getScaledWidth() / image.width;
                const sh = barcode.getScaledHeight() / image.height;
                const scale = Math.min(sw, sh);
                image.set('scaleX', 1 / barcode.scaleX * scale);
                image.set('scaleY', 1 / barcode.scaleY * scale);
            },

        },

        watch: {

            editing: {
                immediate: true,
                handler (value) {
                    if (!value) {
                        this.canvas.discardActiveObject();
                        this.canvas.renderAll();
                    }
                }
            }

        },

        mounted () {
            this.canvas.selection = false;
            this.canvas.backgroundColor = '#ffffff';
            this.canvas.on('selection:created', object => this.activate(object.target));
            this.canvas.on('selection:updated', object => this.activate(object.target));
            this.canvas.on('selection:cleared', ({e}) => e && this.activate(this.canvas));
            this.canvas.on('object:scaling', event => event.target.type === 'group' && this.fit(event.target));
            this.$refs.canvas.appendChild(this.canvas.wrapperEl);
        }

    }

</script>
