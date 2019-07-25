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
    .aside .field .half {
        flex: 1;
    }
    .aside .field .half:first-child {
        padding-right: 6px;
    }
    .aside .field .half:last-child {
        padding-left: 6px;
    }


</style>



<!--
    Template
-->

<template>
    <div class="aside">

        <div v-if="!active">

            Print
            <!--<select>-->
                <!--<option>Barcode type</option>-->
            <!--</select>-->
            <!--<input type="text" placeholder="Bar text"/>-->
            <!--<input type="number" value="800"/>-->
            <!--<input type="number" value="600"/>-->
        <!--</div>-->

        <!--<div v-if="!active.type">-->

            <!--<p class="title">Canvas</p>-->

            <!--<div class="field">-->
                <!--<label class="label">Width</label>-->
                <!--<input class="input" type="number" v-model="active.width" />-->
            <!--</div>-->

            <!--<div class="field">-->
                <!--<label class="label">Height</label>-->
                <!--<input class="input" type="number" v-model="active.height" />-->
            <!--</div>-->


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

            <div class="field u-row">
                <div class="half">
                    <label class="label">Top</label>
                    <ui-number :value="active.top" @input="prop('top', $event)"></ui-number>
                </div>
                <div class="half">
                    <label class="label">Left</label>
                    <ui-number :value="active.left" @input="prop('left', $event)"></ui-number>
                </div>
            </div>

            <div class="field u-row">
                <div class="half">
                    <label class="label">Width</label>
                    <ui-number :value="active.width * active.scaleX" placeholder="Y" @input="scale('scaleX', $event)"></ui-number>
                </div>
                <div class="half">
                    <label class="label">Height</label>
                    <ui-number :value="active.height * active.scaleY" placeholder="Y" @input="scale('scaleY', $event)"></ui-number>
                </div>
            </div>

            <div class="field">
                <label class="label">Angle</label>
                <ui-number :value="active.angle" @input="rotate($event)"></ui-number>
            </div>

            <div class="field">
                <input type="color"/>
            </div>


        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>


    import {mapState, mapActions} from 'vuex'
    import uiNumber from '@/components/ui/number.vue'



    
    export default {

        components: {
            uiNumber
        },

        computed: {

            ...mapState('template', [
                'active'
            ])

        },

        methods: {

            ...mapActions('template', [
                'emit'
            ]),

            prop (name, value) {
                this.emit(['prop', name, value]);
            },

            scale (name, value) {
                let size;
                if (name === 'scaleX') size = this.active.width;
                if (name === 'scaleY') size = this.active.height;
                this.emit(['prop', name, value / size]);
            },

            rotate (angle) {
                this.emit(['rotate', angle]);
            }

        }



    }

</script>
