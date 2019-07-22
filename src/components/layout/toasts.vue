<!--
    Styles
-->

<style>


    /* main */

    .l-toasts {
        position: absolute;
        bottom: 24px;
        right: 24px;
    }
    .l-toasts .toast {
        margin-top: 16px;
        width: 320px;
        padding: 24px;
        border-radius: 6px;
        color: #ffffff;
    }


    /* close */

    .l-toasts .toast .close {
        width: 16px;
        height: 16px;
        fill: #fff;
        opacity: 0.7;
    }
    .l-toasts .toast .close:hover {
        opacity: 1;
    }


    /* content */

    .l-toasts .toast .icon {
        width: 24px;
        height: 24px;
        fill: #fff;
    }
    .l-toasts .toast .title {
        line-height: 24px;
        padding: 0 8px;
        text-transform: capitalize;
    }
    .l-toasts .toast .message {
        margin-top: 16px;
        font-size: 14px;
        font-weight: 300;
    }


    /* types */

    .l-toasts .toast.success {
        background: #3a84ff;
    }
    .l-toasts .toast.error {
        background: #e11212;
    }

</style>



<!--
    Template
-->

<template>
    <div class="l-toasts">
        <div class="toast" v-for="toast in toasts" :class="toast.type" @mouseenter="toast.stop()" @mouseleave="toast.play()">

            <div class="u-clear">
                <a class="u-fr close" @click="toast.hide()"><icon-close /></a>
                <component class="u-fl icon" :is="icon[toast.type]"></component>
                <p class="u-ff title">{{toast.type}}</p>
            </div>

            <p class="message">{{toast.message}}</p>

        </div>
    </div>
</template>



<!--
    Scripts
-->

<script>


    import {mapState} from 'vuex';
    import iconError from '@/assets/icons/error.svg'
    import iconSuccess from '@/assets/icons/success.svg'
    import iconClose from '@/assets/icons/close.svg'


    export default {

        components: {
            iconError,
            iconSuccess,
            iconClose
        },

        computed: mapState('toasts', [
            'toasts'
        ]),

        data () {
            return {
                icon: {
                    error: 'iconError',
                    success: 'iconSuccess',
                }
            }
        }

    }


</script>
