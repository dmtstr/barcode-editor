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


    import {fabric} from 'fabric'
    import {mapState, mapActions} from 'vuex'
    import Defaults from '@/common/configs/canvas'


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


    export default {

        computed: {

            ...mapState('template', [
                'template',
                'active',
                'canvas',
                'editing'
            ])

        },

        methods: {

            ...mapActions('template', [
                'activate',
                'on'
            ]),

            render () {
                this.active.setCoords();
                this.canvas.requestRenderAll();
            },

            prop (prop, value) {
                this.active.set(prop, value);
                this.render();
            },

            font (weight, style) {
                this.active.set('fontWeight', weight);
                this.active.set('fontStyle', style);
                this.render();
            },

            scale (value) {
                this.active.set('scaleX', value);
                this.active.set('scaleY', value);
                this.render();
            },

            resize (prop, value) {
                if (prop === 'width') this.canvas.setWidth(value);
                if (prop === 'height') this.canvas.setHeight(value);
                this.canvas.calcOffset();
            },

            add (type) {
                fabric.util.enlivenObjects([Defaults[type]], ([object]) => {
                    this.canvas.add(object);
                    this.canvas.setActiveObject(object);
                });
            },

            image (data) {
                fabric.Image.fromURL(data, image => {
                    const sw = Math.min(this.canvas.width / image.width, 1);
                    const sh =  Math.min(this.canvas.height / image.height, 1);
                    const scale = Math.min(sw, sh);
                    image.set('scaleX', scale);
                    image.set('scaleY', scale);
                    image.set('top', 0);
                    image.set('left', 0);
                    this.canvas.add(image);
                    this.canvas.setActiveObject(image);
                });
            },

            remove () {
                this.canvas.remove(this.active);
            },

            backwards () {
                this.active.sendBackwards();
            },

            forwards () {
                this.active.bringForward();
            },

            deselect (event) {
                event.target === this.$el && this.canvas.discardActiveObject().renderAll();
            },

            test () {

            }

        },

        watch: {

            editing: {
                immediate: true,
                handler (value) {

                    console.log('here');

                    if (!value) {
                        this.canvas.discardActiveObject();
                    }
                    this.canvas.forEachObject(object => object.selectable = value);
                    this.canvas.renderAll();
                }
            }

        },

        mounted () {


            this.$refs.canvas.appendChild(this.canvas.wrapperEl);
            this.canvas.selection = false;
            this.canvas.on('selection:created', object => this.activate(object.target));
            this.canvas.on('selection:updated', object => this.activate(object.target));
            this.canvas.on('selection:cleared', () => this.activate(this.template));
            this.on(['resize', this.resize]);
            this.on(['prop', this.prop]);
            this.on(['scale', this.scale]);
            this.on(['font', this.font]);
            this.on(['add', this.add]);
            this.on(['image', this.image]);
            this.on(['remove', this.remove]);
            this.on(['backwards', this.backwards]);
            this.on(['forwards', this.forwards]);


//            this.canvas.on('object:moving', object => console.log(object.target));




        }

    }

</script>
