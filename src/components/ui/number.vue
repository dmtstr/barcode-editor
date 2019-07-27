<!--
    Styles
-->

<style>
    
</style>



<!--
    Template
-->

<template>

    <input class="f-input"
           type="number"
           step="any"
           :value="valid"
           @change="change" />

</template>



<!--
    Scripts
-->

<script>


    // helpers

    const validate  = value => {
        if (!value) return 0;
        return Math.round(value * 100) / 100;
    };


    // exports

    export default {

        props: [
            'value'
        ],

        computed: {

            valid () {
                return validate(this.value);
            }

        },

        methods: {

            change ($event) {
                const value = validate(parseFloat($event.target.value));
                $event.target.value = value;
                this.$emit('change', parseFloat(value));
            }

        }

    }

</script>
