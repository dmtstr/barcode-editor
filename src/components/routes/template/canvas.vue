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
    <div class="canvas">
        <div class="u-tile" ref="canvas"></div>
    </div>
</template>



<!--
    Scripts
-->

<script>


    import {fabric} from 'fabric'
    import {mapState, mapActions} from 'vuex'


    fabric.Object.prototype.set({
        transparentCorners: false,
        borderColor: '#3a84ff',
        cornerColor: '#3a84ff',
        cornerSize: 6,
        padding: 2,
        lockRotation: true,
        hasRotatingPoint: false
    });


    export default {

        computed: {

            ...mapState('template', [
                'template',
                'active',
                'canvas'
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

            resize (prop, value) {
                if (prop === 'width') this.canvas.setWidth(value);
                if (prop === 'height') this.canvas.setHeight(value);
                this.canvas.calcOffset();
            },

            add (type) {
                fabric.util.enlivenObjects([options], ([object]) => {
                    this.canvas.add(object);
                    this.canvas.setActiveObject(object);
                });
            }

        },

        mounted () {
            this.$refs.canvas.appendChild(this.canvas.wrapperEl);
            this.canvas.on('selection:created', object => this.activate(object.target));
            this.canvas.on('selection:updated', object => this.activate(object.target));
            this.on(['resize', this.resize]);
            this.on(['prop', this.prop]);
            this.on(['add', this.add]);
        }

    }

</script>
