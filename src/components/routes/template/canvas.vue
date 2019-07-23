<!--
    Styles
-->

<style>
    
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


    const create = () => {

    }


    export default {

        props: [
            'template'
        ],

        data () {
            return {
                canvas: null,
                active: null
            }
        },

        methods: {

            add (options) {
                fabric.util.enlivenObjects([options], ([object]) => {
                    this.canvas.add(object);
                    this.canvas.setActiveObject(object);
                });
            },

            update (prop, value) {

                this.active.set(prop, +value);
                this.active.setCoords();
                this.canvas.requestRenderAll();

            },

            remove () {

            }

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
            this.canvas.loadFromJSON(this.template.content, () => {
                this.canvas.renderAll()
            });
            this.canvas.on('selection:created', object => {
                this.active = object.target;
                this.$emit('activate', this.active);
            });
            this.canvas.on('selection:updated', object => {
                this.active = object.target;
                this.$emit('activate', this.active);
            });
        }

    }

</script>
