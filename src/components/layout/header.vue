<!--
    Styles
-->

<style>

    .l-header {
        height: 64px;
        background: #FFFFFF;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.03);
        padding: 16px 24px;
        display: flex;
    }
    .l-header > * {
        flex: 1;
    }

    .l-header .title {
        text-align: center;
        line-height: 32px;
        font-size: 16px;
        font-weight: 300;
        color: #94979b;
    }

    .l-header .icon {
        width: 32px;
        height: 32px;
        padding: 4px;
    }
    .l-header a.icon {
        fill: #2979FF;
    }

    .l-header .button {
        width: 72px;
        text-align: center;
        margin-left: 12px;
    }



</style>



<!--
    Template
-->

<template>
    <div class="l-header u-clear" v-show="show">


        <!-- icons -->

        <div class="u-clear">

            <router-link class="icon u-fl" v-show="display" to="/" >
                <icon-back />
            </router-link>

            <div class="icon" v-show="dashboard">
                <icon-dashboard />
            </div>

        </div>

        <div class="title">
            {{title}}
        </div>

        <div class="u-clear">
            <a href="/logout" class="button u-fr f-button info" v-show="dashboard">Logout</a>
            <a class="button u-fr f-button info" v-show="display">Edit</a>
            <a class="button u-fr f-button danger" v-show="display">Delete</a>
        </div>

    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex';
    import iconBack from '@/assets/icons/back.svg'
    import iconEdit from '@/assets/icons/edit.svg'
    import iconDelete from '@/assets/icons/delete.svg'
    import iconDashboard from '@/assets/icons/dashboard.svg'
    import iconBarcode from '@/assets/icons/barcode.svg'


    export default {

        components: {
            iconBack,
            iconEdit,
            iconDelete,
            iconDashboard,
            iconBarcode
        },

        computed: {

            ...mapState('header', [
                'title',
                'show'
            ]),

            dashboard () {
                return this.$route.name === 'dashboard'
            },

            display () {
                return this.$route.name === 'display'
            }

        }

    }

</script>
