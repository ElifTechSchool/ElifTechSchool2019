<template>
    <v-container>
        <h1>Hiiiiii</h1>
    </v-container>
</template>
<script>
export default {
    mounted() {
        console.log('addddd');
        console.log(this.$store.getters.authData.token);
        this.$store.dispatch("authUser", this.$store.getters.authData.token);
    },
}
</script>