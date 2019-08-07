<!--
    Styles
-->

<style scoped>

    .toolbar {
        width: 80px;
    }
    .toolbar .action {
        width: 32px;
        height: 32px;
        padding: 4px;
        margin: 32px 24px;
    }
    .toolbar .action svg {
        fill: #94979b;
    }
    .toolbar .action:hover svg {
        fill: #2979FF;
    }

    .toolbar .action.image {
        position: relative;
        overflow: hidden;
    }
    .toolbar .action.image input {
        opacity: 0;
        text-indent: 32px;
        cursor: pointer;
    }

</style>



<!--
    Template
-->

<template>
    <div class="toolbar u-tile" v-show="editing">

        <a class="action" @click="object('text')">
            <icon-text />
        </a>

        <div class="action image">
            <input type="file" class="u-stretch" accept=".png, .jpg, .jpeg" @change="file" />
            <icon-image />
        </div>

        <a class="action" @click="object('rect')">
            <icon-rect />
        </a>

    </div>
</template>



<!--
    Scripts
-->

<script>


    import {fabric} from 'fabric'
    import {mapState, mapActions} from 'vuex'
    import Config from '@/common/configs/canvas'
    import iconText from '@/assets/icons/text.svg'
    import iconImage from '@/assets/icons/image.svg'
    import iconBarcode from '@/assets/icons/barcode.svg'
    import iconLine from '@/assets/icons/line.svg'
    import iconRect from '@/assets/icons/rect.svg'


    const MAX = 1;
    const MB = 1000000;


    export default {

        components: {
            iconText,
            iconImage,
            iconBarcode,
            iconLine,
            iconRect
        },

        computed: {
            ...mapState('template', [
                'editing',
                'canvas'
            ])
        },

        methods: {

            ...mapActions({
                error: 'toasts/error'
            }),

            object (type) {
                fabric.util.enlivenObjects([Config[type]], ([object]) => this.add(object));
            },

            file (event) {
                const file = event.target.files[0];
                if (file.size > MAX * MB) return this.error(`File size should be less than ${MAX} MB`);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => fabric.Image.fromURL(reader.result, image => {
                    const sw = Math.min(this.canvas.width / image.width, 1);
                    const sh =  Math.min(this.canvas.height / image.height, 1);
                    const scale = Math.min(sw, sh);
                    image.set('scaleX', scale);
                    image.set('scaleY', scale);
                    image.set('top', 0);
                    image.set('left', 0);
                    this.add(image);
                });
            },

            add (object) {
                this.canvas.add(object);
                this.canvas.setActiveObject(object);
            }

        }


    }


</script>
