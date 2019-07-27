<!--
    Styles
-->

<style>

    .ui-select {
        position: relative;
    }
    .ui-select select {
        padding-right: 32px;
        -webkit-appearance: none;
           -moz-appearance: none;
    }
    .ui-select select option {
        text-transform: capitalize;
    }
    .ui-select svg {
        position: absolute;
        right: 6px;
        top: 8px;
        width: 20px;
        height: 20px;
        fill: #989898;
    }

</style>



<!--
    Template
-->

<template>
    <div class="ui-select">
        <select class="f-input" :value="value" @change="$emit('change', $event.target.value)">
            <option v-for="option in options" :value="option.value || option">{{option.label || option}}</option>
        </select>
        <icon-dropdown />
    </div>

</template>



<!--
    Scripts
-->

<script>


    import iconDropdown from '@/assets/icons/dropdown.svg'

    
    export default {

        components: {
            iconDropdown
        },



        props: [
            'value',
            'options'
        ]

    }

</script>
