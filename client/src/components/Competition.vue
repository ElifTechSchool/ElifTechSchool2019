<template>
    <v-row>
        <v-col>
            <v-card class="mx-auto">
                <v-card-title>{{competitionData.name}}</v-card-title>
                <v-card-text>{{competitionData.description}}</v-card-text>
                <v-card-text>{{competitionData.deadline_date}}</v-card-text>
                <v-card-text>{{competitionData.experience}}</v-card-text>
                <v-card-actions>
                <v-btn class="ma-2" outlined color="primary" @click="getDetails">Details</v-btn>
                <v-btn class="ma-2" outlined color="error" @click="deleteCompetition">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "Competition",
    props: ["competitionData"],
    methods: {
        deleteCompetition() {
        this.$store.dispatch("deleteCompetition", this.competitionData.id);
        },
        getDetails() {
            this.$router.push({
            name: "competitionDetails",
            params: { id: this.competitionData.id }
        });
        },
    },

}
</script>