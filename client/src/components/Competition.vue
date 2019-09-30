<template>
    <div class="competitionList">
        <li>ID: {{competitionData.id}}</li>
        <li>NAME: {{competitionData.name}}</li>
        <li>DESCRIPTION: {{competitionData.description}}</li>
        <li>DEADLINE_DATE: {{competitionData.deadline_date}}</li>
        <li>EXPERIENCE: {{competitionData.experience}}</li>
        <v-btn class="ma-2" outlined color="primary" >Details</v-btn>
        <v-btn class="ma-2" outlined color="error" @click="deleteCompetition">Delete</v-btn>
    </div>     
</template>

<script>
export default {
    props: ["competitionData"],
    methods: {
    deleteCompetition() {
      this.$store.dispatch("deleteCompetition", this.competitionData.id);
    },
    }
}
</script>