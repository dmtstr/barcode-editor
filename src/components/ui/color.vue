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

        <input class="f-input" type="text" :value="value" @change="change" />
        <a class="color" :style="{background: value}" @click="toggle"></a>
        <picker class="picker u-tile" v-show="picker" :value="value" @input="input" v-outside="hide"></picker>

    </div>
</template>



<!--
    Scripts
-->

<script>


    // imports

    import {Chrome} from 'vue-color'
    import clickOutside from '@/common/directives/click-outside'


    // helpers

    const parse = string => {
        return ((parseInt(string, 16) || 0).toString(16) + '0').substr(0, 2);
    };

    const validate = hex => {
        if (hex[0] !== '#') hex = '#' + hex;
        let value = hex.substr(1, 6) || '0';
        let r, g, b;
        if (value.length > 3) {
            r = parse(value.substr(0, 2));
            g = parse(value.substr(2, 2));
            b = parse(value.substr(4, 2));
        }
        else {
            r = parse(value[0] + value[0]);
            g = parse(value[1] + value[1]);
            b = parse(value[2] + value[2]);
        }
        return ('#' + r + g + b).toUpperCase();
    };


    // exports

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
                this.$emit('change', hex);
            },

            change (event) {
                const value = validate(event.target.value);
                event.target.value = value;
                this.$emit('change', value);
            }

        }

    }

</script>
