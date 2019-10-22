<template>
    <v-dialog v-model="show" persistent max-width="600">
        <v-card class="pa-12">
            <h2>Forgot Your Password ?</h2>
            <p>Enter your email below to recieve password reset instructions</p>
            <v-form @submit.prevent="forgotPass">
                <v-text-field
                    name="email"
                    :rules="emailRules"
                    :counter="100"
                    label="Email"
                    v-model="data.email"
                    required outlined 
                ></v-text-field>
                <v-row class="float-right pa-3">
                    <v-btn color="primary" @click="forgotPass">Send me instructions</v-btn>
                    <v-btn text @click="hideModal">Cancel</v-btn>
                </v-row>  
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "ForgotPass",
    props: ["show"],
    data() {
        return {
            data:{
                email: ''
            },
            emailRules: [
                v => !!v || "E-mail is required",
                v => (v && v.length <= 100) || "Field must be less than 100 characters",
                v => /.+@.+/.test(v) || "E-mail must be valid"
            ],
        }
    },
    computed: {
        loginStatus: {
            get(){
                return this.$store.getters.authData.status
            },
            set(){
                this.$store.commit("setLoginStatus", 200)
            }
        }
        
    },
    methods: {
        hideModal() {
            this.$emit("hideModal")
        },
        forgotPass() {
            this.$store.dispatch("forgotPass", this.data)
            .then(res =>  {
                if(res.status === 200){
                    this.hideModal();
                    this.$store.dispatch("showSnackBar", { response: "Message sent", color: "primary" });
                }
                else {
                    this.hideModal();
                    this.$store.dispatch("showSnackBar", { response: 'Wrong email, no such user', color: "red" });
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.v-card {
    height: 300px;
}
</style>