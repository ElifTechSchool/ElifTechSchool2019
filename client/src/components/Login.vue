<template>
    <v-row align="center" justify="center">
        <v-col lg="6" md="6" sm="10">
            <v-card align="center" justify="center">
                <v-col md="8" sm="10">
                    <v-row>
                        <v-col>
                            <h2>R ! P</h2>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-form @submit.prevent="loginUser" v-model="valid">
                            <v-text-field
                                name="email"
                                :rules="emailRules"
                                :counter="100"
                                label="Email"
                                v-model="user.email"
                                required outlined 
                            ></v-text-field>
                            <v-text-field
                                name="password"
                                type="password"
                                :rules="passRules"
                                :counter="100"
                                label="Password"
                                v-model="user.password"
                                required outlined
                            ></v-text-field>                       
                            <v-btn block color="primary" type="submit" height="50px">LOGIN</v-btn>
                        </v-form>
                    </v-row>
                    <v-row class="float-right">
                        <v-btn text small color="primary" @click="forgotPassDialog = true">Forgot your password ?</v-btn>
                    </v-row>  
                </v-col>
            </v-card>
            <ForgotPass type="achiv" :show="forgotPassDialog" @hideModal="forgotPassDialog = false"/>
        </v-col>
  </v-row>
</template>

<script>
import ForgotPass from "@/components/Users/ForgotPass.vue";

export default {
    components: {
        ForgotPass,
    },
    data() {
        return {
            valid: true,
            forgotPassDialog: false,
            user: {},
            emailRules: [
                v => !!v || "E-mail is required",
                v => (v && v.length <= 100) || "Field must be less than 100 characters",
                v => /.+@.+/.test(v) || "E-mail must be valid"
            ],
            passRules: [
                v => !!v || "This field is required",
                v => (v && v.length <= 50) || "This field must be less than 50 characters",
                v => /.{6,}$/.test(v) || "Password is too short. Must have at least 6 characters",
                v => /^(?=.*?[A-Z])(?=.*?[a-z])/.test(v) || "Password must have at least one upper case and one lower case English letter to be valid",
                v => /(?=.*?[0-9])/.test(v) || "Password must have at least one digit",
            ],
        }
    },
    computed: {
    },
    methods: {
        async loginUser() {
            if(this.valid){
                this.$store.dispatch("loginUser", this.user);
            }
        },
        loginStatusChange(){
            this.$store.commit("setLoginStatus", 200);
        }
    },
}
</script>

<style lang="scss" scoped>
.v-card {
  height: 550px;
}
.v-form {
  width: 100%;
}
.v-form .v-btn {
  margin-top: 25px;
}
.v-btn {
  margin-top: 15px;
}
h2 {
  margin: 50px;
}
</style>
