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
        font-size: 18px;
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
    .aside .field.medium {
        width: 70%;
    }
    .aside .field.micro {
        width: 30%;
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

        <div class="u-clear" v-else-if="!active.type">

            <p class="title">Canvas</p>

            <div class="u-fl field large">
                <label class="label">Width</label>
                <ui-number :value="active.width" @change="resize('width', $event)" />
            </div>

            <div class="u-fl field large">
                <label class="label">Height</label>
                <ui-number :value="active.height" @change="resize('height', $event)" />
            </div>

        </div>


        <!-- rect -->

        <div class="u-clear" v-else-if="active.type === 'rect'">

            <p class="title">Rect</p>

            <div class="u-fl field small">
                <label class="label">Left</label>
                <ui-number :value="active.left" @change="prop('left', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Top</label>
                <ui-number :value="active.top" @change="prop('top', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Width</label>
                <ui-number :value="active.width * active.scaleX" @change="scale('scaleX', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Height</label>
                <ui-number :value="active.height * active.scaleY" @change="scale('scaleY', $event)" />
            </div>

            <div class="u-fl field large">
                <label class="label">Color</label>
                <ui-color :value="active.fill" @change="prop('fill', $event)" />
            </div>

        </div>


        <!-- text -->

        <div class="u-clear" v-else-if="active.type === 'i-text'">

            <p class="title">Text</p>

            <div class="u-fl field small">
                <label class="label">Left</label>
                <ui-number :value="active.left" @change="prop('left', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Top</label>
                <ui-number :value="active.top" @change="prop('top', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Scale X</label>
                <ui-number :value="active.scaleX" @change="prop('scaleX', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Scale Y</label>
                <ui-number :value="active.scaleY" @change="prop('scaleY', $event)" />
            </div>

            <!--<div class="u-fl line"></div>-->

            <div class="u-fl field medium">
                <label class="label">Font family</label>
                <ui-select :value="active.fontFamily" :options="fonts" @change="prop('fontFamily', $event)" />
            </div>

            <div class="u-fl field micro">
                <label class="label">Font size</label>
                <ui-number :value="active.fontSize" @change="prop('fontSize', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Font style</label>
                <ui-select :value="active.fontWeight + ',' + active.fontStyle" :options="fontStyles" @change="font($event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Text align</label>
                <ui-select :value="active.textAlign" :options="textAligns" @change="prop('textAlign', $event)" />
            </div>

            <div class="u-fl field large">
                <label class="label">Color</label>
                <ui-color :value="active.fill" @change="prop('fill', $event)" />
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
    import uiSelect from '@/components/ui/select.vue'

    
    export default {

        components: {
            uiNumber,
            uiColor,
            uiSelect
        },

        data () {
            return {
                fonts: [
                    'Arial',
                    'Courier New',
                    'Georgia',
                    'Times New Roman',
                    'Verdana'
                ],
                textAligns: [
                    {value: 'left', label: 'Left'},
                    {value: 'center', label: 'Center'},
                    {value: 'right', label: 'Right'}
                ],
                fontStyles: [
                    {value: 'normal,normal', label: 'Regular'},
                    {value: 'normal,italic', label: 'Italic'},
                    {value: 'bold,normal', label: 'Bold'},
                    {value: 'bold,italic', label: 'Bold & Italic'}
                ]
            }
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
            },

            font (value) {
                const styles = value.split(',');
                this.emit(['prop', 'fontWeight', styles[0]]);
                this.emit(['prop', 'fontStyle', styles[1]]);
            }

        }



    }

</script>
