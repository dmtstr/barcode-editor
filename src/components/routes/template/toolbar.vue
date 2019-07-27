<!--
    Styles
-->

<style scoped>

    .toolbar {
        width: 80px;
    }
    .toolbar a {
        width: 32px;
        height: 32px;
        padding: 4px;
        margin: 32px 24px;
    }
    .toolbar a svg {
        fill: #94979b;
    }
    .toolbar a:hover svg {
        fill: #2979FF;
    }

</style>



<!--
    Template
-->

<template>
    <div class="toolbar u-tile">
        <a @click="emit(['add', 'text'])">
            <icon-text />
        </a>
        <a>
            <icon-image />
        </a>
        <a>
            <icon-barcode />
        </a>
        <a>
            <icon-line />
        </a>
        <a @click="emit(['add', 'rect'])">
            <icon-rect />
        </a>
    </div>
</template>



<!--
    Scripts
-->

<script>


    import {mapActions} from 'vuex'
    import iconText from '@/assets/icons/text.svg'
    import iconImage from '@/assets/icons/image.svg'
    import iconBarcode from '@/assets/icons/barcode.svg'
    import iconLine from '@/assets/icons/line.svg'
    import iconRect from '@/assets/icons/rect.svg'


    export default {

        components: {
            iconText,
            iconImage,
            iconBarcode,
            iconLine,
            iconRect
        },

        methods: {

            ...mapActions('template', [
                'emit'
            ])

        }


    }


</script>
