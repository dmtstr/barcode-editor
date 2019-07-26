<!--
    Styles
-->

<style>


    /* main */

    .ui-color {
        position: relative;
    }
    .ui-color input {
        padding-right: 44px;
    }
    .ui-color .color {
        position: absolute;
        right: 10px;
        top: 10px;
        height: 16px;
        width: 24px;
        border-radius: 2px;
    }


    /* picker */

    .ui-color .picker {
        position: absolute;
        right: 0;
        top: calc(100% + 8px);
        padding: 8px 8px 0 8px;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4) !important;
    }
    .ui-color .picker:before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background: #fff;
        transform: rotate(45deg);
        top: -4px;
        right: 17px;
        box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.1);
    }
    .ui-color .picker .vc-chrome-color-wrap,
    .ui-color .picker .vc-chrome-alpha-wrap,
    .ui-color .picker .vc-chrome-fields-wrap {
        display: none;
    }
    .ui-color .picker .vc-chrome-hue-wrap {
        margin-bottom: 0;
    }
    .ui-color .picker .vc-chrome-body {
        padding: 12px 6px;
    }


</style>



<!--
    Template
-->

<template>
    <div class="ui-color">

        <input class="f-input" type="text" :value="value" />
        <a class="color" :style="{background: value}" @click="toggle"></a>
        <picker class="picker u-tile" v-show="picker" :value="value" @input="input" v-outside="hide"></picker>

    </div>
</template>



<!--
    Scripts
-->

<script>



    import {Chrome} from 'vue-color'
    import clickOutside from '@/common/directives/click-outside'



    export default {

        components: {
            picker: Chrome
        },

        directives: {
            outside: clickOutside()
        },

        props: [
            'value'
        ],

        data () {
            return {
                picker: false
            }
        },

        methods: {

            toggle (event) {
                this.picker = !this.picker;
                event.stopPropagation();
            },

            hide () {
                this.picker = false;
            },

            input ({hex}) {
                this.$emit('input', hex);
            },

        }

    }

</script>
