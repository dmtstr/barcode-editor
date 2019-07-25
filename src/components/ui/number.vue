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
           @input="input" />

</template>



<!--
    Scripts
-->

<script>


    // helpers

    const validate  = value => {
        if (!value) return '0';
        const dec = value.split('.')[1];
        if (dec && dec.length > 2) return parseFloat(value).toFixed(2);
        return value;
    };


    // exports

    export default {

        props: [
            'value'
        ],

        computed: {

            valid () {
                return validate(this.value.toString());
            }

        },

        methods: {

            input ($event) {
                const value = validate($event.target.value);
                $event.target.value = value;
                this.$emit('input', parseFloat(value));
            }

        }

    }

</script>
