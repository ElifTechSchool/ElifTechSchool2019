<template>
    <div class="createForm">
        <v-btn @click="showForm = !showForm">Create Competition</v-btn>
        <div v-if="showForm">
            <form @submit.prevent="createCompetition(competition)">
            <span>Name</span>
            <input type="text" placeholder="Name" v-model="competition.name">
            <span>Descriprion</span>
            <input type="text" placeholder="Description" v-model="competition.description">
            <span>Deadline_date</span>
            <input type="date" v-model="competition.deadline_date">
            <span>Experience</span>
            <input type="text" placeholder="Experience" v-model="competition.experience">
            <button type="submit">Create Competition</button>
            <hr> 
            </form>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
export default {
    data: () =>  {
        return {
            showForm: false,
            competition: {
                name: "",
                description: "",
                deadline_date: "",
                experience: "" 
            }
        }
    },
    computed: mapGetters(["getCompetitions"]),
    methods: mapActions(["createCompetition"]),
}
</script>

<style>
    input {
        display: block;
        margin: 0 auto;
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 10px;
    }
</style>