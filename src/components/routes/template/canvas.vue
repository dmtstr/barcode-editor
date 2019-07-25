<!--
    Styles
-->

<style>

    .canvas-container {
        background: #fff;
        margin: 24px;
    }

</style>



<!--
    Template
-->

<template>
    <canvas></canvas>
</template>



<!--
    Scripts
-->

<script>


    import {fabric} from 'fabric'
    import {mapState, mapMutations, mapActions} from 'vuex'


    fabric.Object.prototype.set({
        transparentCorners: false,
        borderColor: '#3a84ff',
        cornerColor: '#3a84ff',
        cornerSize: 6,
        padding: 2
    });

    export default {

        data () {
            return {
                canvas: null
            }
        },

        computed: {

            ...mapState('template', [
                'template',
                'active'
            ])

        },

        methods: {

            ...mapMutations('template', [
                'setCanvas'
            ]),

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

            rotate (angle) {
                this.active.rotate(angle);
                this.render();
            },

//            add (options) {
//                fabric.util.enlivenObjects([options], ([object]) => {
//                    this.canvas.add(object);
//                    this.canvas.setActiveObject(object);
//                });
//            },
//
//            update (prop, value) {
//
//                this.active.set(prop, +value);
//                this.active.setCoords();
//                this.canvas.requestRenderAll();
//
//            },
//
//            remove () {
//
//            }

//            text (data) {
//                this.canvas.add(new fabric.Text(data.value, data.option));
//            },
//
//            draw () {
//                this.canvas.setWidth(this.template.width);
//                this.canvas.setHeight(this.template.height);
//
//                this.template.content.forEach(item => {
//
//                    if (!item.shape) item.shape = create();
//
//                    this[item.type](item);
//                });
//            }

        },


        mounted () {

            this.canvas = new fabric.Canvas(this.$el);
            this.canvas.setWidth(this.template.width);
            this.canvas.setHeight(this.template.height);
            this.canvas.loadFromJSON(this.template.content, () => this.canvas.renderAll());
            this.canvas.on('selection:created', object => this.activate(object.target));
            this.canvas.on('selection:updated', object => this.activate(object.target));

            this.on(['prop', this.prop]);
            this.on(['rotate', this.rotate]);
            this.setCanvas(this.canvas);

        }

    }

</script>
