<template>
    <div class="form">
        <div v-for="competition in getCompetitions" :key="competition.id" >
            <form @submit.prevent="updateCompetition(competition)">
            <span>Name</span>
            <input type="text" placeholder="Name" v-model="competition.name">
            <span>Descriprion</span>
            <input type="text" placeholder="Description" v-model="competition.description">
            <span>Deadline_date</span>
            <input type="time-date" v-model="competition.deadline_date">
            <span>Experience</span>
            <input type="text" placeholder="Experience" v-model="competition.experience">
            <button type="submit">Update Competition</button>
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
            competition: {
                id: "",
                name: "",
                description: "",
                deadline_date: "",
                experience: "" 
            }
                
        }
    },
    computed: mapGetters(["getCompetitions"]),
    methods: mapActions(["updateCompetition"]),
    
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