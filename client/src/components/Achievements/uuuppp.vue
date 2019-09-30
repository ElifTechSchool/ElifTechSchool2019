<template>
    <div class="form">
        <button @click="startEditing=!startEditing">Edit</button>
        <div v-if="startEditing"> 
            <div v-for="achievement in getAchievements" :key="achievement.id" >
                <form @submit.prevent="updateAchievement(achievement)">
                <span>Name</span>
                <input type="text" placeholder="Name" v-model="achievement.name">
                <span>Descriprion</span>
                <input type="text" placeholder="Description" v-model="achievement.description">
                <span>Type</span>
                <input type="type" v-model="achievement.type">
                <span>Experience</span>
                <input type="text" placeholder="Experience" v-model="achievement.experience">
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
            startEditing: false,
            achievement: {
                id: "",
                name: "",
                description: "",
                type: "",
                experience: "" 
            }
                
        }
    },
    computed: mapGetters(["getAchievement"]),
    methods: 
    mapActions(["updateAchievement"]),
}
</script>