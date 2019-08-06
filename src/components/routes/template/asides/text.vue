<!--
    Styles
-->

<style>

</style>


<!--
    Template
-->

<template>
    <div class="u-clear" v-else-if="active.type === 'i-text'">

        <div class="title u-clear">
            <p class="u-fl">Text</p>
            <a class="u-fr" @click="remove()"><icon-delete /></a>
            <a class="u-fr" :class="{disabled: last}" @click="backwards()"><icon-down /></a>
            <a class="u-fr" :class="{disabled: first}" @click="forwards()"><icon-up /></a>
        </div>

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
</template>


<!--
    Scripts
-->

<script>


    import {mapState} from 'vuex'
    import asideMixin from '@/common/mixins/aside'
    import uiNumber from '@/components/ui/number.vue'
    import uiSelect from '@/components/ui/select.vue'
    import uiColor from '@/components/ui/color.vue'


    export default {

        components: {
            uiNumber,
            uiSelect,
            uiColor
        },

        mixins: [
            asideMixin
        ],

        computed: mapState('template', [
            'active',
            'canvas'
        ]),

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

        methods: {

            font (value) {
                const [weight, style] = value.split(',');
                this.active.set('fontWeight', weight);
                this.active.set('fontStyle', style);
                this.render();
            }
        }

    }

</script>

