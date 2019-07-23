<!--
    Styles
-->

<style scoped>

    .aside {
        width: 320px;
        background: #ffffff;
        box-shadow: 0 0 5px 0 rgba(232, 232, 232, 0.53);
        padding: 48px 24px;
    }
    .aside .title {
        font-weight: 300;
        color: #1b253a;
        margin-bottom: 24px;
    }
    .aside .input {
        height: 36px;
        border: 1px solid #D6D6D6;
        border-radius: 2px;
        color: #313131;
        font-size: 14px;
        padding: 0 8px;
    }

    .aside .label {
        display: block;
        font-size: 12px;
        color: #313131;
        opacity: 0.5;
        margin-bottom: 8px;
    }
    .aside .field {
        margin-bottom: 24px;
    }


</style>



<!--
    Template
-->

<template>
    <div class="aside">

        <div v-if="!active">
            <select>
                <option>Barcode type</option>
            </select>
            <input type="text" placeholder="Bar text"/>
            <input type="number" value="800"/>
            <input type="number" value="600"/>
        </div>

        <div v-if="!active.type">

            <p class="title">Canvas</p>

            <div class="field">
                <label class="label">Width</label>
                <input class="input" type="number" v-model="active.width" />
            </div>

            <div class="field">
                <label class="label">Height</label>
                <input class="input" type="number" v-model="active.height" />
            </div>


        </div>


        <div v-if="active.type === 'rect'">

            <p class="title">Rect</p>

            <div class="field">
                <label class="label">Top</label>
                <input class="input" type="number" step="any" :value="active.top" @input="$emit('update', 'top', $event.target.value)" />
            </div>

            <div class="field">
                <label class="label">left</label>
                <input class="input" type="number" step="any" :value="active.left.toFixed(2)" />
            </div>

            <div class="field">
                <label class="label">Width</label>
                <input class="input" type="number" step="any" :value="(active.width * active.scaleX).toFixed(2)" />
            </div>

            <div class="field">
                <label class="label">Height</label>
                <input class="input" type="number" step="any" :value="(active.height * active.scaleY).toFixed(2)" />
            </div>

            <div class="field">
                <label class="label">Angle</label>
                <input class="input" type="number" step="any" :value="active.angle.toFixed(2)" />
            </div>


        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>
    
    export default {

        props: [
            'active'
        ],

        watch: {
            active (value) {
                console.log(value)
            }
        }

    }

</script>
