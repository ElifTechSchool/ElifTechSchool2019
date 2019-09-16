<template lang="html">
  <div>
    <v-hover v-slot:default="{ hover }" close-delay="200">
      <v-card max-width="500" class="mx-auto card" :elevation="hover ? 16 : 2">
        <v-list-item three-line>
          <v-list-item-avatar  size="80" color="grey"></v-list-item-avatar>
          <v-list-item-content class="align-self-start">
            <v-list-item-title class="headline mb-2">{{ name }}</v-list-item-title>
            <v-list-item-subtitle>Exp: {{ experience }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-hover>
  </div>
</template>

<script lang="js">
  export default {
    name: 'ranks-item',
    props: ["id", "name", "experience", "number", "url"],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
  }

</script>

<style scoped lang="scss">
  .card {
    margin-bottom: 1rem;
    cursor: pointer;
  }

</style>
