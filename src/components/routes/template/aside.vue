<!--
    Styles
-->

<style scoped>


    /* main */

    .aside {
        width: 320px;
        padding: 48px 12px;
    }


    /* title */

    .aside .title {
        margin-bottom: 32px;
        padding: 0 12px;
    }
    .aside .title p {
        font-size: 18px;
        color: #1b253a;
        line-height: 20px;
    }
    .aside .title a {
        margin-left: 8px;
    }
    .aside .title a svg {
        width: 20px;
        height: 20px;
        fill: #94979b;
    }
    .aside .title a:hover svg {
        fill: #3a84ff;
    }
    .aside .title a.disabled {
        pointer-events: none;
    }
    .aside .title a.disabled svg {
        opacity: 0.4;
    }


    /* label */

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

            <div class="title u-clear">
                <p class="u-fl">Rectangle</p>
                <a class="u-fr" @click="emit(['remove'])"><icon-delete /></a>
                <a class="u-fr" :class="{disabled: last}" @click="emit(['backwards'])"><icon-down /></a>
                <a class="u-fr" :class="{disabled: first}" @click="emit(['forwards'])"><icon-up /></a>
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
                <label class="label">Width</label>
                <ui-number :value="active.width * active.scaleX" @change="size('scaleX', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Height</label>
                <ui-number :value="active.height * active.scaleY" @change="size('scaleY', $event)" />
            </div>

            <div class="u-fl field large">
                <label class="label">Color</label>
                <ui-color :value="active.fill" @change="prop('fill', $event)" />
            </div>

        </div>


        <!-- text -->

        <div class="u-clear" v-else-if="active.type === 'i-text'">

            <div class="title u-clear">
                <p class="u-fl">Rectangle</p>
                <a class="u-fr" @click="emit(['remove'])"><icon-delete /></a>
                <a class="u-fr" :class="{disabled: last}" @click="emit(['backwards'])"><icon-down /></a>
                <a class="u-fr" :class="{disabled: first}" @click="emit(['forwards'])"><icon-up /></a>
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


        <!-- image -->

        <div class="u-clear" v-else-if="active.type === 'image'">

            <div class="title u-clear">
                <p class="u-fl">Rectangle</p>
                <a class="u-fr" @click="emit(['remove'])"><icon-delete /></a>
                <a class="u-fr" :class="{disabled: last}" @click="emit(['backwards'])"><icon-down /></a>
                <a class="u-fr" :class="{disabled: first}" @click="emit(['forwards'])"><icon-up /></a>
            </div>

            <div class="u-fl field small">
                <label class="label">Left</label>
                <ui-number :value="active.left" @change="prop('left', $event)" />
            </div>

            <div class="u-fl field small">
                <label class="label">Top</label>
                <ui-number :value="active.top" @change="prop('top', $event)" />
            </div>

            <div class="u-fl field large">
                <label class="label">Scale</label>
                <ui-number :value="active.scaleX" @change="scale($event)" />
            </div>

        </div>

    </div>
</template>



<!--
    Scripts
-->

<script>


    import {mapState, mapActions, mapMutations} from 'vuex'
    import iconUp from '@/assets/icons/up.svg'
    import iconDown from '@/assets/icons/down.svg'
    import iconDelete from '@/assets/icons/delete.svg'
    import iconSettings from '@/assets/icons/settings.svg'
    import uiNumber from '@/components/ui/number.vue'
    import uiColor from '@/components/ui/color.vue'
    import uiSelect from '@/components/ui/select.vue'
    import uiSettings from '@/components/ui/select.vue'

    
    export default {

        components: {
            iconUp,
            iconDown,
            iconDelete,
            uiNumber,
            uiColor,
            uiSelect,
            iconSettings
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
                'active',
                'canvas'
            ]),

            last () {
                return this.active && this.active.type && (this.canvas.getObjects().indexOf(this.active) === 0);
            },

            first () {
                return this.active && this.active.type && (this.canvas.getObjects().indexOf(this.active) === this.canvas.getObjects().length - 1);
            }

        },

        methods: {

            ...mapActions('template', [
                'emit'
            ]),

            prop (name, value) {
                this.emit(['prop', name, value]);
            },

            size (name, value) {
                let size;
                if (name === 'scaleX') size = this.active.width;
                if (name === 'scaleY') size = this.active.height;
                this.emit(['prop', name, value / size]);
            },

            resize (prop, value) {
                this.emit(['resize', prop, value]);
            },

            font (value) {
                const [fontWeight, fontStyle] = value.split(',');
                this.emit(['font', fontWeight, fontStyle]);
            },

            scale (value) {
                this.emit(['scale', value]);
            }

        }



    }

</script>
