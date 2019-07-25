<!--
    Styles
-->

<style>


    /* main */

    .r-login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 24px 24px 128px 24px;
    }


    /* form */

    .r-login form {
        min-width: 240px;
    }
    .r-login form p {
        text-align: center;
        margin-bottom: 32px;
    }
    .r-login form .input {
        margin-bottom: 16px;
        border: none;
        border-radius: 4px;
        padding: 0 12px;
    }
    .r-login form .button {
        width: 120px;
        margin: 32px auto 0 auto;
    }


</style>



<!--
    Template
-->

<template>
    <div class="r-login">
        <ui-loader v-show="loading" />
        <form @submit.prevent="submit">

            <p>Sign in to continue</p>

            <input class="input f-input u-tile"
                   type="email"
                   placeholder="Email"
                   required
                   v-model="model.email"/>

            <input class="input f-input u-tile"
                   type="password"
                   placeholder="Password"
                   required
                   v-model="model.password"/>

            <input class="button f-button primary"
                   type="submit"
                   value="Sign in"/>

        </form>
    </div>
</template>



<!--
    Scripts
-->

<script>


    import {mapActions} from 'vuex';
    import Axios from '@/common/modules/axios';
    import uiLoader from '@/components/ui/loader.vue';


    export default {

        components: {
            uiLoader
        },

        data () {
            return {
                loading: false,
                model: {
                    email: EMAIL,
                    password: PASSWORD,
                }
            }
        },

        methods: {

            ...mapActions('session', [
                'destroy',
                'create'
            ]),

            submit () {

                this.loading = true;

                Axios.abort('login').call('login', this.model)
                    .then(response => {
                        this.create(response.data.data.token);
                        this.$router.push('/');
                    })
                    .catch(error => {
                        if (error) this.loading = false;
                    })
            }

        },

        mounted () {
            this.destroy();
        }

    }

</script>
