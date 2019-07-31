<!--
    Styles
-->

<style>


    /* main */

    .l-header {
        position: relative;
        height: 64px;
        background: #FFFFFF;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.03);
        padding: 16px 24px;
        z-index: 10;
    }


    /* icon */

    .l-header .icon {
        width: 32px;
        height: 32px;
        padding: 4px;
    }
    .l-header .icon svg {
        width: 100%;
        height: 100%;
        fill: #94979b;
    }
    .l-header .icon a svg {
        fill: #2979FF;
    }


    /* icon */

    .l-header .title {
        padding: 0 24px;
        line-height: 32px;
        font-size: 16px;
        color: #1b253a;
    }
    .l-header .title input {
        height: 32px;
        max-width: 400px;
        border-bottom: 1px solid #dbdfe9;
    }
    .l-header .title input:disabled {
        border-bottom-color: transparent;
    }
    .l-header .title input:focus {
        border-bottom-color: #2979FF;
    }


    /* buttons */

    .l-header .buttons a {
        float: left;
        text-align: center;
        margin-left: 12px;
    }


    /* loader */

    .l-header .loader {
        top: 100%;
    }


</style>



<!--
    Template
-->

<template>
    <div class="l-header u-clear">

        <div class="icon u-fl">
            <slot name="icon" />
        </div>

        <div class="buttons u-clear u-fr">
            <slot name="buttons" />
        </div>

        <div class="title u-ff">
            <slot name="title" />
        </div>

        <ui-loader class="loader" v-show="loading" />

    </div>
</template>



<!--
    Scripts
-->

<script>

    import uiLoader from '@/components/ui/loader.vue'


    export default {

        components: {
            uiLoader
        },

        props: [
            'loading'
        ]

    }

</script>
