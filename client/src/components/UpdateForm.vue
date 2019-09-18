<template>
    <div class="form">
        <button @click="showUpdateForm=!showUpdateForm">Edite</button>
        <div v-if="showUpdateForm"> 
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
                <button type="submit">Save</button>
                <hr> 
                </form>
            </div>
        </div>   
    </div>
    
    
</template>

<script>
import {mapGetters, mapActions} from "vuex"
export default {
    data: () =>  {
        return {
            showUpdateForm: false,
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
    methods: 
    mapActions(["updateCompetition"]),

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