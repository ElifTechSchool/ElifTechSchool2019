<template>
    <v-row align="center" justify="center">
        <v-col md="6">
            <v-card align="center" justify="center">
                <v-col md="8">
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
                            <v-btn block color="primary" type="submit" height="50px" :disabled="!valid">LOGIN</v-btn>
                        </v-form>
                    </v-row>
                    <v-row class="justify-space-between">
                        <v-btn text small color="primary">Register</v-btn>
                        <v-btn text small color="primary">Forgot your password ?</v-btn>
                    </v-row>  
                </v-col>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            valid: true,
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
    methods: {
        async loginUser() {
            this.$store.dispatch("loginUser", this.user);
            this.user = {};
        },
    },
}
</script>

<style lang="scss" scoped>
.v-card{
    height: 700px;
}
.v-form {
    width: 100%;
}
.v-form .v-btn{
    margin-top: 25px;
}
.v-btn{
    margin-top: 15px;
}
h2{
    margin: 50px;
}
</style>