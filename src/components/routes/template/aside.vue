<!--
    Styles
-->

<style scoped>


    /* main */

    .aside {
        width: 320px;
        padding: 48px 12px;
    }


    /* title */

    /deep/ .title {
        margin-bottom: 32px;
        padding: 0 12px;
    }
    /deep/ .title p {
        font-size: 18px;
        color: #1b253a;
        line-height: 20px;
    }
    /deep/ .title a {
        margin-left: 8px;
    }
    /deep/ .title a svg {
        width: 20px;
        height: 20px;
        fill: #94979b;
    }
    /deep/ .title a:hover svg {
        fill: #3a84ff;
    }
    /deep/ .title a.disabled {
        pointer-events: none;
    }
    /deep/ .title a.disabled svg {
        opacity: 0.4;
    }


    /* label */

    /deep/ .label {
        display: block;
        font-size: 12px;
        color: #989898;
        margin-bottom: 8px;
    }


    /* field */

    /deep/ .field {
        margin-bottom: 24px;
        padding: 0 12px;
    }
    /deep/ .field.large {
        width: 100%;
    }
    /deep/ .field.small {
        width: 50%;
    }
    /deep/ .field.medium {
        width: 70%;
    }
    /deep/ .field.micro {
        width: 30%;
    }


</style>



<!--
    Template
-->

<template>
    <div class="aside u-tile">
        <component :is="'aside' + component" />
    </div>
</template>



<!--
    Scripts
-->

<script>


    import {mapState} from 'vuex'
    import asideBarcode from './asides/barcode.vue'
    import asideCanvas from './asides/canvas.vue'
    import asideImage from './asides/image.vue'
    import asidePrint from './asides/print.vue'
    import asideRect from './asides/rect.vue'
    import asideText from './asides/text.vue'

    
    export default {

        components: {
            asideBarcode,
            asideCanvas,
            asideImage,
            asidePrint,
            asideRect,
            asideText
        },

        data () {
            return {

            }
        },

        computed: {

            ...mapState('template', [
                'active'
            ]),

            component () {
                if (!this.active) return 'Print';
                if (!this.active.type) return 'Canvas';
                if (this.active.type === 'group') return 'Barcode';
                if (this.active.type === 'i-text') return 'Text';
                if (this.active.type === 'rect') return 'Rect';
                if (this.active.type === 'image') return 'Image';
            }

        }

    }

</script>
