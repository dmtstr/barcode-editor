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
    <div class="toolbar u-tile">

        <a class="action" @click="emit(['add', 'text'])">
            <icon-text />
        </a>

        <div class="action image">
            <input type="file" class="u-stretch" accept="image/*" @change="file" />
            <icon-image />
        </div>

        <a class="action" @click="emit(['add', 'rect'])">
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

        methods: {

            ...mapActions({
                emit: 'template/emit',
                error: 'toasts/error'
            }),

            file (event) {
                const file = event.target.files[0];
                if (file.size > MAX * MB) return this.error(`File size should be less than ${MAX} MB`);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => this.emit(['image', reader.result]);

            }

        }


    }


</script>
