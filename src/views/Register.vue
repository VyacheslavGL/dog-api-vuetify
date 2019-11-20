<template>
    <div class="register">

            <v-row>
                <v-col sm="4" class="ma-auto">
                    <v-form @submit.prevent="signUp" class="elevation-5 pa-4">
                        <h1 class="text-center">Регистрация</h1>
                        <v-divider />
                        <v-alert v-if="successMessages" type="success">{{ successMessages }}</v-alert>
                        <v-alert v-if="errorMessages" type="error">{{ errorMessages }}</v-alert>
                        <v-text-field v-model.trim="email" label="Ваш email"  />
                        <v-text-field v-model.trim="pass" label="Ваш пароль"  type="password" />
                        <v-text-field v-model.trim="passConfirm" label="Введите пароль еще раз"  type="password" />
                        <v-row>
                            <v-col>
                                <v-btn type="submit" color="primary">Зарегистрироваться</v-btn>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col>
                                <v-btn to="/login">Вход</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>

    </div>
</template>

<script>
    import {SIGNUP} from "../store/action.types";

    export default {
        name: "Login",
        data(){
            return{
                email: '',
                pass: '',
                passConfirm: '',
                successMessages: '',
                errorMessages: ''
            }
        },
        methods:{
           async signUp(){
               try{
                   await this.$store.dispatch(SIGNUP, {
                       email: this.email,
                       password: this.pass,
                   });
                   this.successMessages = 'Регистрация успешно завершина';
                   this.email = '';
                   this.pass = '';
                   this.passConfirm = '';
                   setTimeout(()=> { this.$router.push({ name: 'home'}); }, 1200);
               }catch (e) {
                   this.errorMessages = e.message;
                   console.log(e);
                   //для перевода сообщений от Firebase
                   if(e.code === 'auth/email-already-in-use'){
                       this.errorMessages = 'Пользователь существует'
                   }
               }

            }
        }
    }
</script>

<style scoped>

</style>