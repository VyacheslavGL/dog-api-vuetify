<template>
    <div class="login">

            <v-row>
                <v-col sm="4" class="ma-auto">
                    <v-form @submit.prevent="signIn" class="elevation-5 pa-4">
                        <h1 class="text-center">Вход</h1>
                        <v-divider />
                        <v-text-field v-model.trim="email" label="Ваш email" />
                        <v-text-field v-model.trim="pass" label="Ваш пароль" type="password" />
                        <v-row>
                            <v-col>
                                <v-btn type="submit" color="primary">Вход</v-btn>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col>
                                <v-btn to="/register">Регистрация</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>

    </div>
</template>

<script>
    import {SIGNIN} from "../store/action.types";

    export default {
        name: "Login",
        data(){
            return{
                email: '',
                pass: ''
            }
        },
        methods:{
          async signIn(){
              await this.$store.dispatch(SIGNIN, {
                  email: this.email,
                  password: this.pass,
              });
              this.$router.push({name: 'home'})
          }
        },
        beforeCreate() {
            if(this.$store.state.user.uid !== null){
                this.$router.push({ name: 'home'});
            }
        }
    }
</script>

<style scoped>

</style>