<!--
    Styles
-->

<style>

    .l-header {
        height: 64px;
        background: #FFFFFF;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.03);
        padding: 16px 24px;
    }



    .l-header .icon svg {
        width: 24px;
        height: 24px;
        fill: #94979b;
        margin: 4px;
    }
    .l-header .icon a {
        float: left;
    }
    .l-header .icon a svg {
        fill: #2979FF;
    }

    .l-header .title {
        padding: 0 24px;
        line-height: 32px;
        font-size: 16px;
        /*font-weight: 300;*/
        color: #1b253a;
    }


    .l-header a.icon {
        fill: #2979FF;
    }

    .l-header .buttons a {
        float: left;
        text-align: center;
        margin-left: 12px;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
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

    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex';


    export default {

        components: {

        },

        computed: {

            ...mapState('header', [
                'title',
                'show'
            ]),

            dashboard () {
                return this.$route.name === 'dashboard'
            },

            display () {
                return this.$route.name === 'display'
            }

        }

    }

</script>
