<!--
    Styles
-->

<style>
    
</style>



<!--
    Template
-->

<template>
    <div class="toolbar">
        <a @click="action('text')">
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
        <a>
            <icon-rect />
        </a>
    </div>
</template>



<!--
    Scripts
-->

<script>


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

            action (name) {
                this.$emit('action', name)
            }

        }


    }


</script>
