<!--
    Styles
-->

<style scoped>


    /* main */

    .aside {
        width: 320px;
        padding: 48px 12px;
    }


    /* texts */

    .aside .title {
        padding: 0 12px;
        font-weight: 300;
        color: #1b253a;
        margin-bottom: 24px;
    }
    .aside .label {
        display: block;
        font-size: 12px;
        color: #989898;
        margin-bottom: 8px;
    }


    /* field */

    .aside .field {
        margin-bottom: 24px;
        padding: 0 12px;
    }
    .aside .field.large {
        width: 100%;
    }
    .aside .field.small {
        width: 50%;
    }


</style>



<!--
    Template
-->

<template>
    <div class="aside u-tile">


        <!-- print -->

        <div v-if="!active">

            <p class="title">Print</p>

        </div>


        <!-- canvas -->

        <div class="u-clear" v-if="!active.type">

            <p class="title">Canvas</p>

            <div class="u-fl field large">
                <label class="label">Width</label>
                <ui-number :value="active.width" @input="resize('width', $event)" />
            </div>

            <div class="u-fl field large">
                <label class="label">Height</label>
                <ui-number :value="active.height" @input="resize('height', $event)" />
            </div>

        </div>


        <!-- rect -->

        <div class="u-clear" v-if="active.type === 'rect'">

            <p class="title">Rect</p>

            <div class="u-fl field small">
                <label class="label">Left</label>
                <ui-number :value="active.left" @input="prop('left', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Top</label>
                <ui-number :value="active.top" @input="prop('top', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Width</label>
                <ui-number :value="active.width * active.scaleX" @input="scale('scaleX', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Height</label>
                <ui-number :value="active.height * active.scaleY" @input="scale('scaleY', $event)" />
            </div>

            <div class="u-fl field large">
                <label class="label">Color</label>
                <ui-color :value="active.fill" @input="prop('fill', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Width</label>
                <ui-number :value="active.width * active.scaleX" @input="scale('scaleX', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Height</label>
                <ui-number :value="active.height * active.scaleY" @input="scale('scaleY', $event)" />
            </div>

        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>


    import {mapState, mapActions, mapMutations} from 'vuex'
    import uiNumber from '@/components/ui/number.vue'
    import uiColor from '@/components/ui/color.vue'



    
    export default {

        components: {
            uiNumber,
            uiColor
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

            resize (prop, value) {
                this.emit(['resize', prop, value]);
            }

        }



    }

</script>
